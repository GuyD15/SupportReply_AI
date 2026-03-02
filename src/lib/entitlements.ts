import { db } from "@/lib/db";

export async function getIsProByUserId(userId: string) {
  const entitlement = await db.entitlement.findUnique({
    where: { userId },
  });

  return entitlement?.status === "active";
}
