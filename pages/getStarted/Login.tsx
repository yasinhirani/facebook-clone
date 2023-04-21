import toastConfig from "@/core/components/toast.config";
import AuthContext from "@/core/context";
import LoginValidation from "@/core/validation/login.validation";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

interface ILoginValues {
  email: string;
  password: string;
}

interface IProps {
  setLoginVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setLoginVisible }: IProps) => {
  const { setAuthData } = useContext(AuthContext);

  const router = useRouter();

  const [disableState, setDisableState] = useState<boolean>(false);

  const initialValues: ILoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: ILoginValues) => {
    setDisableState(true);
    const { email, password } = values;
    axios
      .post("/api/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message, toastConfig);
          setAuthData(res.data.authData);
          localStorage.setItem("authData", JSON.stringify(res.data.authData));
          router.push("/");
          setDisableState(false);
        } else {
          toast.error(res.data.message, toastConfig);
          setDisableState(false);
        }
      });
  };
  return (
    <div className="bg-white rounded-lg p-8 w-full sm:w-1/2 space-y-6">
      <Formik
        initialValues={initialValues}
        validationSchema={LoginValidation}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleBlur, handleChange, values, errors, touched }) => {
          return (
            <Form className="w-full flex flex-col space-y-5">
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
              <button
                type="submit"
                disabled={disableState}
                className="bg-primary px-4 py-3 rounded-lg text-white font-semibold text-lg disabled:bg-opacity-50 disabled:cursor-not-allowed"
              >
                {disableState ? "Please Wait..." : "Login"}
              </button>
            </Form>
          );
        }}
      </Formik>
      <hr />
      <div className="flex justify-center">
        <button
          type="button"
          className="bg-[#47b63b] px-4 py-3 rounded-lg text-white font-semibold text-lg w-52"
          onClick={() => setLoginVisible(false)}
        >
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default Login;
