import React, { useState } from "react";
import { Link, useActionData } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../Context/Context";

export default function ArticlePreview(props) {
  const authContext = useContext(AuthContext);

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
    <div class="article-preview">
      <div class="article-meta">
        <Link to={`/profile/${props.author}`}>
          <img src={authContext?.userInfos?.image} />
        </Link>
        <div class="info">
          <Link to={`/profile/${props.author}`} class="author">
            {props.author}
          </Link>
          <span class="date">{formatDate(props.createdAt)}</span>
        </div>
        <button
          onClick={() => {
            props.favorited
              ? props.unFavoriteFunc(props.slug)
              : props.favoriteFunc(props.slug);
          }}
          class={`btn btn-outline-primary  btn-sm pull-xs-right ${
            props?.favorited ? "active" : ""
          }`}
        >
          <i class="ion-heart"></i> {props.favoritesCount}
        </button>
      </div>
      <a href={`/article/${props.slug}`} class="preview-link">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          {props.tagList.map((tag, index) => (
            <li key={index + 1} class="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </a>
    </div>
  );
}
