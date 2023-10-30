import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEdit, AiFillCamera } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
import Moment from "react-moment";

import HOC from "../../layout/HOC";
import axios from "axios";
import BaseUrl from "../../BaseUrl";
import auth from "../../Auth";
import { useParams } from "react-router-dom";

const CouponsDiscount = () => {
  const [popup, setPopup] = useState(false);
  let token = localStorage.getItem("Shaft");
  const [edit, setEdit] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState({
    couponCode: "",
    expirationDate: "",
    discount: null,
    minOrder: null,
  });
  const params = useParams();

  const handleChange = (event) => {
    setCoupon({ ...coupon, [event.target.name]: event.target.value });
  };

  const fetchCoupons = async () => {
    const url = BaseUrl() + `/api/admin/restaurant/${params.id}/coupons`;

    try {
      const res = await axios.get(url, auth);
      if (res?.data?.message) {
        setCoupons([]);
        toast("no coupons found");
      } else {
        setCoupons(res?.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);


  const deleteCoupon = async (id) => {
    const url = BaseUrl() + `/api/admin/coupons/${id}`;

    try {
      const res = await axios.delete(url, auth);
      toast.success("Deleted Successfully");
      fetchCoupons();
    } catch (err) {
      console.log("err", err);
      toast.error("Cannot delete coupon");
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Coupons
          </span>
        </div>
        <div className=" wcomp overflow-y-auto">
          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className=" border-b bg-slate-200 shadow-xl text-gray-900">
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Restaurant Id
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Activation Date
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Expiration Date
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Coupon Code
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Discount
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Min. Order
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons?.map((e, i) => {
                return (
                  <tr key={i} className="tracking-wider text-gray-900 ">
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.restaurantId}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.createdAt}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.expirationDate?.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">{e.name}</td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.discountPercent}%
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.minOrder}
                    </td>
                    <td className=" py-3  space-x-3">
                      <button className="font-semibold">
                        <GrFormClose
                          className="text-lg md:text-2xl"
                          onClick={() => deleteCoupon(e._id)}
                        />
                      </button>
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

export default HOC(CouponsDiscount);
