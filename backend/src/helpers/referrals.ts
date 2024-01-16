import type { User, PrismaClient } from "@prisma/client";

export const generateReferralCode = (userId: string) => {
  return "xrefer_" + userId;
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
