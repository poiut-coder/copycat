/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import React, { useEffect, useState } from 'react';
// @mui
import { Container } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';

import ParkList from '../park/ParkList';
import ParkDropDown from '../park/ParkDropDown';
import ParkWeatherSet from '../park/ParkWeatherSet';
import ParkWeather from '../park/ParkWeather';

// ----------------------------------------------------------------------

const { kakao } = window;
export default function ParkInfo() {
  
  const [area, setArea] = useState(null);
  const [parks, setParks] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  let markedPlace = null;
  let selectedLocation = null;

  const [weather, setWeather] = useState(null);

    useEffect(() => {
      const loadData = async () => {
        const url = 'http://openAPI.seoul.go.kr:8088/4d514f786b79757337386270766a6d/json/SearchParkInfoService/1/131/';
        const response = await axios.get(url);
        const dataCluster = JSON.stringify(response.data.SearchParkInfoService.row);
        const dataList = JSON.parse(dataCluster);
        setParks(dataList);
    }
    loadData();
    mapscript();
      }, []);
    
      const mapscript = () => {
        const container = document.getElementById("myMap");
        const options = {
          center: new kakao.maps.LatLng(37.5735, 126.9758875),
          level: 7,
        };
        const map = new kakao.maps.Map(container, options);
        };

      // 클릭하면 마커 표시할 데이터 불러오기
      const clickData = (parks) => {
        const [lat, lng] = selectedLocation ? selectedLocation.split(',') : null;
        const container = document.getElementById("myMap");
        const options = {
          center: new kakao.maps.LatLng(lat,lng),
          level: 7,
        };

        const map = new kakao.maps.Map(container, options);

          parks.forEach((park) => {
            const position = new kakao.maps.LatLng(park.LATITUDE, park.LONGITUDE)
            const marker = new kakao.maps.Marker({
                map,
            position: position,
            clickable: true
            });

            marker.id=park.P_IDX;
            
            const infowindow = new kakao.maps.InfoWindow({
              content: park.P_PARK
              // removable : true
            });
        
            // 마커 클릭하면 해당 장소 정보 저장
            kakao.maps.event.addListener(marker, 'click', () => {
              setSelectedPlace(park);
              markedPlace = marker
            });

            // 마우스 올리면 이름 표시하기
            kakao.maps.event.addListener(
              marker,
              "mouseover",
              makeOverListener(map, marker, infowindow)
            );

            // 마우스 치우면 이름 표시 지우기
            kakao.maps.event.addListener(
              marker,
              "mouseout", 
              // () => {
              //   if (markedPlace===null || markedPlace.id !== marker.id) {
              //     infowindow.close();
              // }else{
              //   infowindow.open(map, marker);
              // }
              // }
              makeOutListener(infowindow)
            );

            // 마우스 올릴때 정보창 켜기
            function makeOverListener(map, marker, infowindow) {
              return function () {
                infowindow.open(map, marker);
              };
            }
            // 마우스 내릴때 정보창 끄기
            function makeOutListener(infowindow) {
              return function () {
                infowindow.close();
              };
            }

            }) 
            };

            

    // 지역 선택 select의 option 값 배열 만들기 
    const areaArray = area ? 
    area.map ( (el,index) => (<option key={index} value={el.Y_CRDNT_VALUE+','+el.X_CRDNT_VALUE}>{el.ATDRC_NM}</option>) ): null
    
    //지역 선택하면 지도에 마커 표시, 해당 지역으로 지도 이동하기
    const setMapData = (event) => {
      selectedLocation = event.target.value;
      clickData(parks);
      ParkWeather({setWeather, selectedLocation});
    };
    return (
        <>
            <Helmet>
                <title>공원 조회 서비스</title>
            </Helmet>

            <button  type="button" className="btn btn-primary" style={{marginLeft: '220px'}}>동물병원 조회 페이지</button>
            <br/><br/>
            <Container>
            { area ? 
            <select id="seletLocation" className="form-select" onChange={setMapData.bind()} style={{width:"200px",backgroundColor:"lightgray",border:"0px",}}>
              <option defaultValue>지역 선택하기</option>
              {areaArray}
            </select>
            :
            <select className="form-select" style={{width:"200px",backgroundColor:"lightgray",border:"0px",}}>
              <option defaultValue>지역 선택하기</option>
            </select>
            }
            <br />
            <Container>
            { weather ? 
            <ParkWeatherSet weather={weather} />
            :
            <div>지역을 선택하세요</div>
          }
            </Container>
            
            <br />
                <div id='myMap'
                    style={{
                    width: 1000,
                    height: 500
                }} />
                <br/><br/>
            </Container>
            <Container>
              {selectedPlace ? <ParkList park={selectedPlace} /> : <div>공원을 선택하면 상세정보를 확인할 수 있습니다.</div>}
            </Container>
            <ParkDropDown setArea={setArea} />
        </>
    );
}

