import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEdit, AiFillCamera } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";

import HOC from "../../layout/HOC";
import axios from "axios";
import auth from "../../Auth";
import { Oval } from "react-loader-spinner";
import BaseUrl from "../../BaseUrl";
import { toast } from "react-toastify";

const VendorOrders = () => {
  return <></>;
};

export default HOC(VendorOrders);
