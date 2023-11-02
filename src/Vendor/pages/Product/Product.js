/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Table, Alert, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

const Product = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [categoryArr, setCategoryArr] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCatArr, setSubCatArr] = useState([]);
  const [subcategoryId, setSubCatId] = useState("");
  const [loading, setLoading] = useState(false);

  const FinalFromDate =
    fromDate === null || fromDate?.length < 5
      ? null
      : `${fromDate}T00:00:00.000Z`;
  const FinalToDate =
    toDate === null || fromDate.length < 5 ? null : `${toDate}T23:59:59.000Z`;

  let pag = [];
  for (let i = 0; i < pages; i++) {
    pag.push(i);
  }
  function BadgeSelector(status) {
    if (status === "Pending") {
      return <Badge bg="danger">Pending</Badge>;
    } else if (status === true) {
      return <Badge bg="success">Accepted</Badge>;
    } else if (status === false) {
      return <Badge bg="info">Pending</Badge>;
    }
  }

  function Prev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function Next() {
    if (page === pag?.length) {
    } else {
      setPage(page + 1);
    }
  }

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fecthCategory = async () => {
    try {
      const res = await axios.get(
        "https://jatin-tagra-backend.vercel.app/api/v1/Category/allCategory"
      );
      setCategoryArr(res.data.data);
    } catch {}
  };
  const fecthSubCategory = async () => {
    try {
      const res = await axios.get(
        "https://jatin-tagra-backend.vercel.app/api/v1/SubCategory/all/Subcategory"
      );
      setSubCatArr(res.data.data);
    } catch {}
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://jatin-tagra-backend.vercel.app/api/v1/product/allProducts`,
        Auth
      );
      console.log(data.data);
      setData(data.data);
      setTotal(data.data.total);
      setPages(data.data.pages);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fecthCategory();
    fecthSubCategory();
  }, []);
  const changeStatus = (id) => {
    console.log(Auth);

    axios
      .put(
        `https://jatin-tagra-backend.vercel.app/api/v1/product/activeDeactiveProduct/${id}`,
        null,
        Auth
      )
      .then((res) => {
        console.log(res.data);
        fetchData();
        toast.success(data.message);
      });
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://jatin-tagra-backend.vercel.app/api/v1/product/deleteProduct/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Products ( Total : {total} )
          </span>
          <Link to="/create-product">
            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
              Create New
            </button>
          </Link>
        </div>

        <section className="sectionCont">
          {/* <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Start typing to search for Product"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div> */}

          {/* <div className="searchByDate">
            <div>
              <label>Starting Date : </label>
              <input
                type="date"
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div>
              <label>Ending Date : </label>
              <input
                type="date"
                onChange={(e) => setToDate(e.target.value)}
                min={fromDate}
              />
            </div>
          </div> */}

          {/* <div className="searchByDate">
            <div>
              <label>Showing : </label>
              <select onChange={(e) => setLimit(e.target.value)}>
                <option>
                  {" "}
                  Showing {data?.length} out of {total}{" "}
                </option>
                <option value={total}> All </option>
                <option value={10}> 10 </option>
                <option value={20}> 20 </option>
                <option value={50}> 50 </option>
                <option value={100}> 100 </option>
              </select>
            </div>
          </div> */}
          {/* <div className="searchByDate">
            <div>
              <label>Category : </label>
              <select
                onChange={(e) => setCategoryId(e.target.value)}
                style={{ width: "80%" }}
              >
                <option> </option>
                {categoryArr?.map((i, index) => (
                  <option key={index} value={i._id}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Sub-Category : </label>
              <select
                onChange={(e) => setSubCatId(e.target.value)}
                style={{ width: "80%" }}
              >
                <option> </option>
                {subCatArr?.map((i) =>
                  i.subCategory?.map((item, index) =>
                    item.name ? (
                      <option key={index} value={item._id}>
                        {" "}
                        {item.name}{" "}
                      </option>
                    ) : (
                      ""
                    )
                  )
                )}
              </select>
            </div>
          </div> */}

          {loading === true ? (
            <Alert>
              {" "}
              Fetching Products Wait <Spinner animation="border" size="lg" />
            </Alert>
          ) : data?.length === 0 || !data ? (
            <Alert>Product Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Sub-Category</th>
                      <th>MRP</th>
                      <th>Selling Price</th>
                      <th>Discount</th>
                      <th>Quantity</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Option</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>
                          <img
                            src={i.images[0]?.img}
                            alt=""
                            style={{ maxWidth: "80px" }}
                          />
                        </td>
                        <td>{i.name}</td>
                        <td>{i.category?.name}</td>
                        <td>{i.subcategory?.name}</td>
                        <td style={{ paddingLeft: " 30px" }}>₹{i.price}</td>
                        <td>₹{i.discountPrice}</td>
                        <td style={{ paddingLeft: "26px" }}>{i.discount}%</td>
                        <td style={{ paddingLeft: "28px" }}>
                          {/* {i.varient === true ? (
                            <Link
                              to={`/product-variant/${i._id}/${i.productName}`}
                            >
                              <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
                                View
                              </button>
                            </Link>
                          ) : (
                            ""
                          )} */}
                          {i.quantity}
                        </td>

                        <td
                          style={{
                            paddingLeft: "28px",
                          }}
                        >
                          {i.Stock}
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => changeStatus(i._id)}
                        >
                          {" "}
                          {BadgeSelector(i.available)}{" "}
                        </td>
                        <td>
                          <span className="flexCont">
                            <Link to={`/edit-product/${i._id}`}>
                              <i className="fa-solid fa-pen-to-square" />
                            </Link>
                            <Link to={`/product/${i._id}`}>
                              <i className="fa-solid fa-eye" />
                            </Link>
                            <i
                              className="fa-sharp fa-solid fa-trash"
                              onClick={() => deleteHandler(i._id)}
                            ></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* <div className="pagination">
                <button onClick={() => Prev()} className="prevBtn">
                  <i className="fa-solid fa-backward"></i>
                </button>

                {page === 1 ? (
                  ""
                ) : (
                  <button onClick={() => setPage(1)} className="prevBtn">
                    1
                  </button>
                )}

                <button className="activePage">{page}</button>
                {page === pag?.length ? (
                  ""
                ) : (
                  <button onClick={() => setPage(pag?.length)}>
                    {pag?.length}
                  </button>
                )}
                {page === pag?.length ? (
                  ""
                ) : (
                  <button onClick={() => Next()} className="nextBtn">
                    {" "}
                    <i className="fa-sharp fa-solid fa-forward"></i>
                  </button>
                )}
              </div> */}
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Product);
