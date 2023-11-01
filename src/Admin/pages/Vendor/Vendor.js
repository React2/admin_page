/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import {
  Table,
  Alert,
  Spinner,
  Badge,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Vendor = () => {
  const [editData, setEditData] = useState({});
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function BadgeSelector(status) {
    if (status === "Pending") {
      return <Badge bg="danger">Pending</Badge>;
    } else if (status === true) {
      return <Badge bg="success">Accepted</Badge>;
    } else if (status === false) {
      return <Badge bg="info">Pending</Badge>;
    }
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://jatin-tagra-backend.vercel.app/api/v1/admin/getAllVendor"
      );
      setData(data.data);
      console.log(data.data);
      setTotal(data.data.length);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  function MyVerticallyCenteredModal2(props) {
    const [approvalStatus, setApprovalStatus] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const payload = { approvalStatus };

    const putHandler = async (e) => {
      e.preventDefault();

      setSubmitLoading(true);
      try {
        if (!approvalStatus) {
          props.onHide();
          return;
        }
        const { data } = await axios.put(
          `https://jatin-tagra-backend.vercel.app/api/v1/admin/user/verify-admin/${id}`,
          { isAdminVerify: approvalStatus === "Accept" ? true : false },
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
                {/* <option value="Reject">Reject</option> */}
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

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://jatin-tagra-backend.vercel.app/api/v1/admin/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const filterData = !search
    ? data
    : data?.filter((i) =>
        i?.fullName?.toLowerCase().includes(search?.toLowerCase())
      );

  return (
    <>
      {" "}
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
            All Vendor's ( Total : {total} )
          </span>
        </div>

        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Start typing to search for User"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <Spinner
              animation="border"
              role="status"
              style={{ display: "block", margin: "auto" }}
            ></Spinner>
          ) : total === 0 ? (
            <Alert>No Banner Created Yet !</Alert>
          ) : !data ? (
            <Alert> Banner's Not Found </Alert>
          ) : (
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>Full Name</th>
                    <th>Phone Number</th>
                    <th>Email Address</th>
                    <th>Wallet</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {filterData?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>{i.fullName}</td>
                      <td>{i.phone} </td>
                      <td>{i.email} </td>
                      <td>{i.wallet} </td>{" "}
                      <td> {BadgeSelector(i.isAdminVerify)} </td>
                      <td> {i.kycStatus} </td>{" "}
                      <td>
                        <button
                          onClick={() => {
                            setId(i._id);
                            setNewStatus(i.isAdminVerify);
                            setModalShow2(true);
                          }}
                          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                        >
                          Edit Status
                        </button>
                      </td>
                      <td></td>
                      {/* <td> */}
                      {/* <span className="flexCont"> */}
                      {/* <i */}
                      {/* className="fa-solid fa-trash" // onClick= */}
                      {() => deleteHandler(i._id)}
                      {/* /> */}
                      {/* </span> */}
                      {/* </td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Vendor);
