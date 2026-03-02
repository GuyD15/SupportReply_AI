import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      name?: string;
    };

    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();
    const name = body.name?.trim();

    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { error: "Provide a valid email and password (min 8 chars)." },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        email,
        name: name || null,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    if (String(error).includes("Unique constraint")) {
      return NextResponse.json({ error: "Email already in use." }, { status: 409 });
    }

    return NextResponse.json({ error: "Unable to create account." }, { status: 500 });
  }
}
