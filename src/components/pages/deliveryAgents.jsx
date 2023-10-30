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

const Restaurant = () => {
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
    const url = BaseUrl() + "/api/v1/admin/getAllDriver";
    try {
      const res = await axios.get(url, auth);
      Setrestaurant(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRestaurant();
  }, []);

  const addRestaurant = async (e) => {
    e.preventDefault();
    const url = BaseUrl() + "/api/v1/admin/getAllDriver";
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
            Driver's
          </span>
          {/* <button
            onClick={() => {
              //   setEdit("");
              setPopup(!popup);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-full bg-[rgb(240,72,88)] text-white tracking-wider"
          >
            Add Driver
          </button> */}
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
                Add Driver
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
                  Restaurant Name
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
                  Email
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
                  Address
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
                  Password
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
                  Tagline
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

              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Profile Image
                </label>
                <input
                  required
                  type="file"
                  placeholder=""
                  onChange={(e) => setI(e.target.files[0])}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(240,72,88)]"
                />
              </div>
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Menu Image
                </label>
                <input
                  required
                  type="file"
                  placeholder=""
                  onChange={(e) => setM(e.target.files[0])}
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
              <tr className=" border-b bg-slate-200 shadow-xl text-gray-900">
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Full Name
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Mobile No.
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Language Known
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  No. Of Reviews
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  User Type
                </th>
              </tr>
            </thead>
            <tbody>
              {restaurant.data?.map((e, i) => {
                return (
                  <tr key={i} className="tracking-wider text-gray-900">
                    <td
                      style={{ fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.firstName}
                      {e.lastName}
                    </td>
                    <td
                      style={{ fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.phone}
                    </td>
                    <td
                      style={{ fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.language}
                    </td>
                    <td
                      style={{ fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.floatingCash}
                    </td>
                    <td
                      style={{ fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.userType}
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

export default HOC(Restaurant);
