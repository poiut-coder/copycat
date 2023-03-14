/*  eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import SeoulHospitalGrid from "./SeoulHospitalGrid";

const { kakao } = window;
const proj4 = require("proj4").default;

const SeoulHospital = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [center, setCenter] = useState(null);

    const [guList, setGuList] = useState(null);
    const [dongList, setDongList] = useState(null);
    const guSelect = useRef(null);
    const dongSelect = useRef(null);

    // 좌표 변환
    const tm2097 = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
    const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";

    const getHospital = async (gu, dong) => {
        // setIsLoading(true);
        const url = `/hospitals/find-hospitals-by-area`;
        // const url = `http://localhost:8080/hospitals/find-hospitals-by-area`;

        const response = await axios.post(url, { "gu" : gu, "dong" : dong}, { headers: { "Content-Type": "application/x-www-form-urlencoded" }} );
             
        const data = response.data;        

        const allData = data.map((hospital) => {
            if (hospital.x === "" || hospital.y === "") {
                hospital.x = 0;
                hospital.y = 0;
            } else {
                const tmtowgs = proj4(tm2097, wgs84, [parseFloat(hospital.x) ,parseFloat(hospital.y)]);
                hospital.x = tmtowgs[0];
                hospital.y = tmtowgs[1];
             }
            return hospital;
        });

        setData(allData);
        if (allData.length > 0) {
            setCenter({lat: allData[0].y, lng: allData[0].x});
        } else {
            alert('지역에 동물병원이 없습니다.');
        }
        // setIsLoading(false);
    }

    // 처음 loading 될 때에만 실행
    useEffect( () => {
        // getHospital();
        // 구/동 데이터 조회
        const url = `/hospitals/choose-gu`;
        // const url = `http://localhost:8080/hospitals/choose-gu`;
        axios.get(url)
             .then( (response) => {
                setGuList(response.data);
                chooseDong(response.data[0]);
             });
        }, []);

    const onGuChange = (e) => {
        const gu = e.target.value;
        chooseDong(gu);
    };

    const chooseDong = (gu) => {
        const url = `/hospitals/choose-dong`;
        axios.post(url, {"gu": gu}, { headers: { "Content-Type": "application/x-www-form-urlencoded" }})
             .then((response) => {
                setDongList(response.data);
             });
    }

    return (
        <>

    <div className="row mb-3" style={{marginLeft:'220px'}}>
        <div className="form-group col-md-4">
            <label className="mb-2">구 조회</label>
            <select className="form-select form-select-sm mb-1"
                    aria-label=".form-select-lg example"
                    // 구
                name="selectGu" onChange={onGuChange} ref={guSelect}>
                {
                    guList ? guList.map((gu) => (
                        <option value={gu} key={gu}>{gu}</option>
                    )) : <option>data not available</option>
                }
            </select>
        </div>

        <div className="form-group col-md-4">
            <label className="mb-2">동 조회</label>
        <select className="form-select form-select-sm mb-1"
                aria-label=".form-select-lg example"// 동
            name="selectDong" ref={dongSelect}>
            {
                dongList ? dongList.map((dong) => (
                    <option value={dong} key={dong}>{dong}</option>
                )) : <option>data not available</option>
            }
        </select>
        </div>

        <div className="form-group col-md-3">
        <button type={"button"} className="btn btn-secondary"onClick={
            (e) => {
                const gu = guSelect.current.value;
                const dong = dongSelect.current.value;
                
                getHospital(gu, dong);
            }
        }>검색</button>
        </div>
    </div>

        <Map // 지도를 표시할 Container
            center={ center || { lat: 37.566345, lng: 126.977893 } }
            style={{ width: 1000, height: 500, marginLeft: '220px'}}
            level={5} // 지도의 확대 레벨
        >
            {data.map((hospital) => (
                <MapMarker
                    key={`${hospital.bplcnm}-${hospital.x}-${hospital.y}`}
                    position={{ lat: hospital.y, lng: hospital.x }} // 마커를 표시할 위치
                    image={{
                        src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                        size: {
                            width: 24,
                            height: 35
                        }, // 마커이미지의 크기입니다
                    }}
                    title={hospital.bplcnm} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    onClick={(e)=> setCenter({lat: hospital.y, lng: hospital.x})}
                    onMouseOver={() => setSelectedHospital(hospital)}
                    onMouseOut={() => setSelectedHospital(null)}
                >{ (selectedHospital === hospital) && selectedHospital.bplcnm}</MapMarker>
  
            ))}
        </Map>
        <SeoulHospitalGrid isLoading={isLoading} data={data} />
        </>
    )
}

export default SeoulHospital;