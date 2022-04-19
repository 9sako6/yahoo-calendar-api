export const dateFromJPString = (date: string) => {
  if (!date.match(/\d+\/\d+ /)) return -1;

  return Number(date.split(" ")[0].split("/")[1]);
};
