/* eslint-disable */
import React, { useEffect, useState } from "react";
import { ImageSearch } from '../search/ImageSearch';
import '../pages/search.css';

import Item from '../search/ImageSearchItem';
import styled from "styled-components";
const ImageBlock = styled.div`
width: 300px;
* {
  font-family: "Noto Sans KR", sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  
}

html,
body {
  height: 100%;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}

.input_search {
  font-family: "Noto Sans KR", sans-serif;
  font-size: 18px;
  width: 600px;
  padding: 20px;
  display: block;
  transition: border 0.3s;
}

.input_search:focus {
  outline: none;
  border-bottom: 1px solid #0675f3;
}

ul {
  display: grid;
  width: 400px;
  margin: auto;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 1fr);
}

li {
  width: 270px;
  list-style-type: none;
  padding: 5px;
}

li dl {
  display: flex;
  flex-direction: column;
}

li dl dt {
  height: 200px;
}

li dl dt img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius:10px;
  magin:5px;
}

li dl dd a{
  flex: 0.1;
  text-decoration-line: none;
  color:black;
}
`;
const ImageSearchs = props => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      imageSearchHttpHandler(query, true);
    }
  }, [query]);

  // 엔터를 눌렀을 때 호출 되는 함수
  const onEnter = e => {
    if (e.keyCode === 13) {
      setQuery(text);
    }
  };

  // text 검색어가 바뀔 때 호출되는 함수.
  const onTextUpdate = e => {
    setText(e.target.value);
  };

  const imageSearchHttpHandler = async (query, reset) => {
    const params = {
      query,
      sort: "accuracy", // accuracy | recency 정확도 or 최신
      page: 1, // 페이지번호
      size: 12 // 한 페이지에 보여 질 문서의 개수
    };

    const { data } = await ImageSearch(params);
    if (reset) {
      setImages(data.documents);
    } else {
      setImages(images.concat(data.documents));
    }
  };
  
    return(
          <div className="container">  
            <div className="row mb-6">


                <div className="search__container" style={{width:'100%'}} >
                    <h1 className="search__title" style={{fontSize:'20pt'}}>🐶 이미지 검색 🐱</h1>
                    <input type="search" style={{backgroundColor:'lightgrey'}} placeholder="이미지 검색" name="query" className="search__input"
                            onKeyDown={onEnter} // enter 
                            onChange={onTextUpdate} // change
                            value={text} // view
                          />
                </div>
            </div>
              <hr/><br/><br/>
              <ImageBlock>
              <ul>
                {images.map((image, index) => (
                  <Item
                    key={index}
                    thumbnail_url={image.thumbnail_url}
                    collection={image.collection}
                    display_sitename={image.display_sitename}
                    image_url={image.image_url}
                    doc_url={image.doc_url}
                  />
                ))}
              </ul>
              </ImageBlock>
            </div>
    )
};


  

export default ImageSearchs;