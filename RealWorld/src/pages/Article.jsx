import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import AuthenticatedUser from "../components/Header/AuthenticatedUser";
import AuthContext from "../Context/Context";
import DeleteModal from "../components/Modal/DeleteModal";

export default function Article() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const { articleSlug } = useParams();
  const [articleDetail, setArticleDetail] = useState({});
  const [isAuthor, setIsAuthor] = useState(false);
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

  const isAuthorFunc = () => {
    let articleAuthor = articleDetail?.article?.author?.username;
    let currentUser = authContext?.userInfos?.username;

    if (articleAuthor && currentUser && articleAuthor === currentUser) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  };
  useEffect(() => {
    getArticle();
  }, [articleSlug, authContext.token]);
  useEffect(() => {
    isAuthorFunc();
  }, [articleDetail, authContext.userInfos?.username]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options); // خروجی: 28 May 2025
  };

  const deleteArticle = async () => {
    const userToken = localStorage.getItem("token");
    try {
      if (isAuthor) {
      }
      const request = await fetch(
        `http://localhost:3000/api/articles/${articleSlug}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const data = await request.json();
      setArticleDetail(data);
      console.log(data);

      return data;
    } catch (error) {
      console.log("error on line 18:", error);
      return error;
    }
  };

  return (
    <>
      {/* Article page (URL: /#/article/article-slug-here )
        Delete article button (only shown to article’s author)
        Render markdown from server client side
        Comments section at bottom of page
        Delete comment button (only shown to comment’s author)
        */}
      <AuthenticatedUser
        page={""}
        username={authContext?.userInfos?.username}
        image={authContext?.userInfos?.image}
      />
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{articleDetail?.article?.title}</h1>

            <div className="article-meta">
              <a href="/profile/eric-simons">
                <img src={articleDetail?.article?.author?.image} />
              </a>
              <div className="info">
                <a href="/profile/eric-simons" className="author">
                  {articleDetail?.article?.author?.username}
                </a>
                <span className="date">
                  {formatDate(articleDetail?.article?.createdAt)}
                </span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; {`Follow ${articleDetail?.article?.author?.username}`}{" "}
                <span className="counter">(10)</span>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp; Favorite Post <span className="counter">(29)</span>
              </button>
              {isAuthor && (
                <>
                  <Link to={`/editor/${articleSlug}`}>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="ion-edit"></i> Edit Article
                    </button>
                  </Link>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    <i className="ion-trash-a"></i> Delete Article
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{articleDetail?.article?.description}</p>
              <h2 id="introducing-ionic">{articleDetail?.article?.title}</h2>
              <p>{articleDetail?.article?.body}</p>
              <ul className="tag-list">
                {articleDetail?.article?.tagList.map((tag, index) => (
                  <li
                    key={index + 1}
                    className="tag-default tag-pill tag-outline"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <a href="profile.html">
                <img src={articleDetail?.article?.author?.image} />
              </a>
              <div className="info">
                <a href="" className="author">
                  {articleDetail?.article?.author?.username}
                </a>
                <span className="date">
                  {formatDate(articleDetail?.article?.createdAt)}
                </span>
              </div>
              <button className="btn btn-sm btn-outline-secondary ">
                <i className="ion-plus-round"></i>
                &nbsp; {`Follow ${articleDetail?.article?.author?.username}`}
              </button>
              &nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp; Favorite Article <span className="counter">(29)</span>
              </button>
              {isAuthor && (
                <>
                  <Link to={`/editor/${articleSlug}`}>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="ion-edit"></i> Edit Article
                    </button>
                  </Link>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    <i className="ion-trash-a"></i> Delete Article
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea
                    className="form-control"
                    placeholder="Write a comment..."
                    rows="3"
                  ></textarea>
                </div>
                <div className="card-footer">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                  />
                  <button className="btn btn-sm btn-primary">
                    Post Comment
                  </button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        deleteArticle={deleteArticle}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
