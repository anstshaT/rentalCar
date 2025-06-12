import { useNavigate } from "react-router";
import s from "./CarsItem.module.css";
import clsx from "clsx";
import { getAddress } from "../../utils/address";

const CarsItem = ({ car }) => {
  const {
    year,
    brand,
    model,
    type,
    img,
    rentalCompany,
    rentalPrice,
    mileage,
    address,
    id,
  } = car;
  const navigate = useNavigate();

  const { city, country } = getAddress(address);

  const handleClick = () => {
    navigate(`/catalog/${id}`);
  };

  return (
    <div className={s.carDiv}>
      <img
        src={img}
        alt="Image car"
        width={276}
        height={268}
        className={s.img}
      />
      <div className={s.carTitle}>
        <p className={s.carName}>
          {brand} <span style={{ color: "var(--button)" }}>{model}</span>,{" "}
          {year}
        </p>
        <p className={s.price}>${rentalPrice}</p>
      </div>
      <div className={s.carInfo}>
        <div className={s.addressAndComp}>
          <p className={clsx(s.infoText, s.line)}>{city}</p>
          <p className={clsx(s.infoText, s.line)}>{country}</p>
          <p className={clsx(s.infoText, s.line)}>{rentalCompany}</p>
        </div>
        <div className={s.typeAndMil}>
          <p className={clsx(s.infoText, s.line)}>{type}</p>
          <p className={s.infoText}>{mileage}</p>
        </div>
      </div>
      <button type="button" onClick={handleClick} className={s.btn}>
        Read more
      </button>
    </div>
  );
};

export default CarsItem;
