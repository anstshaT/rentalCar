import { useDispatch, useSelector } from "react-redux";
import CarsList from "../../components/CarsList/CarsList";
import FilterInputs from "../../components/FilterInputs/FilterInputs";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { fetchCars } from "../../redux/carsOps";
import { fetchBrands } from "../../redux/brandsOps";
import { prices } from "../../utils/prices";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars);
  const brands = useSelector((state) => state.brands);
  const [selectedBrands, setSelectedBrands] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const priceList = prices();

  useEffect(() => {
    dispatch(fetchCars());
    dispatch(fetchBrands());
  }, [dispatch]);

  const carsInfo = cars?.cars;

  const onBrandsChange = (brand) => {
    setSelectedBrands(brand);
  };

  const onPriceChange = (price) => {
    setSelectedPrice(price);
  };

  console.log(prices);

  return (
    <div>
      <Header />
      <FilterInputs
        brands={brands}
        selectedBrands={selectedBrands}
        setSelectedBrands={onBrandsChange}
        prices={priceList}
        selectedPrice={selectedPrice}
        setSelectedPrice={onPriceChange}
      />
      <CarsList carsInfo={carsInfo} />
    </div>
  );
};

export default CatalogPage;
