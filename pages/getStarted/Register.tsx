import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";

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

  const initialValues: ILoginValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: ILoginValues) => {
    const { userName, email, password } = values;
    axios
      .post("http://localhost:8080/api/register", {
        userName,
        email,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          setLoginVisible(true);
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
                name="userName"
                label="User Name"
                type="text"
                placeholder="User Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent outline-none"
                autoComplete="off"
              />
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
              <Field
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent outline-none"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-[#47b63b] px-4 py-3 rounded-lg text-white font-semibold text-lg"
              >
                Register
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
