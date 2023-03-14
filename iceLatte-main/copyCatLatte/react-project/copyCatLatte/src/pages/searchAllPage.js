import { Helmet } from 'react-helmet-async';
import {Link, Outlet} from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// ----------------------------------------------------------------------

export default function SearchAllPage() {

  return (
      <>
        <Helmet>
          <title>모든 검색</title>
        </Helmet>
        <Container>
          <div style={{padding: '20'}}>
            <button type={"button"} className="btn btn-primary"><Link to="searchs/WebSearchs" style={{textDecoration:'none', color:'white'}}>웹 검색</Link></button>&nbsp;&nbsp;
              <button type={"button"} className="btn btn-primary"><Link to="searchs/ImageSearchs" style={{textDecoration:'none', color:'white'}}>이미지 검색</Link></button>&nbsp;&nbsp;
            <button type={"button"} className="btn btn-primary"><Link to="searchs/VClipSearchs" style={{textDecoration:'none', color:'white'}}>동영상 검색</Link></button>&nbsp;&nbsp;
            <button type={"button"} className="btn btn-primary"><Link to="searchs/BlogSearchs" style={{textDecoration:'none', color:'white'}}>블로그 검색</Link></button>&nbsp;&nbsp;
              <button type={"button"} className="btn btn-primary"><Link to="searchs/CafeSearchs" style={{textDecoration:'none', color:'white'}}>카페 검색</Link></button>&nbsp;&nbsp;
            <button type={"button"} className="btn btn-primary"><Link to="searchs/BookSearchs" style={{textDecoration:'none', color:'white'}}>책 검색</Link></button>&nbsp;&nbsp;
            <button type={"button"} className="btn btn-primary"><Link to="searchs/KakaoMapSearchs"style={{textDecoration:'none', color:'white'}}>지도</Link></button>
            <hr/>
          </div>

          <Outlet/>

        </Container>
      </>
  );
}
//  }




