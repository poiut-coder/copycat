/*eslint-disable*/

import * as React from 'react';

import {Helmet} from 'react-helmet-async';
import {Link, Outlet} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';


// @mui
import {Container, Stack, Typography, Grid} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.css';
import './search.css';



// ----------------------------------------------------------------------

export default function DashboardAppPage() {

    const textDiv = {
        paddingLeft: 200,
        margin: "auto",
        top: '50%',
        height: "500px",
        position: "relative"
    }


    const mainDiv = {

        height: "3000px"
    }
    const BreedInfo = {

        height: "600px"
    }


    return (
        <div style={mainDiv}>
            <Helmet>
                <title> CopyCat </title>
            </Helmet>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>


                <AppBar position="relative" style={{backgroundColor: 'lightcoral'}}>
                    <Toolbar>
                        {/* <CameraIcon sx={{ mr: 2 }} /> */}
                        <Typography variant="h6" color="inherit" noWrap>
                            copyCat🐱
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Stack>
            {/*  search bar  */}
            <div className="search__container" style={{ margin:'0 auto'}}>
                <h1 className="search__title" style={{fontSize:'25pt'}}>🐶 환영합니다 🐱</h1>
                <input className="search__input" type="text" placeholder="Search" style={{width:'50%',  marginLeft:'400px'}}/>
            </div>
            <br/><br/>


            <Container maxWidth="lg">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                />

                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    1조 copyCat 프로젝트입니다. <br/>
                    open api 활용하여 강아지, 고양이 종류 검색,<br/>
                    반려견 산책 공원 조회, 병원 조회,
                    유기동물과 보호소 조회를 할 수 있습니다.
                </Typography>
                <Stack
                    sx={{pt: 4}}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" style={{backgroundColor: 'lightcoral'}}><Link
                        to="PetRecommendation/RecommendationDog" style={{textDecoration: 'none', color: 'white'}}>강아지 종
                        조회</Link></Button>&nbsp;&nbsp;
                    <Button variant="outlined"><Link to="PetRecommendation/RecommendationSearch"
                                                     style={{textDecoration: 'none', color: 'lightcoral'}}>고양이 종
                        조회</Link></Button>&nbsp;&nbsp;

                </Stack>
                <br/><br/>

                <Outlet/>
            </Container>

            <br/><br/><br/>
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/assets/images/image/carosel3.png"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/assets/images/image/carosel2.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>1조 리액트 프로젝트입니다</h3>
                            <p>반려견과 관련된 정보 프로젝트입니다</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/assets/images/image/carosel1.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>1조 리액트 프로젝트입니다</h3>
                            <p>반려견과 관련된 정보 프로젝트입니다</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
            );
            }