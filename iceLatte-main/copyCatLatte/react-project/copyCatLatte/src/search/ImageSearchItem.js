/* eslint-disable */
import React from "react";
import styled from "styled-components";


const ImageSearchItem = props => {
  return (
    <li>
      <dl>
        <dt>
        <a href={props.image_url}>
          <img src={props.thumbnail_url} alt={props.thumbnail_url} ></img>
        </a>
        </dt>
        <dd>
          <a href={props.doc_url}><h4>{props.display_sitename.replaceAll('<b>', '').replaceAll('</b>', '')}</h4>
          </a>
        </dd>
      </dl>
    </li>
  );
};

export default ImageSearchItem;