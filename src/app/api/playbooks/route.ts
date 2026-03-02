import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getIsProByUserId } from "@/lib/entitlements";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isPro = await getIsProByUserId(session.user.id);

  if (!isPro) {
    return NextResponse.json({ error: "Pro required" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const playbooks = await db.playbook.findMany({
    where: {
      userId: session.user.id,
      ...(slug ? { slug } : {}),
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 50,
  });

  return NextResponse.json({ playbooks });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isPro = await getIsProByUserId(session.user.id);

  if (!isPro) {
    return NextResponse.json({ error: "Pro required" }, { status: 403 });
  }

  const body = (await request.json()) as {
    slug?: string;
    title?: string;
    tone?: string;
    policy?: string;
    input?: {
      customerName?: string;
      orderRef?: string;
      issueDetails?: string;
      requestedOutcome?: string;
    };
  };

  if (!body.slug || !body.title || !body.tone || !body.policy) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const playbook = await db.playbook.create({
    data: {
      userId: session.user.id,
      slug: body.slug,
      title: body.title,
      tone: body.tone,
      policy: body.policy,
      customerName: body.input?.customerName ?? "",
      orderRef: body.input?.orderRef ?? "",
      issueDetails: body.input?.issueDetails ?? "",
      requestedOutcome: body.input?.requestedOutcome ?? "",
    },
  });

  return NextResponse.json({ playbook });
}
