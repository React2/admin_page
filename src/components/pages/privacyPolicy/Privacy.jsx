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

const Privacy = () => {
  const [popup, setPopup] = useState(false);
  const [privacy, setPrivacy] = useState([]);
  const [edit, setEdit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState([]);
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [_id, set_Id] = useState();

  const fetchPrivacy = async () => {
    const url = BaseUrl() + "/api/admin/privacy-policy";
    try {
      const res = await axios.get(url, auth);
      // console.log("res===>", res.data);
      setPrivacy([res.data]);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchPrivacy();
  }, []);

  const addPrivacy = async (e) => {
    e.preventDefault();
    const url = BaseUrl() + "/api/admin/privacy-policy";

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
      fetchPrivacy();
    }
  };

  const deletePrivacy = async (_id) => {
    const url = BaseUrl() + `/privacypolicy/delete/${_id}`;

    try {
      const res = await axios.delete(url, auth);
      toast.success("Deleted Successfully");
      setPrivacy([res.privacyPolicy]);
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again");
    }
  };

  const handleClick = (res) => {
    setDesc(res.privacyPolicy);
    set_Id(res._id);
  };

  const updatePrivacy = async (e) => {
    e.preventDefault();
    const url = BaseUrl() + `/api/admin/privacy-policy`;
    // ${_id}
    console.log("url===>", url);
    const data = {
      description: desc,
    };

    try {
      const res = await axios.patch(url, data, auth);
      toast.success("Updated Successfully");
      console.log("res===> policy", res?.data);
      setPopup(false);
      setPrivacy([res?.data]);
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again");
    }
  };
  console.log("res===> state policy", privacy[0]);

  const [privacyPolicy, setP] = useState("");

  const addPP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        "https://amol-home-foodie.herokuapp.com/api/admin/privacy-policy",
        {
          privacyPolicy,
        },
        auth
      );
      toast.success('Privacy Policy Updated Successfully')
      fetchPrivacy()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Privacy Policy
          </span>
          {/* <button
            onClick={() => {
              setEdit("");
              setPopup(!popup);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-full bg-[rgb(240,72,88)] text-white tracking-wider"
          >
            Add Privacy Policy
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
              <span className=" font-semibold text-[rgb(240,72,88)] ">
                Update Privacy Policy.
              </span>
              <div className="text-[rgb(240,72,88)] py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
                <IoMdClose
                  onClick={() => {
                    setEdit("");
                    setPopup(false);
                  }}
                />
              </div>
            </div>
            {console.log(edit?.name)}
            {/* form */}

            <form
              className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4"
              onSubmit={_id ? updatePrivacy : addPrivacy}
            >
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="price"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Description
                </label>
                <input
                  onChange={(e) => setP(e.target.value)}
                  required
                  type="text"
                  placeholder=""
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>

              <button
                onClick={addPP}
                type="submit"
                value="Add"
                className="bg-[rgb(240,72,88)] cursor-pointer w-40 hover:bg-[rgb(241,146,46)] py-1 rounded-full"
              >
                Add
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
              {privacy?.map((e, i) => {
                return (
                  <tr key={i} className="tracking-wider text-gray-900 ">
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.privacyPolicy}
                    </td>

                    <td className="px-4 py-3  space-x-3">
                      <button
                        onClick={() => {
                          handleClick(e);
                          setPopup(!popup);
                        }}
                        className="font-semibold tracking-widest"
                      >
                        <AiOutlineEdit className="text-lg md:text-2xl" />
                      </button>
                      {/* <button className="font-semibold tracking-widest">
                        <GrFormClose
                          className="text-lg md:text-2xl"
                          onClick={() => deletePrivacy(e._id)}
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

export default HOC(Privacy);
