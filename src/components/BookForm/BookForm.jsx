import { Field, Formik, Form, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "./custom-calendar.css";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { addReservation } from "../../redux/slice";
import toast, { Toaster } from "react-hot-toast";
import { addMonths, format } from "date-fns";
import * as Yup from "yup";
import s from "./BookForm.module.css";

const BookForm = ({ carId }) => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    bookingDate: null,
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required field")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .required("Required field")
      .email("Invalid email address"),
    bookingDate: Yup.date().required("Required field"),
    comment: Yup.string()
      .min(3, "Must be at least 3 characters")
      .max(150, "Not more than 150 characters"),
  });

  const handlerSubmit = (values, { resetForm }) => {
    const formatedDate = format(new Date(values.bookingDate), "dd.MM.yyyy");

    try {
      dispatch(
        addReservation({
          carId,
          name: values.name,
          email: values.email,
          bookingDate: formatedDate,
          comment: values.comment,
        })
      );
      resetForm();
      toast.success(`Successfully booked a car on ${formatedDate}`);
    } catch (e) {
      toast.error("Car is not available on this day");
    }
  };

  return (
    <div className={s.formWrapper}>
      <h3 className={s.title}>Book your car now</h3>
      <p className={s.text}>Stay connected! We are always ready to help you.</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handlerSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, values }) => (
          <Form className={s.form}>
            <div className={s.fieldWrapper}>
              <Field
                id="name"
                name="name"
                placeholder="Name*"
                className={s.field}
              />
              <ErrorMessage name="name" component="span" className={s.error} />
            </div>
            <div className={s.fieldWrapper}>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Email*"
                className={s.field}
              />
              <ErrorMessage name="email" component="span" className={s.error} />
            </div>

            <div className={s.fieldWrapper}>
              <DatePicker
                selected={values.bookingDate}
                onChange={(date) => setFieldValue("bookingDate", date)}
                placeholderText="Booking date"
                className={s.field}
                calendarClassName={s.customCalendar}
                dateFormat="dd.MM.yyyy"
                minDate={new Date()}
                maxDate={addMonths(new Date(), 3)}
                showDisabledMonthNavigation
                name="bookingDate"
              />
              <ErrorMessage
                name="bookingDate"
                component="span"
                className={s.error}
              />
            </div>
            <div className={s.fieldWrapper}>
              <Field
                id="comment"
                name="comment"
                placeholder="Comment"
                className={clsx(s.field, s.comment)}
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={s.error}
              />
            </div>

            <button type="submit" className={s.btn}>
              Send
            </button>
          </Form>
        )}
      </Formik>
      <Toaster position="top-center" />
    </div>
  );
};

export default BookForm;
