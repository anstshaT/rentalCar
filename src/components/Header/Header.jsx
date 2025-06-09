import { NavLink } from "react-router";
import s from "./Header.module.css";
import clsx from "clsx";

const linkClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.active);
};

const Header = () => {
  return (
    <header className={s.header}>
      <p className={s.logo}>
        Rental<span className={s.logoSpan}>Car</span>
      </p>
      <nav className={s.nav}>
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={linkClass}>
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
