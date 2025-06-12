import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCarById } from "../../redux/carsOps";
import BasicCarInfo from "../../components/BasicCarInfo/BasicCarInfo";
import RentalCond from "../../components/RentalCond/RentalCond";
import CarSpecific from "../../components/CarSpecific/CarSpecific";
import AccessAndFunc from "../../components/AccessAndFunc/AccessAndFunc";

const AutoDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const carDetails = useSelector((state) => state.currentCar);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  return (
    <div>
      <BasicCarInfo carDetails={carDetails} id={id} />
      <RentalCond />
      <CarSpecific />
      <AccessAndFunc />
    </div>
  );
};

export default AutoDetailsPage;
