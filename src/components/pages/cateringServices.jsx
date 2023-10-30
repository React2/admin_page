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
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Img,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
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
      Setrestaurant(res.data.data);
      console.log(res.data.data);
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
            <TableContainer
              style={{
                width: "90%",
                margin: "auto",
                marginTop: "30px",
                paddingTop: "10px",
                height: "500px",
                overflow: "auto",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.21) 0px 3px 6px",
                borderRadius: "10px",
              }}
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th
                      style={{
                        fontSize: "18px",
                        textAlign: "center",
                        paddingBottom: "30px",
                      }}
                    >
                      Full Name
                    </Th>
                    <Th
                      style={{
                        fontSize: "18px",
                        textAlign: "center",
                        paddingBottom: "30px",
                      }}
                    >
                      Email
                    </Th>
                    <Th
                      style={{
                        fontSize: "18px",
                        textAlign: "center",
                        paddingBottom: "30px",
                      }}
                    >
                      Mobile No.
                    </Th>
                    <Th
                      style={{
                        fontSize: "18px",
                        textAlign: "center",
                        paddingBottom: "30px",
                      }}
                    >
                      Account Verification
                    </Th>
                    <Th
                      style={{
                        fontSize: "16px",
                        textAlign: "center",
                        paddingBottom: "30px",
                      }}
                    >
                      Delete Product
                    </Th>
                  </Tr>
                </Thead>
                <Tbody
                  style={{
                    color: "black",

                    margin: "auto",
                    height: "100px",
                    overflowY: "auto",
                  }}
                >
                  {restaurant.data?.map((e, i) => (
                    <Tr key={i}>
                      {/* <Td>
                <Img
                  src={e.image}
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "auto",
                    borderRadius: "10px",
                  }}
                />
              </Td> */}
                      <Td fontSize={"21"} textAlign="center">
                        {e.fullName}
                      </Td>
                      <Td fontSize={"21"} textAlign="center">
                        {e.email}
                      </Td>
                      <Td fontSize={"21"} textAlign="center">
                        {e.phone}
                      </Td>
                      <Td fontSize={"21"} textAlign="center">
                        {e.accountVerification ? "Verified" : "Pending"}
                      </Td>
                      <Td>
                        <button style={{ paddingLeft: "38%" }}>
                          <DeleteIcon
                            style={{ fontSize: "25px" }}
                            onClick={() => deletehandler(e._id)}
                          />
                        </button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
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
          {loading && <Oval className="align-center text-aligin" />}
          <TableContainer
            style={{
              width: "90%",
              margin: "auto",
              marginTop: "30px",
              paddingTop: "10px",
              height: "500px",
              overflow: "auto",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.21) 0px 3px 6px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  {/* <Th
                              style={{
                                fontSize: "18px",
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              Banner Image
                            </Th> */}
                  <Th
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    Full Name
                  </Th>
                  <Th
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    Email
                  </Th>
                  <Th
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    Mobile No.
                  </Th>
                  <Th
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    Wallet
                  </Th>
                  <Th
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    Language
                  </Th>
                  <Th
                    style={{
                      fontSize: "16px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    City
                  </Th>
                </Tr>
              </Thead>
              <Tbody
                style={{
                  color: "black",

                  margin: "auto",
                  height: "100px",
                  overflowY: "auto",
                }}
              >
                {restaurant.map((e, i) => (
                  <Tr key={i}>
                    <Td fontSize={"21"} textAlign="center">
                      {e.fullName}
                    </Td>
                    <Td fontSize={"21"} textAlign="center">
                      {e.email}
                    </Td>
                    <Td fontSize={"21"} textAlign="center">
                      {e.phone}
                    </Td>
                    <Td fontSize={"21"} textAlign="center">
                      {e.wallet}
                    </Td>
                    <Td fontSize={"21"} textAlign="center">
                      {e.language}
                    </Td>
                    <Td fontSize={"21"} textAlign="center">
                      {e.city}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </section>
    </>
  );
};

export default HOC(CateringServices);
