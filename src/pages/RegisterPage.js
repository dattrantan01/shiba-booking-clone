import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import Button from "../components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import Radio from "../components/radio/Radio";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import httpH from "../config/axiosConfigH";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth-context";
import http from "../config/axiosConfig";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup.object({
    firstName: yup.string().required("Please enter your first name"),
    lastName: yup.string().required("Please enter your last name"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters or greater")
      .required("Please enter your password"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    phoneNumber: yup
      .string()
      .required("Please enter your phone number")
      .matches(/^\d+$/, "Phone must be number")
      .min(8, "8 or greater"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmpassword: "",
      gender: 1,
    },
  });
  const watchGender = watch("gender");
  const handeAddUser = (values) => {
    setIsLoading(true);
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      gender: values.gender === 1 ? true : false,
      password: values.password,
      phone: values.phoneNumber,
      roleId: "636723d347707eeadf80eb59",
      avatar:
        "https://images.unsplash.com/photo-1667506057200-e55b56ee2b44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    };
    console.log("user", user);
    http
      .post("v1/client/sign-up", user)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
      })
      .then(() => {
        console.log(localStorage.getItem("token"));
        http.get("v1/me").then((resUser) => {
          setIsLoading(false);
          setUser(resUser.data);
          navigate("/");
        });
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err?.data?.message);
        console.log(err);
      });
  };
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);
  return (
    <div className="minH-[100vh] h-[100vh] w-[100%]  pt-10">
      <div className="max-w-[1000px] mx-auto px-5">
        <h1 className="font-bungee text-5xl text-center mb-7 text-primary">
          Shiba Booking
        </h1>
        <form
          className="mx-auto max-w-[600px]"
          onSubmit={handleSubmit(handeAddUser)}
        >
          <Field>
            <Label name="email">Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="Enter your email"
              control={control}
            ></Input>
            {errors.email && (
              <p className="text-sm text-red-500 color-red">
                {errors.email.message}
              </p>
            )}
          </Field>
          <Field>
            <Label name="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              control={control}
            ></Input>
            {errors.firstName && (
              <p className="text-sm text-red-500 color-red">
                {errors.firstName.message}
              </p>
            )}
          </Field>
          <Field>
            <Label name="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              control={control}
            ></Input>
            {errors.lastName && (
              <p className="text-sm text-red-500 color-red">
                {errors.lastName.message}
              </p>
            )}
          </Field>
          <Field>
            <Label name="phoneNumber">Phone number</Label>
            <Input
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number"
              control={control}
            ></Input>
            {errors.phoneNumber && (
              <p className="text-sm text-red-500 color-red">
                {errors.phoneNumber.message}
              </p>
            )}
          </Field>
          <Field>
            <Label name="number">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              control={control}
            ></Input>
            {errors.password && (
              <p className="text-sm text-red-500 color-red">
                {errors.password.message}
              </p>
            )}
          </Field>
          <Field>
            <Label name="number">Confirm password</Label>
            <Input
              type="password"
              name="confirmpassword"
              placeholder="Enter your confirm password"
              control={control}
            ></Input>
            {errors.confirmpassword && (
              <p className="text-sm text-red-500 color-red">
                {errors.confirmpassword.message}
              </p>
            )}
          </Field>
          <Field>
            <Label htmlFor="gender">Gender</Label>
            <div className="flex flex-row items-center gap-3">
              <Radio
                name="gender"
                control={control}
                value={1}
                checked={Number(watchGender) === 1}
              >
                Male
              </Radio>
              <Radio
                name="gender"
                control={control}
                value={2}
                checked={Number(watchGender) === 2}
              >
                Female
              </Radio>
            </div>
          </Field>
          <div className="w-full flex justify-center gap-10 mb-4">
            <Button type="submit" isLoading={isLoading}>
              Submit
            </Button>
          </div>
          <div className="text-sm justify-center flex text-grayCustom">
            <span className="inline-block mr-1">Already have an account? </span>
            <NavLink to={"/login"} className="font-semibold cursor-pointer">
              Sign in
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
