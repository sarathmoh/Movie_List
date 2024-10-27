import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useAuthContext } from "@/contexts/authContext";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuthContext();

  const signupHandler = () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const response = signUp(data.email);
    if (response.statusCode === 201) {
      toast.success(response.message);
      navigate("/dashboard/home");
    } else {
      toast.error(response.message);
    }
   
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 max-sm:px-5">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up here
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
                Sign up
              </button>
            </div>
            <p
              className="text-right font-bold text-gray-500 cursor-pointer"
              onClick={signupHandler}
            >
              already member login
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
