/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import {
  Table,
  Modal,
  Form,
  Button,
  Alert,
  Badge,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const AdminPreferedArea = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [editData, setEditData] = useState({});
  const [modalShow2, setModalShow2] = useState(false);

  const [toAmount, setToAmount] = useState(null);
  const [fromAmount, setFromAmount] = useState(null);
  const [area, setArea] = useState(null);
  const [salaryPer, setSalaryPer] = useState(null);

  const [km, setKm] = useState(null);
  const [loading, setLoading] = useState(null);

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

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://jatin-tagra-backend.vercel.app/api/v1/PreferedArea/allPreferedArea`
      );

      setData(data);
      console.log(data.data);

      setTotal(data.categories.length);
      // setPages(data.data.pages);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (modalShow === false) {
      setEditData(null);
    }
  }, [modalShow]);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://jatin-tagra-backend.vercel.app/api/v1/PreferedArea/deletePreferedArea/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState(editData?.name);
    const [gender, setGender] = useState(editData?.gender);
    const [toAmount, setToAmount] = useState(null);
    const [fromAmount, setFromAmount] = useState(null);
    const [area, setArea] = useState(null);
    const [salaryPer, setSalaryPer] = useState(null);

    const [km, setKm] = useState(null);
    const [loading, setLoading] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [image, setImage] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const payload = { name, gender };

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      const newData = new FormData();
      // if (image) {
      //   newData.append("image", image);
      // }

      try {
        const { data } = await axios.post(
          "https://jatin-tagra-backend.vercel.app/api/v1/PreferedArea/AddPreferedArea",
          {
            toAmount: toAmount,
            fromAmount: fromAmount,
            area: area,
            salaryPer,
            km,
          },
          Auth
        );

        toast.success(data.message);
        props.onHide();
        fetchData();
        setSubmitLoading(false);
      } catch (e) {
        const msg = e.response.data.message;
        setErrMsg(msg);
        setSubmitLoading(false);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      const newData = new FormData();
      if (image) {
        newData.append("image", image);
      }
      if (name) {
        newData.append("name", name);
      }
      try {
        const { data } = await axios.put(
          `https://jatin-tagra-backend.vercel.app/api/v1/Category/updateCategory/${id}`,
          newData,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
        setSubmitLoading(false);
      } catch (e) {
        const msg = e.response.data.message;
        setErrMsg(msg);
        setSubmitLoading(false);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {edit ? `Edit ${name}` : " Add Shift Preference"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errMsg === null || !errMsg ? (
            ""
          ) : (
            <div className="dangerBox">
              <Alert variant="danger"> {errMsg} </Alert>
              <i class="fa-solid fa-x" onClick={() => setErrMsg(null)}></i>
            </div>
          )}

          <Form onSubmit={edit ? putHandler : postHandler}>
            <Form.Group className="mb-3">
              {/* <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  id="myImage"
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group> */}
              {/* <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              /> */}
              <Form.Label>To Amount</Form.Label>
              <Form.Control
                type="number"
                required
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
              />
              <Form.Label>From Amount</Form.Label>
              <Form.Control
                type="number"
                required
                value={fromAmount}
                style={{ marginBottom: "20px" }}
                onChange={(e) => setFromAmount(e.target.value)}
              />
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
              <Form.Select
                className="mb-3"
                onChange={(e) => setSalaryPer(e.target.value)}
              >
                <option>Select Salary Per</option>
                <option>Month</option>
                <option>Week</option>
              </Form.Select>

              <Form.Label>Km</Form.Label>
              <Form.Control
                type="number"
                required
                value={km}
                onChange={(e) => setKm(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Select Type</Form.Label>
              <Form.Select onChange={(e) => setGender(e.target.value)}>
                <option> {gender} </option>
                <option value="kid">Kid</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
              </Form.Select>
            </Form.Group> */}

            <Button
              style={{
                backgroundColor: "#0c0c0c",
                borderRadius: "0",
                border: "1px solid #0c0c0c",
              }}
              type="submit"
            >
              {submitLoading === true ? (
                <Spinner size="sm" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  function BadgeSelector(status) {
    if (status === "Pending") {
      return <Badge bg="info">Pending</Badge>;
    } else if (status === "Accept") {
      return <Badge bg="success">Accepted</Badge>;
    } else if (status === "Reject") {
      return <Badge bg="danger">Rejected</Badge>;
    }
  }

  function MyVerticallyCenteredModal2(props) {
    const [approvalStatus, setApprovalStatus] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const payload = { approvalStatus };

    const putHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.put(
          `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/Category/approvedRejectCategory/${id}`,
          payload,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
        setSubmitLoading(false);
      } catch (e) {
        const msg = e.response.data.message;
        setErrMsg(msg);
        setSubmitLoading(false);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errMsg === null || !errMsg ? (
            ""
          ) : (
            <div className="dangerBox">
              <Alert variant="danger"> {errMsg} </Alert>
              <i class="fa-solid fa-x" onClick={() => setErrMsg(null)}></i>
            </div>
          )}

          <Form onSubmit={putHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Select Status</Form.Label>
              <Form.Select onChange={(e) => setApprovalStatus(e.target.value)}>
                <option> Select Status </option>
                <option value="Accept">Accept</option>
                <option value="Pending">Pending</option>
                <option value="Reject">Reject</option>
              </Form.Select>
            </Form.Group>

            <Button
              style={{
                backgroundColor: "#0c0c0c",
                borderRadius: "0",
                border: "1px solid #0c0c0c",
              }}
              type="submit"
            >
              {submitLoading === true ? (
                <Spinner size="sm" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyVerticallyCenteredModal2
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />

      <section>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Area Preference ( Total : {total} )
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Add Area-Preference
          </button>
        </div>
        <section className="sectionCont">
          {/* <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Start typing to search for Category"
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
          </div>

          <div className="searchByDate">
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

          {loading ? (
            <Spinner animation="border" role="status" className="loadingSpin" />
          ) : data?.length === 0 || !data ? (
            <Alert>Categories Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>To Amount</th>
                      <th>From Amount</th>
                      <th>Km</th>
                      <th>Salery Per</th>
                      <th>Area</th>
                      {/* <th>Type</th> */}
                      {/* <th
                        style={{
                          paddingLeft: "17px",
                        }}
                      >
                        Image
                      </th> */}
                      {/* <th>Type</th> */}
                      <th></th>
                      <th></th>
                      {/* <th>Status</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {data.data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>{i.toAmount}</td>
                        <td>{i.fromAmount}</td>
                        <td>{i.km}</td>
                        <td>{i.salaryPer}</td>
                        <td>{i.area}</td>
                        {/* <td>{i.type}</td> */}
                        <td>
                          <img
                            src={i.image}
                            alt=""
                            style={{
                              maxWidth: "80px",
                              maxHeight: "100px",
                            }}
                          />
                        </td>
                        {/* <td>{i.gender} </td> */}
                        {/* <td> {BadgeSelector(i.approvalStatus)} </td>
                        <td>
                          <button
                            onClick={() => {
                              setId(i._id);
                              setModalShow2(true);
                            }}
                            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                          >
                            Edit Status
                          </button>
                        </td> */}
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => deleteHandler(i._id)}
                            />
                            {/* <i
                              className="fa-solid fa-pen-to-square"
                              onClick={() => {
                                setEditData(i);
                                setEdit(true);
                                setId(i._id);
                                setModalShow(true);
                              }}
                            ></i> */}
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

export default HOC(AdminPreferedArea);
