import UnauthenticatedUser from "../../components/Header/UnauthenticatedUser";
import * as YUP from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import AuthContext from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const schema = YUP.object().shape({
  email: YUP.string().email("Email is not valid").required("Email is required"),
  password: YUP.string()
    .min(6, "Password must be 6 letter")
    .required("Password is required"),
});

export default function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  if (authContext.isLogedin) {
    navigate("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors, usSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userDatas = {
        user: {
          email: data.email,
          password: data.password,
        },
      };

      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userDatas),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "خطا در ورود به سیستم");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("خطا در ورود:", error.message);
      throw error;
    }
  };
  return (
    <>
      <UnauthenticatedUser />
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign in</h1>
              <p class="text-xs-center">
                <a href="/register">Need an account?</a>
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset class="form-group">
                  <input
                    {...register("email")}
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                  />
                  <ul class="error-messages">
                    {errors.email && <li>{errors.email.message}</li>}
                  </ul>
                </fieldset>

                <fieldset class="form-group">
                  <input
                    {...register("password")}
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                  />
                  <ul class="error-messages">
                    {errors.password && <li>{errors.password.message}</li>}
                    {/* اگر خطای سرور وجود داشت، اینجا می‌توانید نمایش دهید */}
                  </ul>
                </fieldset>
                <button
                  type="submit"
                  class="btn btn-lg btn-primary pull-xs-right"
                >
                  {usSubmitting ? "در حال ورود..." : "Sign in"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
