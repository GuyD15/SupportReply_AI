import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({
      authenticated: false,
      isPro: false,
    });
  }

  return NextResponse.json({
    authenticated: true,
    isPro: session.user.isPro,
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    },
  });
}
