import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userCont } from "../../context/User.context";

export default function ForgetPass() {
  //within toast
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const { token, setToken } = useContext(userCont);
  const schema = yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("email is not valid"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: sendData,
  });
  async function sendData(values) {
    let id;
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      const option = {
        url: "http://gradproj.runasp.net/api/student/forgetpassword ",
        method: "POST",
        data: formData,
      };

      // id = toast.loading("waiting...");
      const re = await axios.request(option);
      console.log(re);
      // toast.dismiss(id);
      // toast.success(data.message);

      // setTimeout(() => {
      //   if (data.statusMsg === "success") {
      //     navigate("/auth/verifyCode");
      //   }
      // }, 3000);
    } catch (error) {
      console.log(error);

      // toast.dismiss(id);
      // toast.error(error.response.data.message);
      // setErrorMsg(error.response.data.message);
    }
  }
  return (
    <>
      <section>
        <h2 className="text-primary text-xl pb-4">
          <i className=" fa-regular fa-circle-user me-3"></i>
          <span>Forgot password</span>
        </h2>
        <form className=" flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="email"
              className=" form-control w-full"
              placeholder="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className=" text-red-600 font-semibold mt-2">
                *{formik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <button type="submit" className=" btn-primary ">
            send code
          </button>
        </form>
      </section>
    </>
  );
}
