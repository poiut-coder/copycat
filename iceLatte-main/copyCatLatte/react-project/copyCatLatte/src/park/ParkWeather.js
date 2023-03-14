/* eslint-disable */
import axios from "axios";

function ParkWeather ({setWeather, selectedLocation}) {
    // 날씨 조회용 오늘 날짜,시간
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let today = month < 10 ? `${year}0${month}${date}` : `${year}${month}${date}`;
    let time = newDate.getMinutes() < 59 ? (newDate.getHours()-1)+"00" : newDate.getHours()+"00";
    let timeData = time<1000 ? "0"+time : time; 

    // 날씨 조회할 좌표
    const [lat, lng] = {selectedLocation} ? selectedLocation.split(',') : [55,127];
    let rs = {};

    // GPS 위도,경도를 좌표로 바꿔주기
    const rs1 = dfs_xy_conv(lat,lng);

    // 위경도->좌표, v1:위도, v2:경도
    function dfs_xy_conv(v1, v2) {
        const RE = 6371.00877; // 지구 반경(km)
        const GRID = 5.0; // 격자 간격(km)
        const SLAT1 = 30.0; // 투영 위도1(degree)
        const SLAT2 = 60.0; // 투영 위도2(degree)
        const OLON = 126.0; // 기준점 경도(degree)
        const OLAT = 38.0; // 기준점 위도(degree)
        const XO = 43; // 기준점 X좌표(GRID)
        const YO = 136; // 기1준점 Y좌표(GRID)

        const DEGRAD = Math.PI / 180.0;

        let re = RE / GRID;
        let slat1 = SLAT1 * DEGRAD;
        let slat2 = SLAT2 * DEGRAD;
        let olon = OLON * DEGRAD;
        let olat = OLAT * DEGRAD;

        let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
        let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
        let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
        ro = re * sf / Math.pow(ro, sn);

        rs['lat'] = v1;
        rs['lng'] = v2;
        let ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
        ra = re * sf / Math.pow(ra, sn);
        let theta = v2 * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;
        rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
        return rs;
    }

    const loadData = async () => {
        const key = "Is3hMy8hs4JH7uSeR30Jv%2BjGAoBqBcw1i4UPRSP%2F1Hr61gMRgrkjRpQmzSQwZuK%2FtID5S348JJTMRyVV3TyYmQ%3D%3D";
        const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${key}&pageNo=1&numOfRows=1000&dataType=json&base_date=${today}&base_time=${timeData}&nx=${rs1.x}&ny=${rs1.y}`;
        const response = await axios.get(url);
        const dataCluster = JSON.stringify(response.data.response.body.items.item);
        const dataList = JSON.parse(dataCluster);
        {setWeather(dataList)}
        }
        loadData();
}
export default ParkWeather;