import check from "../../assets/check.svg";
import s from "./RentalCond.module.css";

const RentalCond = ({ carDetails, title }) => {
  if (!Array.isArray(carDetails)) {
    return;
  }

  return (
    <div>
      <h3 className={s.title}>{title} </h3>
      <ul className={s.ul}>
        {carDetails.map((carDetail) => (
          <li key={crypto.randomUUID()} className={s.li}>
            <img src={check} width={16} height={16} />
            {carDetail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentalCond;
