import React, { useEffect, useState, useRef, useMemo } from "react";
import { Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEdit, AiFillCamera } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";

import HOC from "../../layout/HOC";
import axios from "axios";
import BaseUrl from "../../BaseUrl";
import auth from "../../Auth";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddProduct = () => {
  const EDITOR_MODULES = {
    toolbar: {
      container: "#toolbar",
    },
  };

  const [prop, setProp] = useState([]);
  let token = localStorage.getItem("Shaft");
  const [banners, setBanners] = useState([]);
  const [popup, setPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState([]);
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState([null]);
  const [price, setPrice] = useState("");
  const [info, setInfo] = useState("");
  const [code, setCode] = useState();
  const [hsn, setHsn] = useState();
  const [gst, setGst] = useState();
  const [withoutGst, setWithoutGst] = useState();
  const [brand, setBrand] = useState();
  const [featuredDetails, setFeaturedDetails] = useState();
  const [policy, setPolicy] = useState();
  const [color, setColor] = useState();
  const [attributes, setAttributes] = useState();
  const [tax, setTax] = useState();
  const editor = useRef(null);
  const fileObj = [];
  const fileArray = [];
  const [selectedFiles, setSelectedFiles] = useState([]);

  // const config = useMemo(
  //   {
  //     readonly: false, // all options from https://xdsoft.net/jodit/doc/,
  //   },
  //   []
  // );

  const [name, setName] = useState("");
  let modules = { clipboard: { matchVisual: false } };

  const handleImageChange = (e) => {
    // console.log(e.target.files[])
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      // console.log("filesArray: ", filesArray);

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const fetchCategory = async () => {
    const url = BaseUrl() + "/category/get/category";
    try {
      const res = await axios.get(url);
      console.log("res", res);
      setCategory(res.data.categories);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const url = BaseUrl() + "/product/add";

    const fd = new FormData();

    fd.append("product_images", selectedFiles);
    fd.append("category", cat);
    fd.append("title", title);
    fd.append("MRP", price);
    fd.append("description", desc);
    fd.append("product_information", info);
    fd.append("product_code", code);
    fd.append("product_hsn_code", hsn);
    fd.append("MOP", gst);
    fd.append("Without_gst_price", withoutGst);
    fd.append("brand", brand);
    fd.append("featured_details", featuredDetails);
    fd.append("return_policy", policy);
    fd.append("attributes", attributes);
    fd.append("Tax_igst", tax);

    try {
      const res = await axios.post(url, fd, auth);
      console.log("resProduct", res);
      toast.success("Added Successfully");
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again");
    }
  };

  // const renderPhotos = (source) => {
  //   console.log("source: ", source);
  //   return source.map((photo) => {
  //     return <img src={photo} alt="" key={photo} />;
  //   });
  // };

  useEffect(() => {
    fetchCategory();
  }, []);

  // const uniqueCategories = [...new Set(category)];
  // function removeDuplicates(category) {
  //   return [...new Set(category)];
  // }
  // console.log("unique", removeDuplicates(category));

  return (
    <>
      <div className="flex sticky top-0 py-3 px-5 bg-slate-100 justify-between rounded-full text-[rgb(240,72,88)]">
        <span className=" font-semibold rounded-full text-[rgb(240,72,88)] ">
          Add Products
        </span>
      </div>
      {/* form */}

      <form
        className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4"
        onSubmit={addProduct}
      >
        {/* {image.length > 0
          ? image.map((pic, index) => <div key={index}>{pic.name}</div>)
          : null} */}
        {/*  Image */}
        {/* <div className="flex items-center gap-2">
          {renderPhotos(selectedFiles)}
        </div> */}
        <div className="inline-flex  w-full flex-col">
          <label htmlFor="img" className="cursor-pointer">
            Image
          </label>
          <input
            id="img"
            required
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setSelectedFiles(e.target.files[0])}
            className=" text-gray-800 tracking-wider bg-white text-sm rounded-full px-2 outline-[rgb(241,146,46)]"
          />
        </div>
        {/*  Name */}
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="name"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            Products Name
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            value={edit ? edit.title : title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=""
            className=" text-gray-800 tracking-wider border  border-gray-400 text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
          />
        </div>
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="name"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            Info
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            placeholder=""
            className=" text-gray-800 tracking-wider  border  border-gray-400 text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
          />
        </div>
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="name"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            Tax
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
            placeholder="%"
            className=" text-gray-800 tracking-wider  border  border-gray-400 text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
          />
        </div>
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="name"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            Pin Code
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder=""
            className=" text-gray-800 tracking-wider border  border-gray-400 text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
          />
        </div>
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="name"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            Product Hsn
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            value={hsn}
            onChange={(e) => setHsn(e.target.value)}
            placeholder=""
            className=" text-gray-800 tracking-wider text-sm border  border-gray-400 rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
          />
        </div>
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="name"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            MOP(Selling Price)
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
            placeholder=""
            className=" text-gray-800 tracking-wider border  border-gray-400 text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
          />
        </div>
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="name"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            Without Gst Price
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            value={withoutGst}
            onChange={(e) => setWithoutGst(e.target.value)}
            placeholder=""
            className=" text-gray-800 tracking-wider border  border-gray-400 text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
          />
        </div>
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="name"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            Brand
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder=""
            className=" text-gray-800 tracking-wider text-sm border  border-gray-400 rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
          />
        </div>
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="name"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            Policy
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
            placeholder=""
            className=" text-gray-800 tracking-wider border  border-gray-400 text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
          />
        </div>
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="name"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            Attributes
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            value={attributes}
            onChange={(e) => setAttributes(e.target.value)}
            placeholder=""
            className=" text-gray-800 tracking-wider text-sm border  border-gray-400 rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
          />
        </div>
        {/*  price */}
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="price"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            MRP.
          </label>
          <input
            value={edit ? edit.price : price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            required
            type="text"
            name="price"
            placeholder=""
            className=" text-gray-800 tracking-wider border  border-gray-400 text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
          />
        </div>
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="price"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            Category
          </label>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            required
            type="text"
            placeholder=""
            className=" text-gray-800 tracking-wider border  border-gray-400 text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
          >
            <option>--Select--</option>
            {category?.map((item) => {
              return (
                <>
                  <option value={item._id}>{item.category}</option>
                </>
              );
            })}
          </select>
        </div>
        <div className="inline-flex  w-full flex-col">
          <label
            htmlFor="name"
            className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
          >
            Featured Details
          </label>
          <ReactQuill
            theme="snow"
            value={featuredDetails}
            className="text-black"
            style={{ minHeight: "100px" }}
            onChange={setFeaturedDetails}
          />
        </div>
        <label
          htmlFor="name"
          className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm mt-12"
        >
          Product Description
        </label>
        <ReactQuill
          theme="snow"
          value={desc}
          className="text-black"
          style={{ minHeight: "100px" }}
          onChange={setDesc}
        />

        <button
          type="submit"
          value="Add"
          className="bg-[rgb(241,146,46)] cursor-pointer w-40 hover:bg-[rgb(241,146,46)] py-1 rounded-full mt-8"
        >
          Add{" "}
        </button>
      </form>
    </>
  );
};

export default HOC(AddProduct);
