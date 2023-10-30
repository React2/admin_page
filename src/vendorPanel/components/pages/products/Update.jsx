import React from "react";

const Update = () => {
  return (
    <>
      <section
        className={
          popup
            ? "fixed top-0 left-0 wcomp bg-[rgb(0,0,0,0.5)] transition-all duration-150 w-full flex justify-center items-center overflow-y-auto  h-screen "
            : "hidden"
        }
      >
        <div className="bg-slate-100 sm:h-[90vh] h-[80vh] overflow-y-auto  lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg">
          <div className="flex sticky top-0 py-3 px-5 bg-slate-100 justify-between">
            <span className=" font-semibold text-[rgb(241,146,46)] ">
              Add Property
            </span>
            <div className="text-[rgb(241,146,46)] py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
              <IoMdClose
                onClick={() => {
                  setEdit("");
                  setPopup(false);
                }}
              />{" "}
            </div>
          </div>
          {console.log(edit?.name)}
          {/* form */}
          <Formik
            initialValues={{
              name: "",
              price: "",
              address: "",
              property_date: "",
              area: "",
              extra: "",
            }}
            onSubmit={(values, { resetForm }) => {
              addProperty(values);
              // console.log(values);
              setImage();

              setImg(
                "https://media.istockphoto.com/vectors/real-estate-design-element-vector-id1308743863?b=1&k=20&m=1308743863&s=170667a&w=0&h=QlOIRhpsyxG-PM5EJNiNImCF1cJY07YpMbKGZKLFZF8="
              );
              resetForm();
            }}
          >
            <Form className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4">
              {/*  Image */}
              <div className="inline-flex  w-full flex-col">
                <label htmlFor="img" className="cursor-pointer">
                  <img
                    src={img}
                    alt=""
                    className="h-28 shadow-xl rounded-lg "
                  />
                </label>
                <input
                  id="img"
                  required
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const [file] = e.target.files;
                    setImg(URL.createObjectURL(file));
                    setImage(e.target.files[0]);
                  }}
                  className="invisible text-gray-800 tracking-wider bg-white text-sm rounded-full px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              {/*  Name */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Property Name*
                </label>
                <Field
                  id="name"
                  required
                  type="text"
                  name="name"
                  placeholder=""
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              {/*  price */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="price"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Price*
                </label>
                <Field
                  id="price"
                  required
                  type="text"
                  name="price"
                  placeholder=""
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              {/*  address */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="address"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Address*
                </label>
                <Field
                  id="address"
                  required
                  type="text"
                  name="address"
                  placeholder=""
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              {/*  property_date */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="property_date"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Property Date*
                </label>
                <Field
                  id="property_date"
                  required
                  type="date"
                  name="property_date"
                  placeholder=""
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              {/*  area */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="area"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Area*
                </label>
                <Field
                  id="area"
                  required
                  type="text"
                  name="area"
                  placeholder=""
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              {/*  Extra */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="extra"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Extra*
                </label>
                <Field
                  id="extra"
                  required
                  type="text"
                  name="extra"
                  placeholder=""
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>

              <Field
                type="submit"
                value="Add"
                className="bg-[rgb(241,146,46)] cursor-pointer w-40 hover:bg-[rgb(241,146,46)] py-1 rounded-full"
              />
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
};

export default Update;
