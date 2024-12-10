import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userCont } from "../../context/User.context";

export default function Login() {
  //within toast
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  const { token, setToken } = useContext(userCont);
  const schema = yup.object({
    Email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),

    NewPassword: yup
      .string()
      .required("password is required")
      .matches(
        /^[0-9a-zA-Z]{5,15}$/,
        "password should contain a combinations of letters and numberfrom 5 to 15 char"
      ),
  });
  const formik = useFormik({
    initialValues: {
      Email: "",
      NewPassword: "",
    },
    validationSchema: schema,
    onSubmit: sendData,
  });
  async function sendData(values) {
    let id;
    try {
      // const formData = new FormData();
      // for (const key in values) {
      //   formData.append(key, values[key]);
      // }
      const option = {
        url: "http://gradproject.somee.com/api/student/update ",
        method: "PUT",
        data: values,
        // headers: {
        //   "Content-Type": "application/json",
        // },
      };

      // id = toast.loading("waiting...");
      const re = await axios.request(option);

      console.log(re);
      toast.dismiss(id);
      toast.success("user logedin successfully");

      setTimeout(() => {
        // if(token){
        //     localStorage.setItem("token", data.token);
        // setToken(data.token);
        // navigate("/");

        // }
        if (re.status === 200) {
          navigate("/app");
        }
      }, 1000);
    } catch (error) {
      console.log(error);

      // toast.dismiss(id);
      // toast.error(error.response.data.message);
      // setErrorMsg(error.response.data.message);
    }
  }

  return (
    <>
      <section className="mx-44 my-10">
        <h2 className="text-primary text-xl pb-4">
          <i className=" fa-regular fa-circle-user me-3"></i>
          <span>Reset Password </span>
        </h2>
        <form className=" flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="email"
              className=" form-control w-full"
              placeholder="Email"
              name="Email"
              value={formik.values.Email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.Email && formik.touched.Email ? (
              <div className=" text-red-600 font-semibold mt-2">
                *{formik.errors.Email}
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="password"
              className=" form-control w-full"
              placeholder="password"
              name="NewPassword"
              value={formik.values.NewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.NewPassword && formik.touched.NewPassword ? (
              <div className=" text-red-600 font-semibold mt-2">
                *{formik.errors.NewPassword}
              </div>
            ) : (
              ""
            )}
            {errorMsg ? (
              <div className=" text-red-600 font-semibold mt-2">
                *{errorMsg}
              </div>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className=" btn-primary ">
            log in
          </button>
        </form>
      </section>
    </>
  );
}
