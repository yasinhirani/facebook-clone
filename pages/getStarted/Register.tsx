import toastConfig from "@/core/components/toast.config";
import RegisterValidation from "@/core/validation/register.validation";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface ILoginValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IProps {
  setLoginVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = ({ setLoginVisible }: IProps) => {
  const router = useRouter();

  const [disableState, setDisableState] = useState<boolean>(false);

  const initialValues: ILoginValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: ILoginValues) => {
    setDisableState(true);
    const { userName, email, password } = values;
    axios
      .post("/api/register", {
        userName,
        email,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message, toastConfig);
          setLoginVisible(true);
          setDisableState(false);
        } else {
          toast.error(res.data.message, toastConfig);
        }
      });
  };
  return (
    <div className="bg-white rounded-lg p-8 w-full sm:w-1/2 space-y-6">
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterValidation}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, handleBlur, handleChange, errors, touched }) => {
          return (
            <Form className="w-full flex flex-col space-y-5">
              <div>
                <Field
                  name="userName"
                  label="User Name"
                  type="text"
                  placeholder="User Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent outline-none disabled:cursor-not-allowed"
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                  disabled={disableState}
                />
                {errors.userName && touched.userName && (
                  <p className="text-xs text-red-600 font-semibold">
                    {errors.userName}
                  </p>
                )}
              </div>
              <div>
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent outline-none disabled:cursor-not-allowed"
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  disabled={disableState}
                />
                {errors.email && touched.email && (
                  <p className="text-xs text-red-600 font-semibold">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent outline-none disabled:cursor-not-allowed"
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  disabled={disableState}
                />
                {errors.password && touched.password && (
                  <p className="text-xs text-red-600 font-semibold">
                    {errors.password}
                  </p>
                )}
              </div>
              <div>
                <Field
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent outline-none disabled:cursor-not-allowed"
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  disabled={disableState}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-xs text-red-600 font-semibold">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={disableState}
                className="bg-[#47b63b] px-4 py-3 rounded-lg text-white font-semibold text-lg disabled:bg-opacity-50 disabled:cursor-not-allowed"
              >
                {disableState ? "Please Wait..." : "Register"}
              </button>
            </Form>
          );
        }}
      </Formik>
      <hr />
      <div className="flex justify-center">
        <button
          type="button"
          className="bg-primary px-4 py-3 rounded-lg text-white font-semibold text-lg"
          onClick={() => setLoginVisible(true)}
        >
          Already Have a account, login
        </button>
      </div>
    </div>
  );
};

export default Register;
