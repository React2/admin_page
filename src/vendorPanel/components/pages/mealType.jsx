import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";
import axios from "axios";
import { TiDelete } from "react-icons/ti";

const MealType = () => {
  const [popup, setPopup] = useState(false);
  const token = localStorage.getItem("Vendortoken");
  const [edit, setEdit] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [restaurantId, setResId] = useState("");

  const fetchCoupons = async () => {
    const url = "https://b7w3czz0m2.execute-api.ap-south-1.amazonaws.com/development/api/createMeal";

    try {
      const {data} = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setCoupons(data);
    //  setResId(data.requiredResults?.[0].restaurantId);
     // console.log(restaurantId);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);
  const [typeOfMeal, setPT] = useState("");
  //console.log(Plantype);
  //const restaurantId = "63f4823419c730ffe0f71135";

  const addCoupon = async (e) => {
    e.preventDefault();
    const url = "https://b7w3czz0m2.execute-api.ap-south-1.amazonaws.com/development/api/createMeal";
    const token = localStorage.getItem("Vendortoken");
    try {
      const res = await axios.post(
        url,
        {typeOfMeal},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res)
      toast.success("Coupon added SuccessFully");
      fetchCoupons();
    } catch (err) {
      console.log("err", err);
    }
  };

  const deleteCoupon = async (id) => {
    const url = `https://b7w3czz0m2.execute-api.ap-south-1.amazonaws.com/development/api/restaurant/deleteplantype/${id}`;
    console.log(id);
    try {
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Deleted Successfully");
      fetchCoupons();
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again");
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Meal Types
          </span>
          <button
            onClick={() => {
              setEdit("");
              setPopup(!popup);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider"
          >
            Add Meal
          </button>
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
                Add Coupons
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

            <form
              className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4"
              onSubmit={addCoupon}
            >
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Plan Type
                </label>
                <input
                  required
                  type="text"
                  name="couponCode"
                  onChange={(e) => setPT(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              <button
                type="submit"
                value="Add"
                className="bg-[rgb(241,146,46)] cursor-pointer w-40 hover:bg-[rgb(241,146,46)] py-1 rounded-full"
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
                  Meal Type
                </th>
 
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons?.map((e, i) => {
                return (
                  <tr key={i} className="tracking-wider text-gray-900 ">
                    <td className="px-4 py-3 md:text-base text-sm">{e.typeOfMeal}</td>
                    <td
                      className="pl-2 py-3 md:text-base text-sm"
                      onClick={() => deleteCoupon(e._id)}
                    >
                      <TiDelete className="text-lg md:text-2xl" />
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

export default HOC(MealType);
