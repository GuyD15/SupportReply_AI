import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { isFreeTemplateSlug } from "@/lib/templates";

const FREE_GENERATION_LIMIT = 5;
const ANON_COOKIE_NAME = "supportreply_anon_id";

function getMonthKey() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

type AccessContext = {
  isPro: boolean;
  bucketKey: string;
  newAnonCookieValue: string | null;
};

async function getAccessContext(request: NextRequest): Promise<AccessContext> {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    return {
      isPro: Boolean(session.user.isPro),
      bucketKey: `user:${session.user.id}`,
      newAnonCookieValue: null,
    };
  }

  const existingAnonId = request.cookies.get(ANON_COOKIE_NAME)?.value;

  if (existingAnonId) {
    return {
      isPro: false,
      bucketKey: `anon:${existingAnonId}`,
      newAnonCookieValue: null,
    };
  }

  const anonId = randomUUID();
  return {
    isPro: false,
    bucketKey: `anon:${anonId}`,
    newAnonCookieValue: anonId,
  };
}

function withCookie(response: NextResponse, anonCookieValue: string | null) {
  if (anonCookieValue) {
    response.cookies.set(ANON_COOKIE_NAME, anonCookieValue, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") || "";
  const monthKey = getMonthKey();
  const context = await getAccessContext(request);

  if (context.isPro) {
    return withCookie(
      NextResponse.json({
        isPro: true,
        freeLimit: FREE_GENERATION_LIMIT,
        freeUsesRemaining: FREE_GENERATION_LIMIT,
        reachedFreeLimit: false,
        lockedByTemplate: false,
      }),
      context.newAnonCookieValue,
    );
  }

  const lockedByTemplate = !isFreeTemplateSlug(slug);

  const bucket = await db.freeUsageBucket.findUnique({
    where: {
      bucketKey_monthKey: {
        bucketKey: context.bucketKey,
        monthKey,
      },
    },
  });

  const used = bucket?.count ?? 0;
  const freeUsesRemaining = Math.max(0, FREE_GENERATION_LIMIT - used);

  return withCookie(
    NextResponse.json({
      isPro: false,
      freeLimit: FREE_GENERATION_LIMIT,
      freeUsesRemaining,
      reachedFreeLimit: freeUsesRemaining <= 0,
      lockedByTemplate,
    }),
    context.newAnonCookieValue,
  );
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { slug?: string } | null;
  const slug = String(body?.slug ?? "");
  const monthKey = getMonthKey();
  const context = await getAccessContext(request);

  if (context.isPro) {
    return withCookie(
      NextResponse.json({
        allowed: true,
        isPro: true,
        freeLimit: FREE_GENERATION_LIMIT,
        freeUsesRemaining: FREE_GENERATION_LIMIT,
        reachedFreeLimit: false,
        lockedByTemplate: false,
      }),
      context.newAnonCookieValue,
    );
  }

  if (!isFreeTemplateSlug(slug)) {
    return withCookie(
      NextResponse.json(
        {
          allowed: false,
          isPro: false,
          freeLimit: FREE_GENERATION_LIMIT,
          freeUsesRemaining: 0,
          reachedFreeLimit: false,
          lockedByTemplate: true,
          message: "This generator is Pro-only. Upgrade to unlock it.",
        },
        { status: 403 },
      ),
      context.newAnonCookieValue,
    );
  }

  const existing = await db.freeUsageBucket.findUnique({
    where: {
      bucketKey_monthKey: {
        bucketKey: context.bucketKey,
        monthKey,
      },
    },
  });

  if (!existing) {
    await db.freeUsageBucket.create({
      data: {
        bucketKey: context.bucketKey,
        monthKey,
        count: 1,
      },
    });

    return withCookie(
      NextResponse.json({
        allowed: true,
        isPro: false,
        freeLimit: FREE_GENERATION_LIMIT,
        freeUsesRemaining: FREE_GENERATION_LIMIT - 1,
        reachedFreeLimit: false,
        lockedByTemplate: false,
      }),
      context.newAnonCookieValue,
    );
  }

  if (existing.count >= FREE_GENERATION_LIMIT) {
    return withCookie(
      NextResponse.json(
        {
          allowed: false,
          isPro: false,
          freeLimit: FREE_GENERATION_LIMIT,
          freeUsesRemaining: 0,
          reachedFreeLimit: true,
          lockedByTemplate: false,
          message: "You used all 5 free generations this month. Upgrade to continue.",
        },
        { status: 403 },
      ),
      context.newAnonCookieValue,
    );
  }

  const updated = await db.freeUsageBucket.update({
    where: {
      bucketKey_monthKey: {
        bucketKey: context.bucketKey,
        monthKey,
      },
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });

  return withCookie(
    NextResponse.json({
      allowed: true,
      isPro: false,
      freeLimit: FREE_GENERATION_LIMIT,
      freeUsesRemaining: Math.max(0, FREE_GENERATION_LIMIT - updated.count),
      reachedFreeLimit: updated.count >= FREE_GENERATION_LIMIT,
      lockedByTemplate: false,
    }),
    context.newAnonCookieValue,
  );
}
