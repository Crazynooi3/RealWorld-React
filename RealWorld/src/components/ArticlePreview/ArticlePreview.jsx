import React from "react";
import { Link } from "react-router-dom";

export default function ArticlePreview(props) {
  return (
    <div class="article-preview">
      <div class="article-meta">
        <a href="/profile/eric-simons">
          <img src="http://i.imgur.com/Qr71crq.jpg" />
        </a>
        <div class="info">
          <Link to={`/profile/${props.author}`} class="author">
            {props.author}
          </Link>
          <span class="date">{props.createdAt}</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right">
          <i class="ion-heart"></i> {props.favoritesCount}
        </button>
      </div>
      <a href={`/article/${props.slug}`} class="preview-link">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          {props.tagList.map((tag) => (
            <li class="tag-default tag-pill tag-outline">{tag}</li>
          ))}
        </ul>
      </a>
    </div>
  );
}
