import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/Context";
import { Link, useSearchParams } from "react-router-dom";

import UnauthenticatedUser from "../components/Header/UnauthenticatedUser";
import AuthenticatedUser from "../components/Header/AuthenticatedUser";
import Footer from "../components/Footer/Footer";
import ArticlePreview from "../components/ArticlePreview/ArticlePreview";
import ArticlePreviewFeed from "../components/ArticlePreview/ArticlePreviewFeed";
import Pagination from "../components/Pagination/Pagination";

export default function Home() {
  const [userFeed, setUserFeed] = useState("globalFeed");
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const articlesPerPage = 10;
  console.log(currentPage);

  const authContext = useContext(AuthContext);
  const [articleList, setArticleList] = useState({
    articles: [],
    articlesCount: 0,
  });

  const [feedArticleList, setFeedArticleList] = useState({
    articles: [],
    articlesCount: 0,
  });

  // const [currentPage, setCurrentPage] = useState(1);

  const getArticle = async (offset, limit) => {
    const userToken = localStorage.getItem("token");
    try {
      const request = await fetch(
        `http://localhost:3000/api/articles?offset=${offset}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

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
    if (userFeed === "globalFeed") {
      const offset = (currentPage - 1) * articlesPerPage;
      getArticle(offset, articlesPerPage);
    } else if (userFeed === "yourFeed") {
      const offset = (currentPage - 1) * articlesPerPage;
      getYourFeedArticle(offset, articlesPerPage);
    }
  }, [currentPage, userFeed, authContext.token]);

  const favorite = (slug) => {
    const userToken = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/articles/${slug}/favorite`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getArticle();
        getYourFeedArticle();
      });
  };

  const UnFavorite = (slug) => {
    const userToken = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/articles/${slug}/favorite`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getArticle();
        getYourFeedArticle();
      });
  };
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
              {userFeed === "globalFeed"
                ? articleList.articles.map((article) => (
                    <ArticlePreview
                      key={article.slug}
                      author={article.author.username}
                      image={article.author.image}
                      title={article.title}
                      favoritesCount={article.favoritesCount}
                      description={article.description}
                      slug={article.slug}
                      tagList={article.tagList}
                      createdAt={article.createdAt}
                      favorited={article.favorited}
                      favoriteFunc={favorite}
                      unFavoriteFunc={UnFavorite}
                    />
                  ))
                : userFeed === "yourFeed"
                ? feedArticleList.articles.map((article) => (
                    <ArticlePreviewFeed
                      author={article.author.username}
                      image={article.author.image}
                      title={article.title}
                      favoritesCount={article.favoritesCount}
                      description={article.description}
                      slug={article.slug}
                      tagList={article.tagList}
                      createdAt={article.createdAt}
                      favorited={article.favorited}
                      favoriteFunc={favorite}
                      unFavoriteFunc={UnFavorite}
                    />
                  ))
                : ""}

              {userFeed === "globalFeed" && articleList.articlesCount > 0 && (
                <Pagination
                  pages={Math.ceil(articleList.articlesCount / articlesPerPage)}
                  currentPage={currentPage}
                />
              )}

              {userFeed === "yourFeed" && feedArticleList.articlesCount > 0 && (
                <Pagination
                  pages={Math.ceil(
                    feedArticleList.articlesCount / articlesPerPage
                  )}
                  currentPage={currentPage}
                />
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
