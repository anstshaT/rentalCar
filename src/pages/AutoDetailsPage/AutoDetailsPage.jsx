import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCarById } from "../../redux/carsOps";
import BasicCarInfo from "../../components/BasicCarInfo/BasicCarInfo";
import RentalCond from "../../components/RentalCond/RentalCond";
import CarSpecific from "../../components/CarSpecific/CarSpecific";
import s from "./AutoDetailsPage.module.css";
import Header from "../../components/Header/Header";
import BookForm from "../../components/BookForm/BookForm";
import { SyncLoader } from "react-spinners";

const AutoDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const carDetails = useSelector((state) => state.currentCar);
  const isLoading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (!carDetails) {
    return;
  }

  const rentalCond = carDetails.rentalConditions;

  const rentalTitle = "Rental Conditions: ";
  const accessAndFuncTitle = "Accessories and functionalities:";

  const accessAndFunc = [
    ...(Array.isArray(carDetails?.accessories) ? carDetails.accessories : []),
    ...(Array.isArray(carDetails?.functionalities)
      ? carDetails.functionalities
      : []),
  ];

  return (
    <div>
      <Header />
      {isLoading ? (
        <div className={s.loader}>
          <SyncLoader color="#3470FF" size={20} />
        </div>
      ) : (
        <div className={s.content}>
          <div className={s.imgAndForm}>
            <img src={carDetails.img} className={s.img} />
            <BookForm carId={id} />
          </div>
          <div>
            <BasicCarInfo
              brand={carDetails.brand}
              model={carDetails.model}
              year={carDetails.year}
              mileage={carDetails.mileage}
              rentalPrice={carDetails.rentalPrice}
              description={carDetails.description}
              address={carDetails.address}
              img={carDetails.img}
            />
            <div className={s.allOtherInfo}>
              <RentalCond carDetails={rentalCond} title={rentalTitle} />
              <CarSpecific carDetails={carDetails} />
              <RentalCond
                carDetails={accessAndFunc}
                title={accessAndFuncTitle}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoDetailsPage;
