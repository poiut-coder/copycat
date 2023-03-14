/* eslint-disable */
const ParkWeatherSet = ({weather}) => {

    return(
        <>
        <div>
            기온 : {weather[3].obsrValue}℃ / 습도 : {weather[1].obsrValue}% / 강수량 : {weather[2].obsrValue}mm / 풍속 : {weather[7].obsrValue}m/s
        </div>
        </>
    )

}

export default ParkWeatherSet;