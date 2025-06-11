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
  const [selectedBrands, setSelectedBrands] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedMinMil, setSelectedMinMil] = useState("");
  const [selectedMaxMil, setSelectedMaxMil] = useState("");
  const [query, setQuery] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });
  const [page, setPage] = useState(cars.page);

  const priceList = prices();

  useEffect(() => {
    /* dispatch(fetchCars()); */
    dispatch(fetchBrands());

    async function fetchAllCars() {
      try {
        dispatch(fetchCars(query, page));
      } catch (error) {
        console.log("problem", error.message);
      }
    }

    fetchAllCars();
  }, [dispatch, query, page]);

  const carsInfo = cars?.cars;

  const onBrandsChange = (brand) => {
    setSelectedBrands(brand.name);
    setQuery((prevQuery) => ({
      ...prevQuery,
      brand: brand.name,
    }));
  };

  const onPriceChange = (price) => {
    setSelectedPrice(price.name);
    setQuery((prevQuery) => ({
      ...prevQuery,
      rentalPrice: price.name,
    }));
  };

  const onMinMilChange = (milage) => {
    setSelectedMinMil(milage);
    setQuery((prevQuery) => ({
      ...prevQuery,
      minMileage: milage,
    }));
  };

  const onMaxMilChange = (milage) => {
    setSelectedMaxMil(milage);
    setQuery((prevQuery) => ({
      ...prevQuery,
      maxMileage: milage,
    }));
  };

  const loadMore = () => {
    setPage((lastPage) => lastPage + 1);
    console.log(cars);
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
      />
      <CarsList carsInfo={carsInfo} onClick={loadMore} />
    </div>
  );
};

export default CatalogPage;
