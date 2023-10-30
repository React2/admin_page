import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEdit, AiFillCamera } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
import auth from "../../Auth";

import HOC from "../../layout/HOC";
import axios from "axios";
import BaseUrl from "../../BaseUrl";

const AboutUs = () => {
  const [popup, setPopup] = useState(false);
  const [popup1, setPopup1] = useState(false);
  const [aboutus, setAboutUs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState("");

  const fetchAboutUs = async () => {
    const url = BaseUrl() + "/api/admin/about-us";
    try {
      const res = await axios.get(url, auth);
      setAboutUs([res?.data]);
      setDesc(res?.data?.aboutUs);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    fetchAboutUs();
  }, []);

  const [name, setN] = useState("");

  const update = async (e) => {
    e.preventDefault();
    const url = BaseUrl() + "/api/admin/about-us";
    try {
      const { data } = await axios.patch(url, { aboutUs: name }, auth);
      toast.success("Updated SuccessFully");
      fetchAboutUs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            About Us
          </span>
        </div>

        <section
          className={
            popup1
              ? "fixed top-0 left-0 wcomp bg-[rgb(0,0,0,0.5)] transition-all duration-150 w-full flex justify-center items-center overflow-y-auto  h-screen "
              : "hidden"
          }
        >
          <div className="bg-slate-100 sm:h-[90vh] h-[80vh] overflow-y-auto  lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg">
            <div className="flex sticky top-0 py-3 px-5 bg-slate-100 justify-between">
              <span className=" font-semibold text-[rgb(240,72,88)] ">
                Edit About Us.
              </span>
              <div className="text-[rgb(240,72,88)] py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
                <IoMdClose
                  onClick={() => {
                    setPopup1(false);
                  }}
                />
              </div>
            </div>
            <form
              className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4"
              onSubmit={update}
            >
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Description
                </label>
                <input
                  required
                  onChange={(e) => setN(e.target.value)}
                  type="text"
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              <button
                type="submit"
                className="bg-[rgb(240,72,88)] cursor-pointer w-40 hover:bg-[rgb(241,146,46)] py-1 rounded-full"
              >
                Edit
              </button>
            </form>
          </div>
        </section>

        <div className=" wcomp overflow-y-auto">
          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className=" border-b bg-slate-200 shadow-xl text-gray-900">
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Description
                </th>

                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {aboutus?.map((e, i) => {
                return (
                  <tr key={i} className="tracking-wider text-gray-900 ">
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.aboutUs}
                    </td>

                    <td className="px-4 py-3  space-x-3">
                      <button
                        onClick={() => {
                          // handleClick(e);

                          setPopup1(!popup1);
                        }}
                        className="font-semibold tracking-widest"
                      >
                        <AiOutlineEdit className="text-lg md:text-2xl" />
                      </button>
                      {/* <button className="font-semibold tracking-widest">
                        <GrFormClose
                          className="text-lg md:text-2xl"
                          // onClick={() => deleteaboutus(e._id)}
                        />
                      </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
export default HOC(AboutUs);
