export function getKeyName(...args: string[]) {
  return `bites:${args.join(":")}`;
}

export const restaurantKeyById = (id: string) => getKeyName("restaurant", id);
export const reviewKeyById = (id: string) => getKeyName("reviews", id);
export const reviewDetailById = (id: string) =>
  getKeyName("reviews_detail", id);

export const cuisinesKey = getKeyName("cuisines")
export const cuisineKey = (name: string) => getKeyName("cuisine", name)
export const restaurantCuisinesKeyById = (id: string) => getKeyName("restaurant_cuisines", id)

export const restaurantByRatingKey = getKeyName("restaurant_by_rating")

export const weatherKeyById = (id: string) => getKeyName("weather", id)