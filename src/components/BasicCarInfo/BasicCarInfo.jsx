import { getAddress } from "../../utils/address";
import location from "../../assets/location.svg";
import s from "./BasicCarInfo.module.css";
import { getCarId } from "../../utils/getCarId";

const BasicCarInfo = ({
  brand,
  model,
  year,
  mileage,
  rentalPrice,
  description,
  address,
  img,
}) => {
  const carId = getCarId(img);

  const formatedMilage = new Intl.NumberFormat("nb-NO").format(mileage);

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
            <img src={location} width={16} height={16} className={s.img} />
            <p className={s.cityCountry}>{`${city}, ${country}`}</p>
          </div>
          <p className={s.milage}>{`Milage: ${formatedMilage} km`}</p>
        </div>

        <h2 className={s.price}>{`$${rentalPrice}`}</h2>
      </div>
      <p className={s.description}>{description}</p>
    </div>
  );
};

export default BasicCarInfo;
