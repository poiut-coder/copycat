/* eslint-disable */
import React from "react";

const CafeSearchItem = props => {
  return (
    <li>
      <dl>
        <dt>
          <img src={props.thumbnail} alt={props.thumbnail} />
        </dt>
        <dd>
          <h3>{props.title.replaceAll('<b>', '').replaceAll('</b>', '')}</h3>
          <p>{props.cafename}</p>
          <article>{props.contents.replaceAll('<b>', '').replaceAll('</b>', '')}</article>
          <a href={props.url}>링크 바로가기</a>
        </dd>
      </dl>
    </li>
  );
};

export default CafeSearchItem;