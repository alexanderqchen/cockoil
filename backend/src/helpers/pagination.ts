export const getPaginationOptions = (page: number, pageSize: number) => ({
  skip: pageSize * (page - 1),
  take: pageSize,
});
