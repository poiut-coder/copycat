/* eslint-disable */
import React, { useEffect, useState } from "react";
import { WebSearch } from '../search/WebSearch';
import '../pages/search.css';
import Item from '../search/WebSearchItem';
import styled from "styled-components";
const WebBlock = styled.div`
width: 400px;
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
}

.input_search:focus {
  outline: none;
}

ul {
  display: grid;
  width: 400px;
  margin: auto;
  grid-gap: 10px;
  grid-template-columns: repeat(1, 1fr);
}

li {
  width: 1100px;
  list-style-type: none;
  padding: 10px;
}

li dl {
  display: flex;
  flex-direction: column;
}

li dl dd {
  flex: 1;
}
`;

const WebSearchs = props => {
  const [webs, setWebs] = useState([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      webSearchHttpHandler(query, true);
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

  const webSearchHttpHandler = async (query, reset) => {
    const params = {
      query,
      sort: "accuracy", // accuracy | recency 정확도 or 최신
      page: 1, // 페이지번호
      size: 10 // 한 페이지에 보여 질 문서의 개수
    };

    const { data } = await WebSearch(params);
    if (reset) {
      setWebs(data.documents);
    } else {
      setWebs(webs.concat(data.documents));
    }
  };
  
    return(
          <div className="container">  
            <div className="row mb-6">


                <div className="search__container" style={{width:'100%'}} >
                    <h1 className="search__title" style={{fontSize:'20pt'}}>🐶 웹검색 🐱</h1>
                    <input type="search" style={{backgroundColor:'lightgrey'}} placeholder="웹 검색" name="query" className="search__input"
                            onKeyDown={onEnter} // enter 
                            onChange={onTextUpdate} // change
                            value={text} // view
                          />
                </div>
            </div>

              <hr/><br/><br/>
            <WebBlock>
              <ul>
                {webs.map((web, index) => (
                  <Item
                    key={index}
                    title={web.title}
                    contents={web.contents}
                    url={web.url}
                  />

                ))}
                            
              </ul>

              </WebBlock>
            </div>
    )
};


  

export default WebSearchs;