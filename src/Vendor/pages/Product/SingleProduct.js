/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const BaseUrl = "https://jatin-tagra-backend.vercel.app";

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/v1/product/viewProduct/${id}`
      );
      setData(response.data.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  function ValueChecker(holder, string) {
    return holder ? (
      <Form.Group className="mb-3">
        <Form.Label> {string} </Form.Label>
        <Form.Control placeholder={holder} disabled />
      </Form.Group>
    ) : (
      ""
    );
  }

  return (
    <>
      <section>
        <p className="headP">Dashboard / {data?.name}</p>
        <section className="sectionCont">
          <Form>
            <div className="img-cont">
              {data?.images?.map((i, index) => (
                <img src={i.img} alt="" className="centerImage" key={index} />
              ))}
            </div>
            {ValueChecker(data?.name, "Product Name")}
            {ValueChecker(data?.description, "Description")}
            {ValueChecker(data?.category?.name, "Category")}
            {ValueChecker(data?.subcategory?.name, "Sub-Category")}
            {ValueChecker(data?.price, "MRP")}
            {ValueChecker(data?.discountPrice, "Discount Price")}
            {ValueChecker(data?.discount, "Discount")}
            {ValueChecker(data?.returnPolicy, "Return Policy")}
            {ValueChecker(data?.Stock, "Stock")}
            {ValueChecker(data?.vendorId?.fullName, "Vendor Name")}
            {ValueChecker(data?.vendorId?.city, "Vendor Location")}
            {ValueChecker(data?.vendorId?.email, "Vendor Email")}
            {ValueChecker(data?.vendorId?.phone, "Vendor Mobile")}
            {ValueChecker(data?.quantity, "Quantity")}
            {ValueChecker(data?.stockStatus, "Stock Status")}
            {ValueChecker(data?.viewOnwebsite, "Active on Website")}
            {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}

            <Link to="/Product">
              <Button variant="dark">Back</Button>
            </Link>
          </Form>
        </section>
      </section>
    </>
  );
};

export default HOC(SingleProduct);
