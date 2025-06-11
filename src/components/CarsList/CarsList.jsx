import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCars } from "../../redux/carsOps";
import CarsItem from "../CarsItem/CarsItem";
import s from "./CarsList.module.css";

const CarsList = ({ carsInfo, onClick }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (!Array.isArray(carsInfo)) {
    console.log("CarsInfo is not array");
    return <div>Loading...</div>;
  }

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {carsInfo.map((car) => (
          <li key={car.id}>
            <CarsItem car={car} />
          </li>
        ))}
      </ul>
      <button type="button" className={s.btn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default CarsList;
