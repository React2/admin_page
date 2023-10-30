import React, { useEffect } from "react";
// import { Diologue } from "primereact/diologue";
// import { Button } from "primereact/diologue";
import image from "../../../assets/profile_update.png";
import HOC from "../../layout/HOC";
import axios, { Axios } from "axios";
import auth from "../../Auth";
import { useState } from "react";

let token = localStorage.getItem("direct");
const Profile = () => {
  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
    axios
      .put(
        "https://jatin-tagra-backend.vercel.app/api/v1/admin/update",
        null,
        auth
      )
      .then((res) => {
        setAdminData(res.data.data);
        console.log("s");
      });
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const AdminProfileUpdate = () => {
    let q = {};

    if (name) {
      q.fullName = name;
    }

    if (password) {
      q.password = password;
    }
    if (phone) {
      q.phone = phone;
    }
    if (email) {
      q.email = email;
    }

    if (name || password || phone || email) {
      axios
        .put(
          `https://jatin-tagra-backend.vercel.app/api/v1/admin/update`,
          q,
          auth
        )
        .then((res) => {
          console.log(q);
          console.log(res);
          setAdminData(res.data.data);
          alert(res.data.message);
        });
    }
  };
  return (
    <div className="container mb-3 justify-center flex align-item-center">
      <div className=" w-full h-screen flex flex-col justify-center items-center ">
        <div className="col-lg-6">
          <form>
            <div className="form-floating mb-3">
              <span className="text-2xl font-bold text-center text-[rgb(240,72,88)] ml-20">
                <img
                  src={image}
                  alt=""
                  className=" image h-48 flex flex-col justify-center items-center rounded-full mb-20 ml-80"
                />
              </span>
            </div>
            <div className="form-floating mb-3">
              <input
                type="Name"
                name="Name"
                id="Name"
                onChange={(e) => setName(e.target.value)}
                className="form-control lg:w-5/6 mx-auto rounded-full"
                placeholder={`Name:- ${adminData.fullName}`}
              />
              <label htmlFor="Name"></label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="Email"
                name="Email"
                id="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control lg:w-5/6 mx-auto rounded-full"
                placeholder={`Email:- ${adminData.email}`}
              />
              <label For="Email"></label>
            </div>
            <div className="form-floating mb-3 rounded-full">
              <input
                type="number"
                name="number"
                id="number"
                onChange={(e) => setPhone(e.target.value)}
                className="form-control lg:w-5/6 mx-auto rounded-full"
                placeholder={`Mobile Number :- ${adminData.phone}`}
              />
              <label For="number"></label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="Text"
                name="Text"
                id="text"
                className="form-control lg:w-5/6 mx-auto rounded-full"
                placeholder="Enter New Password Here"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label For="Text"></label>
            </div>
            <div>
              <button
                onClick={() => AdminProfileUpdate()}
                type="button"
                class="btn btn-danger rounded-full bg-[rgb(240,72,88)] lg:w-5/6 mx-auto ml-20"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HOC(Profile);
