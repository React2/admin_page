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

const VendorSupport = () => {
  const [popup, setPopup] = useState(false);
  const [support, setSupport] = useState([]);
  const [edit, setEdit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState([]);
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState();

  const fetchSupport = async () => {
    const url = BaseUrl() + "/hns/getall";
    try {
      const res = await axios.get(url, auth);
      console.log("res", res);
      setSupport(res.data);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchSupport();
  }, []);

  const addTerms = async (e) => {
    e.preventDefault();
    const url = BaseUrl() + "/tnc/add";

    const data = {
      description: desc,
    };

    try {
      const res = await axios.post(url, data, auth);
      console.log("res", res);
      toast.success("Added Successfully");
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again");
    } finally {
      fetchSupport();
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Help and VendorSupport
          </span>
          {/* <button
            onClick={() => {
              setEdit("");
              setPopup(!popup);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider"
          >
            Add Terms
          </button> */}
        </div>
        {/* Add Form */}
        <section
          className={
            popup
              ? "fixed top-0 left-0 wcomp bg-[rgb(0,0,0,0.5)] transition-all duration-150 w-full flex justify-center items-center overflow-y-auto  h-screen "
              : "hidden"
          }
        >
          <div className="bg-slate-100 sm:h-[90vh] h-[80vh] overflow-y-auto  lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg">
            <div className="flex sticky top-0 py-3 px-5 bg-slate-100 justify-between">
              <span className=" font-semibold text-[rgb(241,146,46)] ">
                Add VendorSupport
              </span>
              <div className="text-[rgb(241,146,46)] py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
                <IoMdClose
                  onClick={() => {
                    setEdit("");
                    setPopup(false);
                  }}
                />{" "}
              </div>
            </div>
            {console.log(edit?.name)}
            {/* form */}

            <form
              className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4"
              //   onSubmit={id ? updateTerms : addTerms}
            >
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="price"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Description
                </label>
                <input
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                  type="text"
                  placeholder=""
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>

              <button
                type="submit"
                value="Add"
                className="bg-[rgb(241,146,46)] cursor-pointer w-40 hover:bg-[rgb(241,146,46)] py-1 rounded-full"
              >
                Add{" "}
              </button>
            </form>
          </div>
        </section>
        <div className=" wcomp overflow-y-auto">
          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className=" border-b bg-slate-200 shadow-xl text-gray-900">
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Mobile
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Query
                </th>
              </tr>
            </thead>
            <tbody>
              {support?.map((e, i) => {
                return (
                  <tr key={i} className="tracking-wider text-gray-900 ">
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.mobile}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">{e.name}</td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.query}
                    </td>

                    {/* <td className="px-4 py-3  space-x-3">
                      <button
                        onClick={() => {
                          setPopup(!popup);
                        }}
                        className="font-semibold tracking-widest"
                      >
                        <AiOutlineEdit className="text-lg md:text-2xl" />
                      </button>
                      <button className="font-semibold tracking-widest">
                        <GrFormClose
                          className="text-lg md:text-2xl"
                          //   onClick={() => deleteTerms(e._id)}
                        />
                      </button>
                    </td> */}
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

export default HOC(VendorSupport);
