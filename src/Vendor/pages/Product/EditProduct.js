/** @format */
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const [image, setImage] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [discountActive, setDicountActive] = useState(null);
  const [originalPrice, setOriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [varient, setVariant] = useState(null);
  const [size, setSize] = useState(null);
  const [categoryArr, setCategoryArr] = useState([]);
  const [subCatArr, setSubCatArr] = useState([]);
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [packageCharges, setPackageCharges] = useState(null);
  const [gst, setGst] = useState(null);
  const [cGst, setCGst] = useState(null);
  const [sGst, setSGst] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [nutirient, setNutirient] = useState(null);
  const [storageTips, setStorageTips] = useState(null);
  const [manufactureDetails, setManufactureDetails] = useState(null);
  const [subCategoryName, setsubCategoryName] = useState("");
  const navigate = useNavigate();
  const Baseurl = `https://jatin-tagra-backend.vercel.app`;

  const getProductDetail = async () => {
    try {
      const res = await axios.get(
        `${Baseurl}/api/v1/product/viewProduct/${id}`
      );
      console.log(res.data.data.subcategory.name);
      setProductImages(res.data.data.images);
      setCategoryId(res.data.data.category._id);
      setCategoryName(res.data.data?.category.name);
      setProductName(res.data.data.name);
      subCategoryId(res.data.data?.subcategory?._id);
      setsubCategoryName(res.data.data?.subcategory?.name);
    } catch {}
  };

  const getCategory = async () => {
    try {
      const res = await axios.get(
        "https://jatin-tagra-backend.vercel.app/api/v1/vendor/getCategory"
      );
      setCategoryArr(res.data.categories);
    } catch (e) {
      console.log(e);
    }
  };

  const getSubCategory = async (payload) => {
    try {
      const res = await axios.get(
        `https://jatin-tagra-backend.vercel.app/api/v1/SubCategory/allSubcategoryById/${payload}`
      );

      setSubCatArr(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategory();
    getProductDetail();
  }, []);

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fd = new FormData();
  Array.from(image).forEach((img) => {
    fd.append("image", img);
  });

  const createProduct = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!categoryId && !subCategoryId) {
      toast.error("Category and Sub-Category Required");
      return;
    }
    if (categoryId) {
      fd.append("category", categoryId);
    }
    if (subCategoryId) {
      fd.append("subcategoryId", subCategoryId);
    }
    if (discountActive) {
      fd.append("discountActive", discountActive);
    }

    if (originalPrice) {
      fd.append("price", originalPrice);
    }

    if (discount) {
      fd.append("discount", discount);
    }
    if (productName) {
      fd.append("name", productName);
    }

    if (description) {
      fd.append("description", description);
    }
    if (size) {
      fd.append("size", size);
    }
    if (stock) {
      fd.append("Stock", stock);
    }

    if (packageCharges) {
      fd.append("packageCharges", packageCharges);
    }
    if (gst) {
      fd.append("gst", gst);
    }

    if (cGst) {
      fd.append("cGst", cGst);
    }
    if (sGst) {
      fd.append("sGst", sGst);
    }

    if (quantity) {
      fd.append("quantity", quantity);
    }

    if (size) {
      fd.append("size", size);
    }
    if (nutirient) {
      fd.append("nutirient", nutirient);
    }

    if (storageTips) {
      fd.append("storageTips", storageTips);
    }

    if (manufactureDetails) {
      fd.append("manufactureDetails", manufactureDetails);
    }
    if (discount) {
      fd.append("discount", discount);
    }

    if (description) {
      fd.append("description", description);
    }

    try {
      const res = await axios.put(
        `https://jatin-tagra-backend.vercel.app/api/v1/product/editProduct/${id}`,
        fd,
        Auth
      );
      toast.success(res.data.message);
      setLoading(false);
      setImage([]);
      setCategoryId("");
      setSubCategoryId("");
      setDicountActive(null);
      setDiscount("");
      setProductName("");
      setDescription("");
      setReturnPolicy("");
      setVariant(null);
      setSize(null);
      setStock(0);
    } catch (e) {
      const msg = e.response.data;
      toast.error(msg);
      setLoading(false);
    }
    navigate("/Product");
  };

  return (
    <section>
      <p className="headP">Dashboard / Edit Product</p>
      <section className="sectionCont">
        <div className="img-cont">
          {productImages?.map((i, index) => (
            <img src={i} alt="" className="centerImage" key={index} />
          ))}
        </div>
        <Form onSubmit={createProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              required
              onChange={(e) => setImage(e.target.files)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Previous Category Name</Form.Label>
            <Form.Control type="text" defaultValue={categoryName} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Choose Category</Form.Label>
            <Form.Select
              required
              onChange={(e) => {
                setCategoryId(e.target.value);
                getSubCategory(e.target.value);
              }}
            >
              <option>-- Select Category --</option>
              {categoryArr?.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Previous SubCategory</Form.Label>
            <Form.Control type="text" required defaultValue={subCategoryName} />
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Choose Sub-Category</Form.Label>
            <Form.Select
              required
              onChange={(e) => setSubCategoryId(e.target.value)}
            >
              <option>-- Select Sub-Category --</option>
              {subCatArr?.data?.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>MRP</Form.Label>
            <Form.Control
              type="number"
              step={0.01}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Package Charges</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setPackageCharges(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>GST</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setGst(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CGST</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setCGst(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>SGST</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setSGst(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Quantity</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Size</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setSize(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Nutirient</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setNutirient(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Storage Tips</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setStorageTips(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Manufacture Details</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setManufactureDetails(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Do you want activate discount in this product
            </Form.Label>
            <Form.Select onChange={(e) => setDicountActive(e.target.value)}>
              <option></option>
              <option value={"true"}>Yes</option>
              <option value={"false"}>NO</option>
            </Form.Select>
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>
              Do you want activate discount in this product
            </Form.Label>
            <Form.Select
              onChange={(e) => setDicountActive(e.target.value)}
              required
            >
              <option></option>
              <option value={"true"}>Yes</option>
              <option value={"false"}>NO</option>
            </Form.Select>
          </Form.Group> */}

          {/* {discountActive === "true" ? (
            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                step={0.01}
                min={0}
                max={100}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>
          ) : (
            ""
          )} */}

          {/* <Form.Group className="mb-3">
            <Form.Label>Return Policy</Form.Label>
            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                required
                onChange={(e) => setReturnPolicy(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group> */}

          {/* <Form.Group className="mb-3">
            <Form.Label>Do you want add Varient in this product</Form.Label>
            <Form.Select onChange={(e) => setVariant(e.target.value)} required>
              <option></option>
              <option value={"true"}>Yes</option>
              <option value={"false"}>NO</option>
            </Form.Select>
          </Form.Group> */}
          {/* {varient === "false" ? (
            <Form.Group className="mb-3">
              <Form.Label>Do you want add Size in this product</Form.Label>
              <Form.Select onChange={(e) => setSize(e.target.value)} required>
                <option></option>
                <option value={"true"}>Yes</option>
                <option value={"false"}>NO</option>
              </Form.Select>
            </Form.Group>
          ) : (
            ""
          )} */}

          {/* {varient === "false" && size === "false" ? (
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
          ) : (
            ""
          )} */}

          <div className="w-100 d-flex justify-content-between">
            <Button variant="success" type="submit">
              {loading ? <Spinner animation="border" /> : "Submit"}
            </Button>

            <Link to="/Product">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default HOC(EditProduct);
