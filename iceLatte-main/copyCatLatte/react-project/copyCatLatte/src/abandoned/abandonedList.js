/* eslint-disable */

import React, {useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import '../pages/search.css';

import {Table, TablePagination, TableRow, TableHead, TableContainer, TableCell, TableBody} from '@mui/material';


//  TODO 검색기능 구현하기
const serviceKey = "eMVfxUA%2FWCe5PDwQ%2FyOQYpyG8CN7YSnS5d1WIsyaPbpWB8XA5Y3frj21E9fUde73lxbrhL%2FZOZxxQveKRpOFkQ%3D%3D";
const url = `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=${serviceKey}&_type=json&numOfRows=30`;

const AbandonedList = () => {

    const [abList, setAbList] = useState(null);
    const clickHandler = async () => {
        const response = await axios.get(url);
        setAbList(response.data.response.body.items.item);

    };


    const SearchedList = ({searchTerm}) => {

        const filteredList = abList ?
            abList.filter((item) => {
                if (searchTerm == "") {
                    return item
                } else if (item.kindCd.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return item
                } else if (item.careNm.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return item
                } else if (item.orgNm.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return item
                } else if (item.processState.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return item
                } else if (item.neuterYn.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return item
                }

            })
            :
            [];

        return (
            <>
                {
                    filteredList.length > 0 ?
                        filteredList.map((item, idx) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell componet="th">{idx + 1}</TableCell>
                                    <TableCell style={{width: '20%'}}>{item.kindCd}</TableCell>
                                    <TableCell>{item.careNm}</TableCell>
                                    <TableCell><img src={item.filename} alt={item.filename}
                                                    style={{width: "50px", height: "40px"}}/></TableCell>
                                    <TableCell>{item.orgNm}</TableCell>
                                    <TableCell>{item.processState}</TableCell>
                                    <TableCell>{item.neuterYn}</TableCell>
                                </TableRow>
                            );
                        })
                        :
                        <p/>
                }
            </>
        )
    }

    const [searchTerm, setSearchTerm] = useState('')
// ============== search (filter)  ============================================================================
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

// ============== paging (pagination.js)  ============================================================================
    return (
        <div>

            <div className="row mb-6">
                <button type={"button"} className="btn btn" style={{
                    backgroundColor: '#439A97',
                    opacity: '70%',
                    width: '30%',
                    marginLeft:'10px'
                }}
                        onClick={clickHandler}>전체검색
                </button>


                <br/><br/>
                <div className="input-group mb-3">
                    <div className="search__container" style={{marginTop:'-50px'}}>
                    <input className="search__input" type="text" placeholder="검색어를 입력해주세요" onChange={event => {
                        setSearchTerm(event.target.value)}} style={{width: '200%'}}/>
                    </div>
                    <br/><br/>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow style={{display:'none'}}>
                                    <TableCell>번호</TableCell><TableCell>종류</TableCell><TableCell>보호소</TableCell><TableCell>사진</TableCell><TableCell>보호소
                                    위치</TableCell><TableCell>보호상태</TableCell><TableCell>중성화여부</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell componet = "th">
                                        <SearchedList searchTerm={searchTerm.toLowerCase()}/>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <div className="container">

            </div>
        </div>

    );
};


export default AbandonedList;