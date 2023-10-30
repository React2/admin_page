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
  const [dishIsOfRestaurant, setResId] = useState("");

  const fetchCoupons = async () => {
    const url = "https://b7w3czz0m2.execute-api.ap-south-1.amazonaws.com/development/api/createDishes";

    try {
      const {data} = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     // console.log(data);
      setCoupons(data);
      setResId(data?.[0]?.dishIsOfRestaurant)
    //  setResId(data.requiredResults?.[0].restaurantId);
     // console.log(restaurantId);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);
  const [dishName, setDishName] = useState("");
  const [description, setDesc] = useState("");
  const [priceForSmallPortion, setPSP] = useState("");
  const [priceForMediumPortion, setPMP] = useState("");
  const [priceForLargePortion, setPLP] = useState("");
  const [currency, setCurrency] = useState("");
  const [numLikes, setLikes] = useState("");
  const foodImg = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Ffood&psig=AOvVaw3KrJtbqVIfBJPtGlGRQnhQ&ust=1676975337464000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPDS-4vyo_0CFQAAAAAdAAAAABAE";

  //console.log(Plantype);
  //const restaurantId = "63f4823419c730ffe0f71135";

  const addCoupon = async (e) => {
    e.preventDefault();
    const url = "https://b7w3czz0m2.execute-api.ap-south-1.amazonaws.com/development/api/createDishes";
    const token = localStorage.getItem("Vendortoken");
    try {
      const res = await axios.post(
        url,
        {foodImg, dishName, description, priceForSmallPortion, priceForMediumPortion, priceForLargePortion,dishIsOfRestaurant, currency, numLikes},
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
            Dishes
          </span>
          <button
            onClick={() => {
              setEdit("");
              setPopup(!popup);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider"
          >
            Dishes
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
                Add Dish
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
                  Dish Name
                </label>
                <input
                  required
                  type="text"
                  name="couponCode"
                  onChange={(e) => setDishName(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Dish Description
                </label>
                <input
                  required
                  type="text"
                  name="couponCode"
                  onChange={(e) => setDesc(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Price for small portion
                </label>
                <input
                  required
                  type="text"
                  name="couponCode"
                  onChange={(e) => setPSP(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Price for medium portion
                </label>
                <input
                  required
                  type="text"
                  name="couponCode"
                  onChange={(e) => setPMP(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Price for large portion
                </label>
                <input
                  required
                  type="text"
                  name="couponCode"
                  onChange={(e) => setPLP(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Currency
                </label>
                <input
                  required
                  type="text"
                  name="couponCode"
                  onChange={(e) => setCurrency(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Likes
                </label>
                <input
                  required
                  type="text"
                  name="couponCode"
                  onChange={(e) => setLikes(e.target.value)}
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
                  Dish Image
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Dish Name
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Dish Description
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Price for Small portion
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Price for Small portion
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Price for Small portion
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Currency
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Likes
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
                    <td className="px-4 py-3 md:text-base text-sm">
                      <img
                          src={e.foodImg}
                          alt=""
                        />
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.dishName}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.description}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.priceForSmallPortion}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.priceForMediumPortion}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.priceForLargePortion}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.currency}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.numLikes}
                    </td>
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
