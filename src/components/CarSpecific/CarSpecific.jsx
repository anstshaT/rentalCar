import s from "./CarSpecific.module.css";
import calendar from "../../assets/calendar.svg";
import car from "../../assets/car.svg";
import fuel from "../../assets/fuel.svg";
import engine from "../../assets/gear.svg";

const CarSpecific = ({ carDetails }) => {
  const { year, type, fuelConsumption, engineSize } = carDetails;
  return (
    <div>
      <h3 className={s.title}>Car Specifications:</h3>
      <div className={s.div}>
        <div className={s.specific}>
          <img src={calendar} />
          <p>{`Year: ${year}`}</p>
        </div>

        <div className={s.specific}>
          <img src={car} />
          <p>{`Type: ${type}`}</p>
        </div>

        <div className={s.specific}>
          <img src={fuel} />
          <p>{`Fuel Consumption: ${fuelConsumption}`}</p>
        </div>

        <div className={s.specific}>
          <img src={engine} />
          <p>{`Engine Size: ${engineSize}`}</p>
        </div>
      </div>
    </div>
  );
};

export default CarSpecific;
