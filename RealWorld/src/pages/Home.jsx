import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/Context";

import UnauthenticatedUser from "../components/Header/UnauthenticatedUser";
import AuthenticatedUser from "../components/Header/AuthenticatedUser";
import Footer from "../components/Footer/Footer";
import ArticlePreview from "../components/ArticlePreview/ArticlePreview";

export default function Home() {
  const authContext = useContext(AuthContext);
  // console.log(authContext);
  const [articleList, setArticleList] = useState({
    articles: [],
    articlesCount: 0,
  });
  const [articlesCount, setArticlesCount] = useState();

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

  useEffect(() => {
    getArticle();
  }, []);

  useEffect(() => {
    console.log(articleList);
  }, [articleList]);

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
                    <a class="nav-link" href="">
                      Your Feed
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>
              {articleList.articles.map((article, index) => (
                <ArticlePreview
                  key={index + 1}
                  author={article.author.username}
                  title={article.title}
                  favoritesCount={article.favoritesCount}
                  description={article.description}
                  slug={article.slug}
                  tagList={article.tagList}
                  createdAt={article.createdAt}
                />
              ))}

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
