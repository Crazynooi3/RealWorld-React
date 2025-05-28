import React from "react";

export default function AuthenticatedUser(props) {
  return (
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="/">
          conduit
        </a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            {/* <!-- Add "active" class when you're on that page" --> */}
            <a
              class={`nav-link ${props.page === "Home" ? "active" : ""} `}
              href="/"
            >
              Home
            </a>
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
