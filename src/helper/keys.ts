export function getKeyName(...args: string[]) {
  return `bites:${args.join(":")}`;
}

export const restaurantKeyById = (id: string) => getKeyName("restaurant", id);
export const reviewKeyById = (id: string) => getKeyName("reviews", id);
export const reviewDetailById = (id: string) =>
  getKeyName("reviews_detail", id);
