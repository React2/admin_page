import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEdit, AiFillCamera } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";

import HOC from "../../layout/HOC";
import axios from "axios";
import BaseUrl from "../../BaseUrl";
import auth from "../../Auth";
import { Oval } from "react-loader-spinner";
import BannerTable from "./NewBannertable";

const Banner = () => {
  const [prop, setProp] = useState([]);
  const [popup, setPopup] = useState(false);
  let token = localStorage.getItem("Shaft");
  const [edit, setEdit] = useState("");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const fetchCoupons = async () => {
    const url =
      "https://jatin-tagra-backend.vercel.app/api/v1/Banner/allBanner";
    try {
      const res = await axios.get(url, auth);
      console.log(res.data.data);
      console.log(res?.data);
      setCoupons(res?.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  /*const editBanner = async (e) => {
    e.preventDefault();
    const url = BaseUrl() + "/api/banner";
    const fd = new FormData();
    fd.append("banner", image);
    try {
      const res = await axios.patch(url, fd, auth);
      fetchBanners();
    } catch (err) {
      console.log("err", err);
    }
  };*/

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Banners
          </span>
        </div>
        <div>
          <div className=" wcomp overflow-y-auto">
            {loading && <Oval className="align-center" />}
            <BannerTable products={coupons} />
            {/* <table className="table-auto  w-full text-left whitespace-no-wrap">
              <thead>
                <tr className=" border-b bg-slate-200 shadow-xl text-gray-900">
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Banner Image
                  </th>
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Discount %
                  </th>
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Created At
                  </th>
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Updated At
                  </th>
                </tr>
              </thead>
              <tbody>
                {coupons?.map((item) => {
                  console.log(coupons);
                  return (
                    <tr className="tracking-wider text-gray-900">
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer">
                        <img src={item.image} alt="image_1" />
                      </td>
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer">
                        {item?.desc}
                      </td>
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer">
                        {item?.desc}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(Banner);
