import React from "react";
import BaseUrl from "../../BaseUrl";
import { useState, useEffect } from "react";
import HOC from "../../layout/HOC";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../Auth";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { toast } from "react-toastify";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useDisclosure,
} from "@chakra-ui/react";
import Overlay from "react-bootstrap/Overlay";

const Dishes = () => {
  const [loading, setLoading] = useState(false);
  const [Dishes, setDishes] = useState([]);
  const params = useParams();
  const [popup, setPopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [img1, setImg1] = useState("");
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [sfile, setSelectedfile] = useState(null);
  const [show, setShow] = useState(false);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate=useNavigate()
  const [modal1IsOpen, setModal1IsOpen] = useState(false);
  const [modal2IsOpen, setModal2IsOpen] = useState(false);

  const onOpen = (modalIdentifier) => {
    if (modalIdentifier === "modal1") {
      setModal1IsOpen(true);
    } else if (modalIdentifier === "modal2") {
      setModal2IsOpen(true);
    }
  };

  const onClose = (modalIdentifier) => {
    if (modalIdentifier === "modal1") {
      setModal1IsOpen(false);
    } else if (modalIdentifier === "modal2") {
      setModal2IsOpen(false);
    }
  };
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const target = useRef(null);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const updateCategory = (id) => {
    const newData = new FormData();
    if (selectedFile) {
      newData.append("image", selectedFile);
    }
    if (name) {
      newData.append("name", name);
    }
    if (name || img1) {
      axios
        .put(
          `https://jatin-tagra-backend.vercel.app/api/v1/Category/updateCategory/${id}`,
          newData,
          auth
        )
        .then((res) => {
          console.log(res.data);
          fetchDishes();
          onClose("modal2");
          toast("Updated Sucessfully");
        });
    }
  };
  const addCategory = () => {
    const formData = new FormData();

    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    if (name) {
      formData.append("name", name);
    }

    if (name || img1) {
      axios
        .post(
          `https://jatin-tagra-backend.vercel.app/api/v1/Category/addCategory`,
          formData,
          auth
        )
        .then((res) => {
          console.log(res);
          fetchDishes();
          onClose("modal1");
          toast("Category Added ");
        });
    }
  };
  const url =
    "https://jatin-tagra-backend.vercel.app/api/v1/Category/allCategory";

  const fetchDishes = async () => {
    try {
      const res = await axios.get(url, auth);
      console.log(res?.data);
      if (res?.data?.message) {
        setDishes([]);
        toast("No Dishes Found");
      } else {
        setDishes(res?.data.categories);
        console.log(Dishes);
      }
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const deleteDish = async (id) => {
    const url = BaseUrl() + `/api/v1/Category/deleteCategory/${id}`;
    try {
      const res = await axios.delete(url, auth);
      toast.success("Deleted Successfully");
      fetchDishes();
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase">
            All Category
          </span>
          <div>
            <Button onClick={() => onOpen("modal1")} style={{ color: "black" }}>
              Add Category
            </Button>

            <Modal
              initialFocusRef={initialRef}
              isOpen={modal1IsOpen}
              onClose={() => onClose("modal1")}
              size={"3xl"}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add Category</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Category Name</FormLabel>
                    <Input
                      ref={initialRef}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First name"
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <input type="file" onChange={handleFileChange} />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    style={{ color: "black" }}
                    colorScheme="black"
                    color="black"
                    onClick={addCategory}
                    mr={3}
                  >
                    Add
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Overlay target={target.current} show={show} placement="right">
              {({
                placement: _placement,
                arrowProps: _arrowProps,
                show: _show,
                popper: _popper,
                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                ...props
              }) => (
                <div
                  {...props}
                  style={{
                    position: "absolute",
                    backgroundColor: "rgba(255, 100, 100, 0.85)",
                    padding: "2px 10px",
                    color: "white",
                    borderRadius: 3,
                    ...props.style,
                    zIndex: "1",
                    top: "50%",
                  }}
                ></div>
              )}
            </Overlay>

            {showPopup && (
              <div
                className="popup"
                style={{ border: "1px solid black", marginTop: "20%" }}
              >
                <div className="popup-content">
                  <button onClick={togglePopup} className="close-button">
                    Close
                  </button>
                  <p>Popup content goes here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className=" wcomp overflow-y-auto">
            {loading && <Oval className="align-center" />}
            <table className="table-auto  w-full text-left whitespace-no-wrap">
              <thead style={{ fontSize: "15px", textAlign: "center" }}>
                <tr
                  style={{ fontSize: "15px" }}
                  className=" border-b bg-slate-200 shadow-xl text-gray-900"
                >
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Category Image
                  </th>

                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    -
                  </th>
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Category Name
                  </th>
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Category Status
                  </th>

                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Delete Category
                  </th>
                  <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                    Update Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {Dishes?.map((e, i) => {
                  return (
                    <tr key={i} className="tracking-wider text-gray-900">
                      <td className=" py-3 w-36 md:text-base text-sm ">
                        <img src={e.image} alt="" />
                      </td>
                      <td className="px-4 py-3 md:text-base text-sm cursor-pointer"></td>
                      <td
                        style={{ fontSize: "15px" }}
                        className="px-4 py-3 md:text-base text-sm cursor-pointer"
                        onClick={() => navigate(`/Restaurantby/${e._id}`)}
                      >
                        {e.name}
                      </td>
                      <td
                        style={{ fontSize: "15px" }}
                        className="px-4 py-3 md:text-base text-sm cursor-pointer"
                      >
                        {e.status}
                      </td>

                      <td className="px-4 py-3  space-x-3">
                        <button className="font-semibold tracking-widest">
                          <MdDelete
                            style={{ fontSize: "15px" }}
                            className="text-lg md:text-2xl"
                            onClick={() => deleteDish(e._id)}
                          />
                        </button>
                      </td>
                      <td>
                        {" "}
                        <GrUpdate
                          onClick={() => onOpen("modal2")}
                          style={{ cursor: "pointer" }}
                        />
                        {/* <Button style={{ color: "black" }}>Add Category</Button> */}
                        <Modal
                          initialFocusRef={initialRef}
                          isOpen={modal2IsOpen}
                          onClose={() => onClose("modal2")}
                          size={"3xl"}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Update Category</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                              <FormControl>
                                <FormLabel>Category New Name</FormLabel>
                                <Input
                                  ref={finalRef}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="First name"
                                />
                              </FormControl>

                              <FormControl mt={4}>
                                <input
                                  type="file"
                                  onChange={handleFileChange}
                                />
                              </FormControl>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                style={{ color: "black" }}
                                colorScheme="black"
                                color="black"
                                onClick={() => updateCategory(e._id)}
                                mr={3}
                              >
                                Update
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
export default HOC(Dishes);
