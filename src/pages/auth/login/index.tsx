import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function Login() {
  const [signIn, setSignIn] = useState(true);
  const navigate = useNavigate();

  const signupHandler = () => {
    setSignIn(!signIn);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (signIn) {
      const user = users.find(
        (user: { email: string }) => user.email === data.email
      );
      if (user) {
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("currentlyLogged",data.email)
        navigate("/dashboard/home");
      } else {
        toast.error("No user found, please sign up");
        setSignIn(false);
      }
    } else {
      const existingUser = users.find(
        (user: { email: string }) => user.email === data.email
      );
      if (existingUser) {
        toast.error("User already exists, please log in");
      } else {
        const newUser = {
          id: uuidv4(),
          email: data.email,
          watchlist: [],
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("currentlyLogged",data.email)

        toast.success("Sign up successful");
        navigate("/dashboard/home");
        setSignIn(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 max-sm:px-5">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {signIn ? "Login to your account" : "Sign up here"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="font-bold">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    errors?.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 m-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#FEDFE1] text-black hover:bg-[#f7bec7] p-2  "
              >
                {signIn ? "Log in" : "Sign up"}
              </button>
            </div>
            <p
              className="text-right font-bold text-gray-500 cursor-pointer"
              onClick={signupHandler}
            >
              {signIn ? " New here signup" : "already member login"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
