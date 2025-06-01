import React from "react";
import { Link } from "react-router-dom";

export default function AuthenticatedUser(props) {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* <!-- Add "active" className when you're on that page" --> */}
            <Link
              className={`nav-link ${props.page === "Home" ? "active" : ""} `}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                props.page === "NewArticle" ? "active" : ""
              } `}
              href="/editor"
            >
              {" "}
              <i className="ion-compose"></i>&nbsp;New Article{" "}
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                props.page === "Settings" ? "active" : ""
              } `}
              href="/settings"
            >
              {" "}
              <i className="ion-gear-a"></i>&nbsp;Settings{" "}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`/profile/${props.username}`}>
              <img src={props.image} className="user-pic" />
              {props.username}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
