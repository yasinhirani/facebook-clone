import * as Yup from "yup";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const RegisterValidation = Yup.object({
  userName: Yup.string()
    .required("User Name is required")
    .matches(/^\S*$/, "Username should not contain space"),
  email: Yup.string()
    .required("Email is required")
    .matches(emailRegex, "Email is not valid"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^\S*$/, "Password should not contain space"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf(
      [Yup.ref("password")],
      "Password and Confirm Password Did not match"
    ),
});

export default RegisterValidation;
