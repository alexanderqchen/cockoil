import dotenv from "dotenv";
dotenv.config();

import { Command, Option } from "@commander-js/extra-typings";
import { PrismaClient, User, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const program = new Command()
  .addOption(new Option("--dryrun", "If you don't want to create any objects"))
  .addOption(new Option("--verbose", "Print orders to create"))
  .parse();
const options = program.opts();

const generatePayouts = async (
  users: User[]
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

const run = async () => {
  console.log("Querying all users in db...");
  const users = await prisma.user.findMany();

  console.log(`Calculating payouts for ${users.length} users...`);
  const payoutsToCreate = await generatePayouts(users);

  if (options.verbose) {
    console.log("Payouts to create:");
    console.log(payoutsToCreate);
  }

  let numPayoutsCreated = 0;

  if (!options.dryrun) {
    console.log(`Creating ${payoutsToCreate.length} payouts...`);
    const createManyResponse = await prisma.payout.createMany({
      data: payoutsToCreate,
    });
    numPayoutsCreated = createManyResponse.count;
  }

  console.log(
    `Created ${numPayoutsCreated} / ${payoutsToCreate.length} Payouts.`
  );
};

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
