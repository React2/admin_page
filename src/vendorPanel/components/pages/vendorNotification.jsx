import React from "react";
import BaseUrl from "../BaseUrl";
import { useState, useEffect } from "react";
import HOC from "../layout/HOC";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import auth from "../Auth";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
//import MyVerticallyCenteredModal from "./create_not";



const VendorNotification = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const params = useParams();
  const [popup, setPopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

 // console.log(localStorage.getItem("direct"));

  const url =
    "https://b7w3czz0m2.execute-api.ap-south-1.amazonaws.com/development/api/getAllNotificationByRestaurant";
  const fetchDishes = async () => {
    try {
      const res = await axios.get(url, auth);
       //console.log(res?.data);
       setNotifications(res?.data);
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
            Notifications
          </span>
        </div>
        <div>
          <div className=" wcomp overflow-y-auto">
            {loading && <Oval className="align-center" />}
            <table className="table-auto  w-full text-left whitespace-no-wrap">
              <thead>
                <tr className=" border-b bg-slate-200 shadow-xl text-gray-900">
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Notifications
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
                {notifications?.requiredResults?.map((e, i) => {
                  return (
                    <tr key={i} className="tracking-wider text-gray-900">
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer">
                        {e?.message}
                      </td>
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer">
                        {e?.createdAt}
                      </td>
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer">
                        {e?.updatedAt}
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
export default HOC(VendorNotification);
