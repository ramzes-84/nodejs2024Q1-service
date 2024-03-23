export const isLogEvent = (levels: string[], event: string) => {
  return levels.includes(event);
};
