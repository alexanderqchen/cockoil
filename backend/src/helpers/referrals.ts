import type { User, PrismaClient } from "@prisma/client";

export const generateReferralCode = (user: User) => {
  return "xrefer_" + user.id.toString();
};

export const getUserFromReferralCode = async (
  referralCode: string,
  prisma: PrismaClient
) => {
  const userId = parseInt(referralCode.split("_")[1]);

  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
