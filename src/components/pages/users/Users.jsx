import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import HOC from "../../layout/HOC";
import axios from "axios";
import auth from "../../Auth";
import BaseUrl from "../../BaseUrl";
import { toast } from "react-toastify";
import NewUser from "./NewUser";

const Users = () => {
  const [popup, setPopup] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    const url = BaseUrl() + "/api/v1/admin/getAllUser";
    try {
      const res = await axios.get(url, auth);
      setUsers(res?.data);
      console.log(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteuser = async (_id) => {
    const url = BaseUrl() + `/api/v1/admin/deleteUser/${_id}`;

    try {
      const res = await axios.delete(url, auth);
      toast.success("User Deleted Success");
      fetchUsers();
    } catch (e) {
      setData(e.message);
      toast.error(e.name);
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white ">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Users
          </span>
        </div>
        <NewUser />
        {/* <div className=" wcomp overflow-y-auto">
          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead style={{ fontSize: "15px" }}>
              <tr className=" border-b bg-slate-200 shadow-xl text-gray-900">
                <th className="px-8 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm">
                  Full Name
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Mobile No.
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Account Verification
                </th>

                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Delete User
                </th>
              </tr>
            </thead>

            <tbody>
              {users.data?.map((e, i) => {
                return (
                  <tr key={i} className="tracking-wider text-gray-900 ">
                    <td
                      style={{
                        fontSize: "14px",
                      }}
                      className="px-4 py-3 md:text-base text-sm"
                    >
                      {e.fullName}
                    </td>
                    <td
                      style={{
                        fontSize: "14px",
                      }}
                      className="px-4 py-3 md:text-base text-sm"
                    >
                      {e.email}
                    </td>
                    <td
                      style={{
                        fontSize: "14px",
                      }}
                      className="px-4 py-3 md:text-base text-sm"
                    >
                      {e.phone}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.accountVerification ? "Verified " : "Not Verified"}
                    </td>

                    {/* <td className="px-4 py-3 md:text-base text-sm">
                      {e.address}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">{e.role}</td>{" "}
                    */}
        {/* <td
                      className="px-4 py-3  space-x-3"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      <button className="font-semibold tracking-widest">
                        <MdDelete
                          className="text-lg md:text-2xl"
                          onClick={() => deleteuser(e._id)}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}{" "}
      </section>
    </>
  );
};

export default HOC(Users);
