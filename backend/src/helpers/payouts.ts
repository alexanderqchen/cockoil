import { PrismaClient, User, Prisma } from "@prisma/client";

export const generatePayoutsForUsers = async (
  users: User[],
  prisma: PrismaClient
): Promise<Prisma.PayoutCreateManyInput[]> => {
  const payoutsToCreate = [];

  for (const user of users) {
    if (!user.payoutMethod || !user.payoutUsername) {
      console.log(`Skipping user ${user.id} because no payout method...`);
      continue;
    }

    const lastPayout = await prisma.payout.findFirst({
      where: {
        givenToId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const rewards = await prisma.reward.findMany({
      where: {
        givenToId: user.id,
        createdAt: {
          lte: new Date(),
          gte: lastPayout?.createdAt,
        },
      },
    });

    const payoutAmount = rewards.reduce(
      (acc, reward) => acc + reward.amount,
      0
    );

    if (payoutAmount === 0) {
      console.log(`Skipping user ${user.id} because payout amount is 0...`);
      continue;
    }

    console.log(
      `User ${user.id} had ${rewards.length} rewards since their previous payout on ${lastPayout?.createdAt} and earned a total of ${payoutAmount}.`
    );

    payoutsToCreate.push({
      amount: payoutAmount,
      givenToId: user.id,
      payoutMethod: user.payoutMethod,
      payoutUsername: user.payoutUsername,
    });
  }

  return payoutsToCreate;
};
