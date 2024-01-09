export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatDollars = (cents: number) =>
  `$${(Math.round(cents) / 100).toFixed(2)}`;
