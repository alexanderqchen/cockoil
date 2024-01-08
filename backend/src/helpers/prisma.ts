import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

export const whereIsNull = (
  field: string,
  field__isnull: boolean | undefined
) => {
  if (typeof field__isnull === "undefined") {
    return {};
  }

  if (field__isnull) {
    return {
      [field]: null,
    };
  }

  return {
    [field]: { not: null },
  };
};

export default prisma;
