import type { User, PrismaClient } from "@prisma/client";

export const generateReferralCode = (user: User) => {
  return "xrefer_" + user.id.toString();
};

export const getUserFromReferralCode = async (
  referralCode: string,
  prisma: PrismaClient
): Promise<User | null> => {
  const userId = referralCode.split("_")[1];

  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
