import Selectors from "../Selectors/Selectors";
import s from "./FilterInputs.module.css";
import clsx from "clsx";

const formatMileage = (value) =>
  value
    ? new Intl.NumberFormat("en-US", { useGrouping: true }).format(value)
    : "";

const FilterInputs = ({
  brands,
  selectedBrands,
  setSelectedBrands,
  prices,
  selectedPrice,
  setSelectedPrice,
  selectedMinMil,
  setSelectedMinMil,
  selectedMaxMil,
  setSelectedMaxMil,
  onClick,
}) => {
  const chosenBrand = selectedBrands ? selectedBrands : "Choose a brand";
  const chosenPrice = selectedPrice ? `To $${selectedPrice}` : "Choose a price";
  const chosenMinMilage = selectedMinMil && selectedMinMil;
  const chosenMaxMilage = selectedMaxMil && selectedMaxMil;

  const options = brands?.map((brand) => ({
    id: crypto.randomUUID(),
    name: brand,
  }));

  return (
    <div className={s.wrapper}>
      <div className={s.div}>
        <div className={s.inputsWrapper}>
          <div className={s.selectorsDiv}>
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

          <div className={s.milDiv}>
            <span className={s.span}>Сar mileage / km</span>
            <div className={s.inputMilDiv}>
              <div>
                <input
                  type="text"
                  className={clsx(
                    s.inputMil,
                    s.milMin
                    /* chosenMinMilage && s.paddingNew */
                  )}
                  placeholder="From"
                  value={formatMileage(chosenMinMilage)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, "").trim();
                    if (!isNaN(Number(value))) {
                      setSelectedMinMil(value);
                    }
                  }}
                />
              </div>
              <input
                type="text"
                placeholder="To"
                className={clsx(s.inputMil, s.milMax)}
                value={formatMileage(chosenMaxMilage)}
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, "").trim();
                  if (!isNaN(Number(value))) {
                    setSelectedMaxMil(value);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <button type="submit" className={s.btn} onClick={onClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterInputs;
