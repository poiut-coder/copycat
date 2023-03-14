/* eslint-disable */
import React from "react";

const blogSearchItem = props => {
  return (
    <>
    <li>
      <dl>
        <dt>
          <img src={props.thumbnail} alt={props.thumbnail} />
        </dt>
        <dd>
          <h4>{props.title.replaceAll('<b>', '').replaceAll('</b>', '')}</h4>
          <p>{props.blogname}</p>
          <article>{props.contents.replaceAll('<b>', '').replaceAll('</b>', '')}</article>
          <a href={props.url}>링크 바로가기</a>
        </dd>
      </dl>
    </li>
    </>
  );
};

export default blogSearchItem;