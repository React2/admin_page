import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { HiOutlineMail } from "react-icons/hi";
import { BiCycling, BiLogInCircle } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BaseUrl from "../BaseUrl";
import { Oval } from "react-loader-spinner";
import image from "../../../assets/Final Direct2U Logo-01.png";

const VendorLogin = () => {
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [email, setE] = useState("");
  const [password, setP] = useState("");



  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = "https://b7w3czz0m2.execute-api.ap-south-1.amazonaws.com/development/api/restaurant/login";
    try {
      const { data } = await axios.post(url, { email, password });
      localStorage.setItem('Vendortoken' , data?.token)
      setLoading(false);
      navigate("/vendorDashboard");
      toast.success("Welcome");
    } catch (err) {
      console.log( err?.response?.data?.message);
      toast.error( err?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-100">
        <Formik>
          <Form className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-white p-5 md:py-10 rounded-tl-3xl rounded-br-3xl">
            <span className="text-2xl font-bold text-center text-[rgb(241,146,46)]">
              <img src={image} className="h-28" />
            </span>
            <section className="py-7 space-y-6">
              <h1 className="text-center font-bold text-xl">Vendor Login</h1>
           
              <div className="shadow-2xl sm:w-96 border border-[rgb(240,72,88)] space-x-4 flex items-center w-64  p-2 rounded-full">
                <Field
                  type="email"
                  placeholder="username@gmail.com"
                  name="email"
                  required
                  onChange={(e) => setE(e.target.value)}
                  className="outline-none px-0.5  bg-transparent tracking-wider w-full"
                />
                <HiOutlineMail className="text-xl " />
              </div>
            
              <div className="shadow-2xl sm:w-96 border border-[rgb(240,72,88)] space-x-4 flex items-center w-64  p-2 rounded-full ">
                <Field
                  type={inputpass ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  required
                  onChange={(e) => setP(e.target.value)}
                  className="outline-none px-0.5  bg-transparent tracking-wider w-full"
                />

                <span
                  onClick={() => {
                    setPass(!pass);
                    setInputpass(!inputpass);
                  }}
                  className="text-xl cursor-pointer hover:scale-90 "
                >
                  {pass ? <VscEyeClosed /> : <VscEye />}
                </span>
              </div>
              <span
                onClick={() => navigate("/forgotPassword")}
                className="cursor-pointer"
              >
                Forgot Password ?
              </span>
  
              <button
                type="submit"
                className="py-2 cursor-pointer tracking-wider bg-[rgb(240,72,88)] flex justify-center items-center w-full rounded-full font-medium   "
                onClick={login}
              >
                {loading ? (
                  <Oval height={30} secondaryColor="black" color="black" />
                ) : (
                  <div className="flex items-center">
                    <span className="flex items-center justify-center">
                      LOG In
                    </span>
                    <BiLogInCircle className="pl-1.5 text-2xl" />
                  </div>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="py-2 cursor-pointer tracking-wider bg-[rgb(240,72,88)] flex justify-center items-center w-full rounded-full font-medium   "
              >
                <div className="flex items-center">
                  <span className="flex items-center justify-center">
                    Admin Login
                  </span>
                </div>
              </button>
            </section>
          </Form>
        </Formik>
      </div>

    </>
  );
};

export default VendorLogin;
