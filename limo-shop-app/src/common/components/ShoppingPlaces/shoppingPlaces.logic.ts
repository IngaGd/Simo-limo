import { ShoppingPlacesType } from "./shoppingPlaces.types";

export const shoppingPlaces = (data: string[][]): ShoppingPlacesType => {
  return data.map((column: string[]) => ({
    id: parseInt(column[0]),
    town: column[1],
    district: column[2],
    name: column[3],
    address: column[4],
  }));
};

export const getGroupedData = (places: ShoppingPlacesType) =>
  places.reduce((group, place) => {
    const { town, district } = place;
    group[town] = group[town] ?? [];
    group[town][district] = group[town][district] ?? [];
    group[town][district].push(place);
    return group;
  }, {} as Record<string, Record<string, ShoppingPlacesType>>);
