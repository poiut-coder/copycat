/* eslint-disable */
import React from "react";

const WebSearchItem = props => {
  return (
    <li>
      <dl>
        <dt>
        </dt>
        <dd>
          <h3>{props.title.replaceAll('<b>', '').replaceAll('</b>', '')}</h3>
          <article>{props.contents.replaceAll('<b>', '').replaceAll('</b>', '')}</article>
          <a href={props.url}>링크 바로가기</a>
        </dd>
      </dl>
      <hr/>
    </li>

  );
};

export default WebSearchItem;