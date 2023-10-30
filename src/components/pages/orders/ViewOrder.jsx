import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import HOC from "../../layout/HOC";
import axios from "axios";
import auth from "../../Auth";
import BaseUrl from "../../BaseUrl";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewOrder = () => {
  const params = useParams();
  const [popup, setPopup] = useState(false);
  const [name, setName] = useState("");
  const [viewOrder, setViewOrder] = useState([]);

  const fetchViewOrder = async () => {
    const url = BaseUrl() + `/api/admin/orders/users/${params.id}`;
    try {
      const res = await axios.get(url, auth);
      if (res?.data?.message) {
        setViewOrder([]);
        toast("You haven't order anything");
      } else {
        setViewOrder(res?.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    fetchViewOrder();
  }, []);

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Orders Of User
          </span>
          {/* <button
            onClick={() => {
              // setEdit("");
              setPopup(!popup);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-full bg-[rgb(240,72,88)] text-white tracking-wider"
          >
            Add Order
          </button> */}
        </div>
        <section
          className={
            popup
              ? "fixed top-0 left-0 wcomp bg-[rgb(0,0,0,0.5)] transition-all duration-150 w-full flex justify-center items-center overflow-y-auto  h-screen "
              : "hidden"
          }
        >
          <div className="bg-slate-100 overflow-y-auto  lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg">
            <div className="flex sticky top-0 py-3 px-5 bg-slate-100 justify-between">
              <span className=" font-semibold text-[rgb(240,72,88)] ">
                Add Order
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
            {/* form */}

            <form className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4">
              {/*  Image */}

              {/*  Name */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Name of Order
                </label>
                <input
                  // value={edit ? edit.category : name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  required
                  type="text"
                  placeholder=""
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              <button
                type="submit"
                className="bg-[rgb(240,72,88)] flex items-center justify-center cursor-pointer w-40 hover:bg-[rgb(241,146,46)] py-1 rounded-full"
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
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm">
                  OrderId
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm">
                  Restaurant Id
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm">
                  Coupon Code
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Delivery Address
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Order By
                </th>
                {/* <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Action
                </th> */}
              </tr>
            </thead>

            <tbody>
              {viewOrder?.map((e, i) => {
                console.log("vieworders", viewOrder);
                return (
                  <tr key={i} className="tracking-wider text-gray-900 ">
                    <td className="px-4 py-3 md:text-base text-sm">{e._Id}</td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.restaurantId}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.couponCode}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.deliveryAddress}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.orderBy}
                    </td>
                    {/* <td className="px-4 py-3  space-x-3">
                      <button
                        onClick={() => {
                          //   setEdit(e);

                          setPopup(!popup);
                        }}
                        className="font-semibold tracking-widest"
                      >
                        <AiOutlineEdit className="text-lg md:text-2xl" />
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

export default HOC(ViewOrder);
