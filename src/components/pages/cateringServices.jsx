import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import BaseUrl from "../BaseUrl";
import auth from "../Auth";
import { IoMdClose } from "react-icons/io";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";

const CateringServices = () => {
  const [prop, setProp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [restaurant, Setrestaurant] = useState([]);
  const [popup, setPopup] = useState(false);
  const [image, setI] = useState();
  const [name, setN] = useState("");
  const [menu, setM] = useState("");
  const [email, setE] = useState("");
  const [add, setA] = useState("");
  const [pass, setP] = useState("");
  const [tag, setT] = useState("");
  const [con, setC] = useState("");

  const navigate = useNavigate();

  const fetchRestaurant = async () => {
    setLoading(true);
    const url = BaseUrl() + "/api/v1/admin/getAllVendor";
    try {
      const res = await axios.get(url, auth);
      Setrestaurant(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      // console.log("err", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRestaurant();
  }, []);

  const addRestaurant = async (e) => {
    e.preventDefault();
    const url = BaseUrl() + "/api/admin/restaurants";
    const fd = new FormData();
    fd.append("profile", image);
    fd.append("menu", menu);
    fd.append("name", name);
    fd.append("email", email);
    fd.append("address", add);
    fd.append("password", pass);
    fd.append("tagline", tag);
    fd.append("contact", con);
    try {
      const res = await axios.post(url, fd, auth);
      toast.success("Restaurant added Successfully");
      fetchRestaurant();
    } catch (err) {
      console.log("err", err);
    }
  };
  const deleteRestaurant = async (_id) => {
    const url = BaseUrl() + `/api/admin/restaurants/${_id}`;

    try {
      const res = await axios.delete(url, auth);
      toast.success("Deleted Successfully");
      fetchRestaurant();
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again");
    }
  };
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase">
            All Vendors
          </span>
          <button
            hidden
            onClick={() => {
              //   setEdit("");
              setPopup(!popup);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-full bg-[rgb(240,72,88)] text-white tracking-wider"
          >
            Add Vendor
          </button>
        </div>
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
                Add Vendors
              </span>
              <div className="text-[rgb(240,72,88)] py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
                <IoMdClose
                  onClick={() => {
                    // setEdit("");
                    setPopup(false);
                  }}
                />
              </div>
            </div>

            <form
              className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4"
              onSubmit={addRestaurant}
            >
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Vendor's Name
                </label>
                <input
                  required
                  type="text"
                  onChange={(e) => setN(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(240,72,88)]"
                />
              </div>
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Vendor's Email
                </label>
                <input
                  required
                  type="email"
                  onChange={(e) => setE(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(240,72,88)]"
                />
              </div>
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  City
                </label>
                <input
                  required
                  type="text"
                  onChange={(e) => setA(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(240,72,88)]"
                />
              </div>
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Status
                </label>
                <input
                  required
                  type="password"
                  placeholder=""
                  onChange={(e) => setP(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(240,72,88)]"
                />
              </div>
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  userType
                </label>
                <input
                  required
                  type="text"
                  placeholder=""
                  onChange={(e) => setT(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(240,72,88)]"
                />
              </div>
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Phone No.
                </label>
                <input
                  required
                  type="tel"
                  placeholder=""
                  onChange={(e) => setC(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(240,72,88)]"
                />
              </div>

              <button
                type="submit"
                value="Add"
                className="bg-[rgb(240,72,88)] cursor-pointer w-40 hover:bg-[rgb(240,72,88)] py-1 rounded-full"
              >
                Add
              </button>
            </form>
          </div>
        </section>
        <div className=" wcomp overflow-y-auto">
          {loading && <Oval className="align-center" />}

          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className="border-b bg-slate-200 shadow-xl text-gray-900">
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Full Name
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Email
                </th>

                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  userType
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  wallet
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  City
                </th>
              </tr>
            </thead>
            <tbody>
              {restaurant.data?.map((e, i) => {
                return (
                  <tr
                    style={{ marginTop: "10px" }}
                    key={i}
                    className="tracking-wider text-gray-900"
                  >
                    <td
                      style={{ fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.fullName}
                    </td>
                    <td
                      style={{ fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.email}
                    </td>

                    <td
                      style={{ fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.status}
                    </td>
                    <td
                      style={{ fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.userType}
                    </td>
                    <td
                      style={{ fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.wallet}
                    </td>
                    <td
                      style={{ fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.city}
                    </td>
                    {/* <td
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      <img
                        src={`https://amol-home-foodie.herokuapp.com/${e.restaurantMenu}`}
                        alt={e.name}
                        className="xl:w-36 shadow-xl rounded-lg lg:w-32 md:w-28 w-24"
                      />
                    </td>
                    <td
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.role}
                    </td>
                    <td
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.numRatings}
                    </td>
                    <td
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.avgStarRating}
                    </td>
                    <td className="px-4 py-3  space-x-3">
                      <button className="font-semibold tracking-widest">
                        <BsEyeFill
                          className="text-lg md:text-2xl"
                          onClick={() => navigate(`/${e._id}/dishes`)}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3  space-x-3">
                      <button className="font-semibold tracking-widest">
                        <BsEyeFill
                          className="text-lg md:text-2xl"
                          onClick={() =>
                            navigate(`/restaurant/${e._id}/coupons`)
                          }
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3  space-x-3">
                      <button className="font-semibold tracking-widest">
                        <BsEyeFill
                          className="text-lg md:text-2xl"
                          onClick={() => navigate(`/${e._id}/categories`)}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3  space-x-3">
                      <button className="font-semibold tracking-widest">
                        <GrFormClose
                          className="text-lg md:text-2xl"
                          onClick={() => deleteRestaurant(e._id)}
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

export default HOC(CateringServices);
