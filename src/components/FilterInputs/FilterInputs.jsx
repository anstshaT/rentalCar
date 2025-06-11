import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBrands } from "../../redux/brandsOps";
import Selectors from "../Selectors/Selectors";
import s from "./FilterInputs.module.css";

const FilterInputs = ({
  brands,
  selectedBrands,
  setSelectedBrands,
  prices,
  selectedPrice,
  setSelectedPrice,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const chosenBrand = selectedBrands ? selectedBrands.name : "Choose a brand";
  const chosenPrice = selectedPrice
    ? `To $${selectedPrice.name}`
    : "Choose a price";

  const options = brands?.map((brand) => ({
    id: crypto.randomUUID(),
    name: brand,
  }));

  return (
    <div className={s.div}>
      <div>
        <span className={s.span}>Car brand</span>
        <Selectors
          arrays={options}
          selectedValue={selectedBrands}
          setSelectedValue={setSelectedBrands}
          chosenValue={chosenBrand}
        />
      </div>
      <div>
        <span className={s.span}>Price/ 1 hour</span>
        <Selectors
          arrays={prices}
          selectedValue={selectedPrice}
          setSelectedValue={setSelectedPrice}
          chosenValue={chosenPrice}
        />
      </div>
    </div>
  );
};

export default FilterInputs;
