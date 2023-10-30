import React, { useEffect, useState } from "react";
// import { Field, Form, Formik } from "formik";
// import { IoMdClose } from "react-icons/io";
// import { AiOutlineEdit, AiFillCamera } from "react-icons/ai";
// import { GrFormClose } from "react-icons/gr";

import HOC from "../../layout/HOC";
import axios from "axios";
import auth from "../../Auth";
// import { Oval } from "react-loader-spinner";
import BaseUrl from "../../BaseUrl";
// import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UserTransactions = () => {
  const params = useParams();
  // const [popup, setPopup] = useState(false);
  const [userTransactions, setUserTransaction] = useState();

  const fetchuserTransactions = async () => {
    const url = BaseUrl() + `/api/admin/user-transactions/users/${params.id}`;
    try {
      const res = await axios.get(url, auth);
      setUserTransaction(res?.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    fetchuserTransactions();
  }, []);

  return userTransactions?.message ? (
    <>
      <section>
        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white"
          style={{ backgroundColor: "#70add4 " , height : '40px' ,border :'2px solid  #acd7f2' }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase "
            style={{ color: "#0063a1" ,marginLeft : '50px' }}
          >
            {userTransactions?.message}
          </span>
        </div>
      </section>
    </>
  ) : (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All transactions Of User
          </span>
        </div>
        <div className=" wcomp overflow-y-auto">
          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className=" border-b bg-slate-200 shadow-xl text-gray-900">
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm">
                  Transaction Id
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm">
                  Payment Gateway Order Id
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm">
                  Created At
                </th>
                {/* <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm">
                  Restaurant Order Id
                </th> */}
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm">
                  Amount
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              {userTransactions?.map((e, i) => {
                return (
                  <tr key={i} className="tracking-wider text-gray-900">
                    <td className="px-4 py-3 md:text-base text-sm">{e._id}</td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.status}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.paymentgatewayOrderId}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.createdAt}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.amount}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.updatedAt}
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

export default HOC(UserTransactions);
