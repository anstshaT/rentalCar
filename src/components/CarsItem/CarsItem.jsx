import { useNavigate } from "react-router";
import s from "./CarsItem.module.css";
import clsx from "clsx";
import { getAddress } from "../../utils/address";
import favorite from "../../assets/favorite.svg";
import favoriteActive from "../../assets/favorite-active.svg";
import { addFavorite, remoteFavorite } from "../../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

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
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const { city, country } = getAddress(address);

  const handleClick = () => {
    navigate(`/catalog/${id}`);
  };

  const handleFavoriteClick = () => {
    if (!favorites.find((fav) => fav.id === id)) {
      dispatch(addFavorite({ id }));
      toast("Added to favorite");
      return;
    }

    dispatch(remoteFavorite({ id }));
    toast("Deleted from favorite");
  };

  return (
    <div className={s.carDiv}>
      <div>
        <img
          src={img}
          alt="Image car"
          width={276}
          height={268}
          className={s.img}
        />
        <button className={s.favoriteBtn} onClick={handleFavoriteClick}>
          <span className={s.svgWrapper}>
            <img
              src={
                favorites.find((fav) => fav.id === id)
                  ? favoriteActive
                  : favorite
              }
              width={16}
              height={16}
            />
          </span>
        </button>
      </div>
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
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: { background: "#3470FF", color: "#FFFFFF" },
        }}
      />
    </div>
  );
};

export default CarsItem;
