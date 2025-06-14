import { useSelector } from "react-redux";
import CarsItem from "../CarsItem/CarsItem";
import s from "./CarsList.module.css";

const CarsList = ({ carsInfo, onClick }) => {
  const totalPages = useSelector((state) => state.totalPages);

  if (!Array.isArray(carsInfo)) {
    return;
  }

  if (carsInfo.length < 1) {
    return <div className={s.notFound}>No cars available at the moment</div>;
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
      {totalPages >= 1 && (
        <button type="button" className={s.btn} onClick={onClick}>
          Load more
        </button>
      )}
    </div>
  );
};

export default CarsList;
