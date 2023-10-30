import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";

import auth from "../../Auth";
import { useParams } from "react-router-dom";

import HOC from "../../layout/HOC";
import axios from "axios";
import BaseUrl from "../../BaseUrl";

const VendorViewProduct = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();

  const fetchProductsById = async () => {
    const url = BaseUrl() + `/product/get/${params.id}`;
    try {
      const res = await axios.get(url);
      console.log("res", res);
      setProducts(res.data);
      //   setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchProductsById();
  }, []);

  return (
    <>
      <section>
        <div className=" wcomp overflow-y-auto text-black">
          {products.map((item) => {
            return (
              <div className="border border-slate-300 px-4 py-2">
                <div className="flex items-center gap-3">
                  {item.productPictures.map((img) => {
                    return (
                      <div>
                        <img
                          src={"https://dtou.herokuapp.com/" + img.img}
                          className="h-20"
                        />
                      </div>
                    );
                  })}
                </div>
                <h1>
                  <strong>Product Name-</strong>
                  {item.title}
                </h1>
                <h1>
                  <strong>Category-</strong>
                  {item.category}
                </h1>
                <h1>
                  <strong>MRP-</strong>
                  {item.MRP}
                </h1>
                <h1>
                  <strong>Description-</strong>
                </h1>
                <p>{item.description}</p>
                <h1>
                  <strong>Brand-</strong>
                  {item.brand}
                </h1>
                <h1>
                  <strong>Color-</strong>
                  {item.color === 0 ? "No color Specified" : item.color}
                </h1>
                <h1>
                  <strong>Attributes-</strong>
                  {item.attributes}
                </h1>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default HOC(VendorViewProduct);
