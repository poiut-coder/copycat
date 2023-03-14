/* eslint-disable */
import React, { useEffect, useState } from "react";
import { VClipSearch } from '../search/VClipSearch';
import Item from '../search/VClipSearchItem';
import styled from "styled-components";
const VClipBlock = styled.div`
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
  border: 0;
  border-bottom: 1px solid #dddddd;
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
  border: 1px solid #dddddd;
  padding: 20px;
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
}

li dl dd {
  flex: 1;
}
`;

const VClipSearchs = props => {
  const [vclips, setVClips] = useState([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      vclipSearchHttpHandler(query, true);
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

  const vclipSearchHttpHandler = async (query, reset) => {
    const params = {
      query,
      sort: "accuracy", // accuracy | recency 정확도 or 최신
      page: 1, // 페이지번호
      size: 12 // 한 페이지에 보여 질 문서의 개수
    };

    const { data } = await VClipSearch(params);
    if (reset) {
      setVClips(data.documents);
    } else {
      setVClips(vclips.concat(data.documents));
    }
  };
  
    return(

          <div className="container">  
            <div className="row mb-6">
                <div className="search__container" style={{width:'100%'}} >
                    <h1 className="search__title" style={{fontSize:'20pt'}}>🐶 동영상 검색 🐱</h1>
                    <input type="search" style={{backgroundColor:'lightgrey'}} placeholder="동영상검색" name="query" className="search__input"
                            onKeyDown={onEnter} // enter 
                            onChange={onTextUpdate} // change
                            value={text} // view
                          />
                </div>
            </div>

              <hr/><br/><br/>
              <VClipBlock>
              <ul>
                {vclips.map((vclip, index) => (
                  <Item
                    key={index}
                    thumbnail={vclip.thumbnail}
                    title={vclip.title}
                    author={vclip.author}
                    url={vclip.url}
                  />
                ))}
              </ul>
              </VClipBlock>
            </div>
    )
};


  

export default VClipSearchs;