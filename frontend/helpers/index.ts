export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatDollars = (cents: number) =>
  `$${(Math.round(cents) / 100).toFixed(2)}`;

export const formatUserUrl = (userId: string) => {
  return "https://admin.cockoil.com/refer/u" + userId;
};

export const formatItemUrl = (itemId: string) => {
  return "https://admin.cockoil.com/refer/i" + itemId;
};
