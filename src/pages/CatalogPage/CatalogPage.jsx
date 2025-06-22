import { useDispatch, useSelector } from "react-redux";
import CarsList from "../../components/CarsList/CarsList";
import FilterInputs from "../../components/FilterInputs/FilterInputs";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { fetchCars } from "../../redux/carsOps";
import { fetchBrands } from "../../redux/brandsOps";
import { prices } from "../../utils/prices";
import { setFilters } from "../../redux/slice";
import { SyncLoader } from "react-spinners";
import s from "./CatalogPage.module.css";
import { all } from "axios";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const cars = useSelector((state) => state.cars);
  const brands = useSelector((state) => state.brands);
  const filter = useSelector((state) => state.filter);
  const page = useSelector((state) => state.page);
  const isLoading = useSelector((state) => state.loading);

  const [selectedBrands, setSelectedBrands] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedMinMil, setSelectedMinMil] = useState("");
  const [selectedMaxMil, setSelectedMaxMil] = useState("");
  const [allPage, setAllPage] = useState(page);

  console.log("Page in catalogPage", page);

  const priceList = prices();

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCars({ filters: filter, page: allPage }));
  }, [dispatch, filter, allPage]);

  const onBrandsChange = (brand) => {
    setSelectedBrands(brand.name);
  };

  const onPriceChange = (price) => {
    setSelectedPrice(price.name);
  };

  const onMinMilChange = (milage) => {
    setSelectedMinMil(milage);
  };

  const onMaxMilChange = (milage) => {
    setSelectedMaxMil(milage);
  };

  const loadMore = () => {
    setAllPage((lastPage) => lastPage + 1);
  };

  const onSearch = () => {
    dispatch(
      setFilters({
        ...filter,
        brand: selectedBrands,
        rentalPrice: selectedPrice,
        minMileage: selectedMinMil,
        maxMileage: selectedMaxMil,
      })
    );
    setAllPage(1);
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
      {cars.length === 0 && !isLoading && (
        <div className={s.notFound}>No cars available at the moment</div>
      )}
      {isLoading && (
        <div className={s.loader}>
          <SyncLoader color="#3470FF" size={20} />
        </div>
      )}
      <CarsList carsInfo={cars} onClick={loadMore} />
    </div>
  );
};

export default CatalogPage;
