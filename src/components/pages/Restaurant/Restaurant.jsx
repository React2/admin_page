import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import BaseUrl from "../../BaseUrl";
import auth from "../../Auth";
import { IoMdClose } from "react-icons/io";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Img,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
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
    const url = BaseUrl() + "/api/v1/admin/allProducts";
    try {
      const res = await axios.get(url, auth);
      Setrestaurant(res.data.data);
      console.log(res.data.data);
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
            All Products
          </span>
          {/* <button
            onClick={() => {
              //   setEdit("");
              setPopup(!popup);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-full bg-[rgb(240,72,88)] text-white tracking-wider"
          >
            Add Restaurant
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
                Add Restaurant
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
          <TableContainer
            style={{
              width: "90%",
              margin: "auto",
              marginTop: "30px",

              height: "550px",
              overflow: "auto",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              borderRadius: "10px",
              marginBottom: "8px",
            }}
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th
                    style={{
                      fontSize: "16px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    Product Image
                  </Th>
                  <Th
                    style={{
                      fontSize: "16px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    Product Category
                  </Th>
                  <Th
                    style={{
                      fontSize: "16px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    Product Price
                  </Th>
                  <Th
                    style={{
                      fontSize: "16px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    Product Quantity
                  </Th>
                  <Th
                    style={{
                      fontSize: "16px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    Product Rationgs
                  </Th>
                  <Th
                    style={{
                      fontSize: "16px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    Product Stock
                  </Th>
                  {/* <Th
                    style={{
                      fontSize: "16px",
                      textAlign: "center",
                      paddingBottom: "30px",
                    }}
                  >
                    Delete Product
                  </Th> */}
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
                    <Td>
                      <Img
                        src={e.category.image}
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "auto",
                          borderRadius: "10px",
                        }}
                      />
                    </Td>
                    <Td fontSize={"21"} textAlign="center">
                      {e.category.name}
                    </Td>
                    <Td fontSize={"21"} textAlign="center">
                      {e.price}
                    </Td>
                    <Td fontSize={"21"} textAlign="center">
                      {e.quantity}
                    </Td>
                    <Td fontSize={"21"} textAlign="center">
                      {e.ratings}
                    </Td>
                    <Td fontSize={"21"} textAlign="center">
                      {e.Stock}
                    </Td>
                    {/* <Td>
                      <button style={{ paddingLeft: "2%" }}>
                        <DeleteIcon
                          style={{ fontSize: "25px" }}
                          onClick={() => deleteRestaurant(e._id)}
                        />
                      </button>
                    </Td> */}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {/* <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className=" border-b bg-slate-200 shadow-xl text-gray-900">
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Product Image
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Product Category
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Product Price
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Product Quantity
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Product Rationgs
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Product Stock
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Delete Product
                </th>
              </tr>
            </thead>
            <tbody>
              {restaurant?.map((e, i) => {
                return (
                  <tr key={i} className="tracking-wider text-gray-900">
                    <td
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      <img
                        src={e.category.image}
                        alt={e.category.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td
                      style={{ color: "black", fontSize: "15px" }}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.category.name}
                    </td>
                    <td
                      style={{ color: "black", fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.price}
                    </td>
                    <td
                      style={{ color: "black", fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.quantity}
                    </td>
                    <td
                      style={{ color: "black", fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.ratings}
                    </td>
                    <td
                      style={{ color: "black", fontSize: "15px" }}
                      onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      {e.Stock}
                    </td>
                    <td
                      style={{ color: "black", fontSize: "15px" }}
                      className="px-4 py-3 md:text-base text-sm cursor-pointer"
                    >
                      <MdDelete />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
        </div>
      </section>
    </>
  );
};

export default HOC(Restaurant);
