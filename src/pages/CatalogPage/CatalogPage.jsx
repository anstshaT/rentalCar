import { useDispatch, useSelector } from "react-redux";
import CarsList from "../../components/CarsList/CarsList";
import FilterInputs from "../../components/FilterInputs/FilterInputs";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { fetchCars } from "../../redux/carsOps";
import { fetchBrands } from "../../redux/brandsOps";
import { prices } from "../../utils/prices";
import { setFilters } from "../../redux/slice";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const cars = useSelector((state) => state.cars);
  const brands = useSelector((state) => state.brands);
  const filter = useSelector((state) => state.filter);

  const [selectedBrands, setSelectedBrands] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedMinMil, setSelectedMinMil] = useState("");
  const [selectedMaxMil, setSelectedMaxMil] = useState("");
  const [page, setPage] = useState(1);

  const priceList = prices();

  useEffect(() => {
    dispatch(fetchBrands());

    async function fetchAllCars() {
      try {
        dispatch(fetchCars({ filters: {}, page }));
      } catch (error) {
        console.log("problem", error.message);
      }
    }

    fetchAllCars();
  }, [dispatch, filter, page]);

  const carsInfo = cars?.cars;

  const onBrandsChange = (brand) => {
    setSelectedBrands(brand.name);
    setPage(1);
    dispatch(setFilters({ ...filter, brand: brand.name }));
  };

  const onPriceChange = (price) => {
    setSelectedPrice(price.name);
    setPage(1);
    dispatch(setFilters({ ...filter, rentalPrice: price.name }));
  };

  const onMinMilChange = (milage) => {
    setSelectedMinMil(milage);
    setPage(1);
    dispatch(setFilters({ ...filter, minMileage: milage.name }));
  };

  const onMaxMilChange = (milage) => {
    setSelectedMaxMil(milage);
    setPage(1);
    dispatch(setFilters({ ...filter, maxMileage: milage.name }));
  };

  const loadMore = () => {
    setPage((lastPage) => lastPage + 1);
  };

  const onSearch = () => {
    dispatch(fetchCars({ filters: filter, page }));
    setPage(1);
  };

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
        selectedMinMil={selectedMinMil}
        setSelectedMinMil={onMinMilChange}
        selectedMaxMil={selectedMaxMil}
        setSelectedMaxMil={onMaxMilChange}
        onClick={onSearch}
      />
      <CarsList carsInfo={carsInfo} onClick={loadMore} />
    </div>
  );
};

export default CatalogPage;
