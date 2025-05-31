import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/Context";
import { Link } from "react-router-dom";

import UnauthenticatedUser from "../components/Header/UnauthenticatedUser";
import AuthenticatedUser from "../components/Header/AuthenticatedUser";
import Footer from "../components/Footer/Footer";
import ArticlePreview from "../components/ArticlePreview/ArticlePreview";
import ArticlePreviewFeed from "../components/ArticlePreview/ArticlePreviewFeed";

export default function Home() {
  const [userFeed, setUserFeed] = useState("globalFeed");

  const authContext = useContext(AuthContext);
  const [articleList, setArticleList] = useState({
    articles: [],
    articlesCount: 0,
  });
  const [feedArticleList, setFeedArticleList] = useState({
    articles: [],
    articlesCount: 0,
  });
  // console.log(articleList);

  const getArticle = async () => {
    try {
      const request = await fetch(`http://localhost:3000/api/articles`);

      const data = await request.json();
      setArticleList(data);
      return data;
    } catch (error) {
      console.log("error on line 18:", error);
      return error;
    }
  };

  const getYourFeedArticle = async () => {
    const userToken = localStorage.getItem("token");
    try {
      const request = await fetch(`http://localhost:3000/api/articles/feed`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await request.json();
      setFeedArticleList(data);
      return data;
    } catch (error) {
      console.log("error on line 18:", error);
      return error;
    }
  };
  useEffect(() => {
    getArticle();
    getYourFeedArticle();
  }, []);

  // useEffect(() => {
  //   console.log(articleList);
  //   console.log(feedArticleList);
  // }, [articleList]);

  return (
    <>
      {authContext.isLogedin ? (
        <AuthenticatedUser
          username={authContext.userInfos.username}
          image={authContext.userInfos.image}
          page="Home"
        />
      ) : (
        <UnauthenticatedUser />
      )}
      <div class="home-page">
        <div class="banner">
          <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div class="container page">
          <div class="row">
            <div class="col-md-9">
              <div class="feed-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <Link
                      onClick={() => {
                        setUserFeed("yourFeed");
                        // getYourFeedArticle();
                      }}
                      class={`nav-link ${
                        userFeed === "yourFeed" ? "active" : ""
                      }`}
                      to={"/yourFeed"}
                    >
                      Your Feed
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      onClick={() => {
                        setUserFeed("globalFeed");
                      }}
                      class={`nav-link ${
                        userFeed === "globalFeed" ? "active" : ""
                      }`}
                      to={"/globalFeed"}
                    >
                      Global Feed
                    </Link>
                  </li>
                </ul>
              </div>
              {userFeed === "globalFeed" ? (
                articleList.articles.map((article) => (
                  <ArticlePreview
                    author={article.author.username}
                    image={article.author.image}
                    title={article.title}
                    favoritesCount={article.favoritesCount}
                    description={article.description}
                    slug={article.slug}
                    tagList={article.tagList}
                    createdAt={article.createdAt}
                  />
                ))
              ) : userFeed === "yourFeed" ? (
                feedArticleList.articles.map((article) => (
                  <ArticlePreviewFeed
                    author={article.author.username}
                    image={article.author.image}
                    title={article.title}
                    favoritesCount={article.favoritesCount}
                    description={article.description}
                    slug={article.slug}
                    tagList={article.tagList}
                    createdAt={article.createdAt}
                  />
                ))
              ) : (
                <span>111</span>
              )}

              {userFeed === "globalFeed" && articleList.articlesCount > 0 ? (
                <ul class="pagination">
                  <li class="page-item active">
                    <a class="page-link" href="">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="">
                      2
                    </a>
                  </li>
                </ul>
              ) : userFeed === "yourFeed" &&
                feedArticleList.articlesCount > 0 ? (
                <ul class="pagination">
                  <li class="page-item active">
                    <a class="page-link" href="">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="">
                      2
                    </a>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>

            <div class="col-md-3">
              <div class="sidebar">
                <p>Popular Tags</p>

                <div class="tag-list">
                  <a href="" class="tag-pill tag-default">
                    programming
                  </a>
                  <a href="" class="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="" class="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="" class="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="" class="tag-pill tag-default">
                    react
                  </a>
                  <a href="" class="tag-pill tag-default">
                    mean
                  </a>
                  <a href="" class="tag-pill tag-default">
                    node
                  </a>
                  <a href="" class="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
