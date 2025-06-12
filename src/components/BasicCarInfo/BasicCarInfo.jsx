import { useEffect } from "react";
import { getAddress } from "../../utils/address";
import location from "../../assets/location.svg";
import { useDispatch } from "react-redux";
import { fetchCarById } from "../../redux/carsOps";
import s from "./BasicCarInfo.module.css";
import { getCarId } from "../../utils/getCarId";

const BasicCarInfo = ({ id, carDetails }) => {
  const { brand, model, year, mileage, rentalPrice, description, address } =
    carDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  const carId = getCarId(carDetails.img);

  const { city, country } = getAddress(address);

  return (
    <div>
      <div className={s.carModel}>
        <h2 className={s.brandModel}>{`${brand} ${model}, ${year}`}</h2>
        <span className={s.modelSpan}>{`Id: ${carId}`}</span>
      </div>
      <div className={s.carDetails}>
        <div className={s.locationMilage}>
          <div className={s.location}>
            <img href={location} width={16} height={16} className={s.img} />
            <p className={s.cityCountry}>{`${city}, ${country}`}</p>
          </div>
          <p className={s.milage}>{`Milage: ${mileage} km`}</p>
        </div>

        <h2 className={s.price}>{`$${rentalPrice}`}</h2>
      </div>
      <p className={s.description}>{description}</p>
    </div>
  );
};

export default BasicCarInfo;
