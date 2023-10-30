import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiFillCamera } from "react-icons/ai";
import HOC from "../../layout/HOC";
import axios from "axios";
import BaseUrl from "../../BaseUrl";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [popup, setPopup] = useState(false);
  const [edit, setEdit] = useState("");

  const fetchProducts = async () => {
    const url = BaseUrl() + "/api/restaurant/me";
    const token = localStorage.getItem("Vendortoken");
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [axios]);

  const [profile, setP] = useState("");
  const [menu, setM] = useState("");
  const [name, setN] = useState("");
  const [email, setE] = useState("");
  const [address, setA] = useState("");
  const [tagline, setT] = useState("");
  const [contact, setC] = useState("");

  const editBanner = async (e) => {
    e.preventDefault();
    const url = BaseUrl() + "/api/restaurant/me";
    const token = localStorage.getItem("Vendortoken");

    let fd = new FormData();
    fd.append("profile", profile);
    fd.append("menu", menu);
    fd.append("name", name);
    fd.append("email", email);
    fd.append("address", address);
    fd.append("tagline", tagline);
    fd.append("contact", contact);


    try {
      const res = await axios.patch(url, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile Edited SuccessFully");
      fetchProducts();
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Profile
          </span>
        </div>

        {/* -----------------------------------------------------------------------  */}

        {/* Edit Form */}
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
                Edit Profile
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

            <form
              className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4"
              onSubmit={editBanner}
            >
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Profile Image
                </label>
                <input
                  required
                  type="file"
                  onChange={(e) => setP(e.target.files[0])}
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
                  onChange={(e) => setM(e.target.files[0])}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(240,72,88)]"
                />
              </div>
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Name
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
                  Tagline
                </label>
                <input
                  required
                  type="text"
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
                  onChange={(e) => setC(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(240,72,88)]"
                />
              </div>

              <button
                type="submit"
                className="bg-[rgb(240,72,88)] cursor-pointer w-40 hover:bg-[rgb(240,72,88)] py-1 rounded-full"
              >
                Edit
              </button>
            </form>
          </div>
        </section>

        {/* --------------------------------------------------------------------------- */}

        <div className=" wcomp overflow-y-auto">
          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className=" border-b bg-slate-200 shadow-xl text-gray-900">
                <th className="px-4 py-3 w-36 tracking-widest font-medium md:text-base text-sm rounded-tl-lg ">
                  <AiFillCamera className="text-2xl" />
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Address
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  TagLine
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Phone No.
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Role
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Ratings
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Avg Ratings.
                </th>

                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="tracking-wider text-gray-900 ">
                <td className=" py-3 w-12 md:text-base text-sm ">
                  <img
                    src={BaseUrl() + "/" + products?.restaurant?.profile}
                    alt=""
                    className="xl:w-36 shadow-xl rounded-lg lg:w-32 md:w-28 w-24"
                  />
                </td>
                <td className="pl-2 py-3 md:text-base text-sm">
                  {products?.restaurant?.name}
                </td>
                <td className="pl-2 py-3 md:text-base text-sm">
                  {products?.restaurant?.email}
                </td>
                <td className="pl-2 py-3 md:text-base text-sm">
                  {products?.restaurant?.address}
                </td>
                <td className="pl-2 py-3 md:text-base text-sm">
                  {products?.restaurant?.tagline}
                </td>
                <td className="pl-2 py-3 md:text-base text-sm">
                  {products?.restaurant?.contact}
                </td>
                <td className="pl-2 py-3 md:text-base text-sm">
                  {products?.restaurant?.role}
                </td>
                <td className="pl-2 py-3 md:text-base text-sm">
                  {products?.restaurant?.numRatings}
                </td>
                <td className="pl-2 py-3 md:text-base text-sm">
                  {products?.restaurant?.avgStarRating}
                </td>
                <td
                  className="pl-2 py-3 md:text-base text-sm"
                  onClick={() => {
                    setPopup(!popup);
                  }}
                >
                  <AiOutlineEdit className="text-lg md:text-2xl" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default HOC(VendorProducts);
