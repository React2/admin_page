import React from "react";
import image from "../../../assets/Final Direct2U Logo-01.png";
import { Field } from "formik";
import { Form } from "formik";
import { Formik } from "formik";

const Signup = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-100">
      <Formik>
        <Form className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-[rgb(82,52,55)] p-5 md:py-10 rounded-tl-3xl rounded-br-3xl">
          <span className="text-2xl font-bold text-center text-[rgb(240,72,88)]">
            <img src={image} className=" image h-48" />
          </span>
          <section className="py-7 space-y-6">
            <div className="shadow-2xl sm:w-96 border border-[rgb(240,72,88)] space-x-4 flex items-center w-64  p-2 rounded-full">
              <Field
                type="anything"
                placeholder="Mobile Number/Email"
                name="number"
                required
                autocomplete="off"
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
            </div>
            <button
              type="submit"
              className=" py-4 cursor-pointer tracking-wider bg-[rgb(240,72,88)] flex justify-center items-center w-full rounded-full font-bold"
            >
              <div className="flex items-center rounded-full">
                <span
                  className="flex items-center justify-center  rounded-full"
                  onClick={() => {
                    "/verifyotp";
                  }}
                >
                  Continue
                </span>
              </div>
            </button>
          </section>
        </Form>
      </Formik>
    </div>
  );
};
export default Signup;
