import React, { use, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";

import AuthenticatedUser from "../components/Header/AuthenticatedUser";
import AuthContext from "../Context/Context";

export default function Article() {
  // const authContext = useContext(AuthContext);
  // console.log(authContext);

  const { articleSlug } = useParams();
  const [articleDetail, setArticleDetail] = useState({});

  const getArticle = async () => {
    const userToken = localStorage.getItem("token");
    try {
      const request = await fetch(
        `http://localhost:3000/api/articles/${articleSlug}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const data = await request.json();
      setArticleDetail(data);

      return data;
    } catch (error) {
      console.log("error on line 18:", error);
      return error;
    }
  };

  getArticle();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options); // خروجی: 28 May 2025
  };

  return (
    <>
      {/* Article page (URL: /#/article/article-slug-here )
        Delete article button (only shown to article’s author)
        Render markdown from server client side
        Comments section at bottom of page
        Delete comment button (only shown to comment’s author)
        */}
      <AuthenticatedUser page={""} />
      <div class="article-page">
        <div class="banner">
          <div class="container">
            <h1>{articleDetail?.article?.title}</h1>

            <div class="article-meta">
              <a href="/profile/eric-simons">
                <img src={articleDetail?.article?.author?.image} />
              </a>
              <div class="info">
                <a href="/profile/eric-simons" class="author">
                  {articleDetail?.article?.author?.username}
                </a>
                <span class="date">
                  {formatDate(articleDetail?.article?.createdAt)}
                </span>
              </div>
              <button class="btn btn-sm btn-outline-secondary">
                <i class="ion-plus-round"></i>
                &nbsp; {`Follow ${articleDetail?.article?.author?.username}`}{" "}
                <span class="counter">(10)</span>
              </button>
              &nbsp;&nbsp;
              <button class="btn btn-sm btn-outline-primary">
                <i class="ion-heart"></i>
                &nbsp; Favorite Post <span class="counter">(29)</span>
              </button>
              <button class="btn btn-sm btn-outline-secondary">
                <i class="ion-edit"></i> Edit Article
              </button>
              <button class="btn btn-sm btn-outline-danger">
                <i class="ion-trash-a"></i> Delete Article
              </button>
            </div>
          </div>
        </div>

        <div class="container page">
          <div class="row article-content">
            <div class="col-md-12">
              <p>{articleDetail?.article?.description}</p>
              <h2 id="introducing-ionic">{articleDetail?.article?.title}</h2>
              <p>{articleDetail?.article?.body}</p>
              <ul class="tag-list">
                {articleDetail?.article?.tagList.map((tag, index) => (
                  <li key={index + 1} class="tag-default tag-pill tag-outline">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <div class="article-actions">
            <div class="article-meta">
              <a href="profile.html">
                <img src={articleDetail?.article?.author?.image} />
              </a>
              <div class="info">
                <a href="" class="author">
                  {articleDetail?.article?.author?.username}
                </a>
                <span class="date">
                  {formatDate(articleDetail?.article?.createdAt)}
                </span>
              </div>
              <button class="btn btn-sm btn-outline-secondary ">
                <i class="ion-plus-round"></i>
                &nbsp; {`Follow ${articleDetail?.article?.author?.username}`}
              </button>
              &nbsp;
              <button class="btn btn-sm btn-outline-primary">
                <i class="ion-heart"></i>
                &nbsp; Favorite Article <span class="counter">(29)</span>
              </button>
              <button class="btn btn-sm btn-outline-secondary">
                <i class="ion-edit"></i> Edit Article
              </button>
              <button class="btn btn-sm btn-outline-danger">
                <i class="ion-trash-a"></i> Delete Article
              </button>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2">
              <form class="card comment-form">
                <div class="card-block">
                  <textarea
                    class="form-control"
                    placeholder="Write a comment..."
                    rows="3"
                  ></textarea>
                </div>
                <div class="card-footer">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    class="comment-author-img"
                  />
                  <button class="btn btn-sm btn-primary">Post Comment</button>
                </div>
              </form>

              <div class="card">
                <div class="card-block">
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
                <div class="card-footer">
                  <a href="/profile/author" class="comment-author">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      class="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" class="comment-author">
                    Jacob Schmidt
                  </a>
                  <span class="date-posted">Dec 29th</span>
                </div>
              </div>

              <div class="card">
                <div class="card-block">
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
                <div class="card-footer">
                  <a href="/profile/author" class="comment-author">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      class="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" class="comment-author">
                    Jacob Schmidt
                  </a>
                  <span class="date-posted">Dec 29th</span>
                  <span class="mod-options">
                    <i class="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
