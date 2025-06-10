import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCars } from "../../redux/carsOps";
import CarsItem from "../CarsItem/CarsItem";
import s from "./CarsList.module.css";

const CarsList = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const carsInfo = cars?.cars;

  if (!Array.isArray(carsInfo)) {
    return <div>Loading...</div>;
  }
  console.log(carsInfo);

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {carsInfo.map((car) => {
          return (
            <li key={car.id}>
              <CarsItem car={car} />
            </li>
          );
        })}
      </ul>
      <button type="button" className={s.btn}>
        Load more
      </button>
    </div>
  );
};

export default CarsList;
