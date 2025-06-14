import CarsItem from "../CarsItem/CarsItem";
import s from "./CarsList.module.css";
import { SyncLoader } from "react-spinners";

const CarsList = ({ carsInfo, onClick }) => {
  if (!Array.isArray(carsInfo)) {
    return;
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

      {carsInfo.length > 0 && carsInfo.length % 12 === 0 && (
        <button type="button" className={s.btn} onClick={onClick}>
          Load more
        </button>
      )}
    </div>
  );
};

export default CarsList;
