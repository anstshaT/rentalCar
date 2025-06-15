import React from "react";
import { Link } from "react-router";
import s from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={s.wrapper}>
      <p className={s.title}>Lost in space?</p>
      <p className={s.text}>
        We couldn’t find the page you’re looking for. Maybe it got sucked into a
        black hole.
      </p>
      <p className={s.text}>
        Don’t worry,{" "}
        <Link to="/" className={s.link}>
          let’s get you back on track
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
