import { Field, Formik, Form } from "formik";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import s from "./BookForm.module.css";
import clsx from "clsx";

const BookForm = () => {
  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };
  const [date, setDate] = useState("");

  const handlerSubmit = () => {};

  return (
    <div className={s.formWrapper}>
      <h3 className={s.title}>Book your car now</h3>
      <p className={s.text}>Stay connected! We are always ready to help you.</p>
      <Formik initialValues={initialValues} onSubmit={handlerSubmit}>
        <Form className={s.form}>
          <Field
            id="name"
            name="name"
            placeholder="Name*"
            className={s.field}
          />
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="Email*"
            className={s.field}
          />

          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="Booking date"
            className={s.field}
            popperClassName={s.customCalendar}
          />
          <Field
            id="comment"
            name="comment"
            placeholder="Comment"
            className={clsx(s.field, s.comment)}
          />

          <button type="submit" className={s.btn}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookForm;
