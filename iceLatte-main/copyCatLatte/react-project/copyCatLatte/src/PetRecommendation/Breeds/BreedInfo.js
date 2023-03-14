


import {Carousel} from 'nuka-carousel/lib/carousel';

import BreedCharacter from './BreedCharacter';





const BreedInfo=({selectedBreedInfo})=>{

    /* eslint-disable camelcase */
   // console.log(breedImg);
    const {id,name,life_span,adaptability,affection_level,child_friendly,dog_friendly,energy_level,health_issues,intelligence,shedding_level,social_needs,stranger_friendly,vocalisation}=selectedBreedInfo.breed;
    // test code console.log(JSON.stringify(selectedBreedInfo));    // const {url}=breedsImg;life_span,country_codes,
    // 주석 시 띄어써야함
    // temperament : 특성
    // adaptability : 적응성
    // affection_level : 애정도
    // child_friendly : 유아 친화도
    // dog_friendly : 강아지 친화도
    // social_needs : 애정 필요도
    // stranger_friendly : 외부인 친화도
    // energy_level : 활동성
    // health_issues : 건강
    // intelligence : 지능
    // shedding_level : 털빠짐
    // vocalisation : 발성 크기
    const {description,temperament}=selectedBreedInfo.papago;

    const imgStyle = {
        display:"inline-block",
        width:"400px",
        height:"300px",
        padding:"10px"
    }
    
    const imgSliderStyle = {
        width:"400px",
        height:"300px",
        padding:"10px",
        margin:"0 auto"
    }
    
    const textDivStyle = {
        // width:"800px",
        padding:"10px",
        margin:"0 auto"
    }

    return (
        <div >       
            <div id='imgSlider' style={textDivStyle}>
            <Carousel cellAlign='center' wrapAround='true' style={imgSliderStyle}>
            {
                selectedBreedInfo.breedImg?
                selectedBreedInfo.breedImg.map((breedImg) => {
                   return (
                     <img  src={breedImg.url} alt={breedImg.id}  style={imgStyle} key={breedImg.id}/>
                     )
                 })
                 : "이미지가 없습니다"
            }
            </Carousel>
            </div>
            <div style={textDivStyle}>
                <p>id : {id}</p>
                <p>이름 : {name}</p>
                <p>수명 : {life_span}</p>
                <p>특징 : {temperament}</p>
                <p>설명 : </p>{description}
                
                <BreedCharacter BreedCharacter={adaptability} BreedCharacterName= "적응성" />
                <BreedCharacter BreedCharacter={affection_level} BreedCharacterName= "애정도" />
                <BreedCharacter BreedCharacter={child_friendly} BreedCharacterName= "유아 친화도" />
                <BreedCharacter BreedCharacter={dog_friendly} BreedCharacterName= "강아지 친화도" />
                <BreedCharacter BreedCharacter={social_needs} BreedCharacterName= "사회성 필요도" />
                <BreedCharacter BreedCharacter={stranger_friendly} BreedCharacterName= "외부인 친화도" />
                <BreedCharacter BreedCharacter={energy_level} BreedCharacterName= "활동성" />
                <BreedCharacter BreedCharacter={health_issues} BreedCharacterName= "건강" />
                <BreedCharacter BreedCharacter={intelligence} BreedCharacterName= "지능" />
                <BreedCharacter BreedCharacter={shedding_level} BreedCharacterName= "털빠짐 정도" />
                <BreedCharacter BreedCharacter={vocalisation} BreedCharacterName= "발성 크기" />
            </div>
        </div>
        
    )

}
export default BreedInfo;