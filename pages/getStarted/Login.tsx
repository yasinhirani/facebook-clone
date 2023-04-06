import AuthContext from "@/core/context";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useContext } from "react";

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

  const initialValues: ILoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: ILoginValues) => {
    const { email, password } = values;
    axios
      .post("http://localhost:8080/api/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          setAuthData(res.data.authData);
          localStorage.setItem("authData", JSON.stringify(res.data.authData));
          router.push("/");
          console.log(res.data.message);
        } else {
          console.log(res.data.message);
        }
      });
  };
  return (
    <div className="bg-white rounded-lg p-8 w-1/2 space-y-6">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => {
          return (
            <Form className="w-full flex flex-col space-y-5">
              <Field
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent outline-none"
                autoComplete="off"
              />
              <Field
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent outline-none"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-primary px-4 py-3 rounded-lg text-white font-semibold text-lg"
              >
                Login
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
