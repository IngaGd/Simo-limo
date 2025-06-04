import { useEffect, useState } from "react";
import {
  ShoppingPlace,
  ShoppingPlacesType,
} from "src/common/components/ShoppingPlaces/shoppingPlaces.types";
import { useGetData } from "src/common/hooks/useGetData";
import { getGroupedData, shoppingPlaces } from "./shoppingPlaces.logic";
import styles from "./shoppingPlaces.module.scss";
import { Loader } from "src/common/components/Loader/Loader";

const URL = import.meta.env.VITE_URL;

export function ShoppingPlaces() {
  const [places, setPlaces] = useState<ShoppingPlacesType>();
  const { data, loader } = useGetData<string[][]>(`${URL}places`);

  useEffect(() => {
    if (!data) return;
    const fetchedData = shoppingPlaces(data);
    setPlaces(fetchedData);
    console.log("places: ", places);
  }, [data]);

  if (loader) return <Loader />;

  if (!places) return;
  const groupedPlaces = getGroupedData(places);

  return (
    <div className={styles.container}>
      {Object.entries(groupedPlaces).map(([town, district]) => (
        <div key={town} className={styles.towns}>
          <div className={styles.town}>{town}</div>
          {Object.entries(district).map(([district, places]) => (
            <div key={district} className={styles.districts}>
              <div className={styles.districts}>
                <div className={styles.district}>{district}</div>
                <div className={styles.places}>
                  {places?.map((place: ShoppingPlace) => (
                    <div key={place.id} className={styles.place}>
                      <div className={styles.name}>{place.name}</div>
                      <div>{place.address}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
