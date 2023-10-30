import React from "react";
import BaseUrl from "../../BaseUrl";
import { useState, useEffect } from "react";
import HOC from "../../layout/HOC";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import auth from "../../Auth";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";

const Payment2 = () => {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const params = useParams();
  const [popup, setPopup] = useState(false);
  const [edit, setEdit] = useState(false);

  const url = "https://b7w3czz0m2.execute-api.ap-south-1.amazonaws.com/development/api/users/GetAllPaymentsByAdmin";

  const fetchDishes = async () => {
    try {
      const res = await axios.get(url, auth);
    //  console.log(res?.data?.details);
      setPayments(res?.data?.details);
     /* if (res?.data?.message) {
        setDishes([]);
        toast("No Dishes Found");
      } else {
        setDishes(res?.data);
      }*/
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const deleteDish = async (id) => {
    const url = BaseUrl() + `/api/admin/dishes/${id}`;
    try {
      const res = await axios.delete(url, auth);
      toast.success("Deleted Successfully");
      fetchDishes();
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Payments
          </span>
        </div>
        <div>
          <div className=" wcomp overflow-y-auto">
            {loading && <Oval className="align-center" />}
            <table className="table-auto  w-full text-left whitespace-no-wrap">
              <thead>
                <tr className=" border-b bg-slate-200 shadow-xl text-gray-900">
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Amount
                  </th>
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Amount Paid
                  </th>
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Date
                  </th>
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Order Status
                  </th>
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    User
                  </th>
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Restaurant Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments?.map((e, i) => {
                  return (
                    <tr key={i} className="tracking-wider text-gray-900">
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer">
                        {e?.amount}
                      </td>
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer">
                        {e?.amount_paid}
                      </td>
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer">
                        {e?.date}
                      </td>
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer">
                        {e?.orderStatus}
                      </td>
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer">
                        {e?.userObject?.name}
                      </td>
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer">
                        {e?.restaurantObject?.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
export default HOC(Payment2);
