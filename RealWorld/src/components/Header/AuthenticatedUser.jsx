import React from "react";
import { Link } from "react-router-dom";

export default function AuthenticatedUser(props) {
  return (
    <nav class="navbar navbar-light">
      <div class="container">
        <Link class="navbar-brand" to={"/"}>
          conduit
        </Link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            {/* <!-- Add "active" class when you're on that page" --> */}
            <Link
              class={`nav-link ${props.page === "Home" ? "active" : ""} `}
              to="/"
            >
              Home
            </Link>
          </li>
          <li class="nav-item">
            <a
              class={`nav-link ${props.page === "NewArticle" ? "active" : ""} `}
              href="/editor"
            >
              {" "}
              <i class="ion-compose"></i>&nbsp;New Article{" "}
            </a>
          </li>
          <li class="nav-item">
            <a
              class={`nav-link ${props.page === "Settings" ? "active" : ""} `}
              href="/settings"
            >
              {" "}
              <i class="ion-gear-a"></i>&nbsp;Settings{" "}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href={`/profile/${props.username}`}>
              <img src={props.image} class="user-pic" />
              {props.username}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
