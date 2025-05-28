import React, { useEffect } from "react";
import * as YUP from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import AuthContext from "../Context/Context";
import { useNavigate } from "react-router-dom";
import AuthenticatedUser from "../components/Header/AuthenticatedUser";

const schema = YUP.object().shape({
  title: YUP.string().required("Title is required"),
  discription: YUP.string()
    .required("Discription is required")
    .min(10, "Min discription must be 10 letter")
    .max(50, " Max discription must be 50 letter"),
  body: YUP.string()
    .min(20, "MIN body must be 20 letter")
    .required("body is required"),
});

export default function CreateEditArticle() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (authContext.isLogedin === false) {
      navigate("/");
    }
  }, [authContext.isLogedin, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, usSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const newArticle = {
        article: {
          body: data.body,
          description: data.discription,
          title: data.title,
          tagList: ["IT", "Explore"],
        },
      };

      const response = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authContext.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newArticle),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "خطا در ثبت مقاله در سایت");
      }

      // دریافت داده‌های پاسخ
      const responseData = await response.json();
      console.log(" موفقیت‌آمیز:", responseData);
      // console.log(responseData.user.token);
      // localStorage.setItem("token", responseData.user.token);
      // navigate("/");

      return responseData; // برای استفاده در UI یا مدیریت بعدی
    } catch (error) {
      console.error("خطا در ورود:", error.message);
      // نمایش خطا به کاربر (می‌توانید از state استفاده کنید)
      // setError("serverError", { message: error.message });
      throw error; // برای مدیریت در فرم
    }
  };

  return (
    <>
      <AuthenticatedUser
        page="NewArticle"
        username={authContext.userInfos?.username || ""}
        image={authContext.userInfos?.image || ""}
      />
      <div class="editor-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      {...register("title")}
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="Article Title"
                    />
                    <ul class="error-messages">
                      {errors.title && <li>{errors.title.message}</li>}
                    </ul>
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      {...register("discription")}
                      type="text"
                      class="form-control"
                      placeholder="What's this article about?"
                    />
                    <ul class="error-messages">
                      {errors.discription && (
                        <li>{errors.discription.message}</li>
                      )}
                    </ul>
                  </fieldset>
                  <fieldset class="form-group">
                    <textarea
                      {...register("body")}
                      class="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                    ></textarea>
                    <ul class="error-messages">
                      {errors.body && <li>{errors.body.message}</li>}
                    </ul>
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter tags"
                    />
                    <div class="tag-list">
                      <span class="tag-default tag-pill">
                        {" "}
                        <i class="ion-close-round"></i> tag{" "}
                      </span>
                    </div>
                  </fieldset>
                  <button
                    class="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
