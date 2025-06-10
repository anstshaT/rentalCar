import { useNavigate } from "react-router";
import s from "./HomeBody.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
/* import { fetchBrands } from "../../redux/brandsOps"; */
import { fetchCars } from "../../redux/carsOps";

const HomeBody = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars);

  const clickHandle = () => {
    navigate("/catalog");
  };

  useEffect(() => {
    dispatch(fetchCars());
    console.log("Cars", cars);
  }, [dispatch]);

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
