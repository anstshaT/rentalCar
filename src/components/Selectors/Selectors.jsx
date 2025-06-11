import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBrands } from "../../redux/brandsOps";
import arrowDown from "../../assets/arrow-down.svg";
import arrowUp from "../../assets/arrow-up.svg";
import s from "./Selectors.module.css";

const Selectors = ({
  arrays,
  selectedValue,
  setSelectedValue,
  chosenValue,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  if (!Array.isArray(arrays)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Listbox value={selectedValue || {}} onChange={setSelectedValue}>
        {({ open }) => (
          <div>
            <ListboxButton className={s.listBoxBtn}>
              {chosenValue}
              <img src={open ? arrowUp : arrowDown} width={16} height={16} />
            </ListboxButton>
            <ListboxOptions anchor="bottom" className={s.opts}>
              {arrays.map((array) => (
                <ListboxOption key={array.id} value={array} className={s.opt}>
                  {array.name}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default Selectors;
