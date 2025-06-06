import React, { useEffect, useState } from "react";
import AuthenticatedUser from "../components/Header/AuthenticatedUser";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Profile() {
  const param = useParams();
  const [userProfile, setUserProfile] = useState();
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/profiles/${param.username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserProfile(data));

    fetch(`http://localhost:3000/api/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data));
  }, []);

  const follow = () => {
    const userToken = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/profiles/${param.username}/follow`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserProfile(data));
  };

  const unFollow = () => {
    const userToken = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/profiles/${param.username}/follow`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserProfile(data));
  };

  return (
    <>
      <AuthenticatedUser />
      <div class="profile-page">
        <div class="user-info">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 offset-md-1">
                <img src={currentUser?.user?.image} class="user-img" />
                <h4>{userProfile?.profile?.username || ""}</h4>
                <p>
                  {userProfile?.profile?.bio ||
                    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, officiis!`}
                </p>
                {userProfile?.profile?.following ? (
                  <button
                    onClick={() => unFollow()}
                    class="btn btn-sm btn-outline-secondary action-btn"
                  >
                    <i className="ion-minus-round"></i>
                    &nbsp; {`UnFollow ${userProfile?.profile?.username}`}
                  </button>
                ) : (
                  <button
                    onClick={() => follow()}
                    class="btn btn-sm btn-outline-secondary action-btn"
                  >
                    <i className="ion-plus-round"></i>
                    &nbsp; {`Follow ${userProfile?.profile?.username}`}
                  </button>
                )}

                {userProfile?.profile?.username ===
                currentUser?.user?.username ? (
                  <button class="btn btn-sm btn-outline-secondary action-btn">
                    <i class="ion-gear-a"></i>
                    &nbsp; "Edit Profile Settings"
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <Link class="nav-link active" to="">
                      My Articles
                    </Link>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="">
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>

              <div class="article-preview">
                <div class="article-meta">
                  <a href="/profile/eric-simons">
                    <img src="http://i.imgur.com/Qr71crq.jpg" />
                  </a>
                  <div class="info">
                    <a href="/profile/eric-simons" class="author">
                      Eric Simons
                    </a>
                    <span class="date">January 20th</span>
                  </div>
                  <button class="btn btn-outline-primary btn-sm pull-xs-right">
                    <i class="ion-heart"></i> 29
                  </button>
                </div>
                <a
                  href="/article/how-to-buil-webapps-that-scale"
                  class="preview-link"
                >
                  <h1>How to build webapps that scale</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                  <ul class="tag-list">
                    <li class="tag-default tag-pill tag-outline">realworld</li>
                    <li class="tag-default tag-pill tag-outline">
                      implementations
                    </li>
                  </ul>
                </a>
              </div>

              <div class="article-preview">
                <div class="article-meta">
                  <a href="/profile/albert-pai">
                    <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                  </a>
                  <div class="info">
                    <a href="/profile/albert-pai" class="author">
                      Albert Pai
                    </a>
                    <span class="date">January 20th</span>
                  </div>
                  <button class="btn btn-outline-primary btn-sm pull-xs-right">
                    <i class="ion-heart"></i> 32
                  </button>
                </div>
                <a href="/article/the-song-you" class="preview-link">
                  <h1>
                    The song you won't ever stop singing. No matter how hard you
                    try.
                  </h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                  <ul class="tag-list">
                    <li class="tag-default tag-pill tag-outline">Music</li>
                    <li class="tag-default tag-pill tag-outline">Song</li>
                  </ul>
                </a>
              </div>

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
          </div>
        </div>
      </div>
    </>
  );
}
