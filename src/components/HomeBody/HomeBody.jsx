import { useNavigate } from "react-router";
import s from "./HomeBody.module.css";

const HomeBody = () => {
  const navigate = useNavigate();

  const clickHandle = () => {
    navigate("/catalog");
  };

  return (
    <div className={s.div}>
      <div className={s.contentWrap}>
        <div className={s.content}>
          <h1 className={s.title}>Find your perfect rental car</h1>
          <h2 className={s.text}>
            Reliable and budget-friendly rentals for any journey
          </h2>
          <button type="button" className={s.btn} onClick={clickHandle}>
            View Catalog
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
