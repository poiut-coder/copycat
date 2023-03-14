


import {Carousel} from 'nuka-carousel/lib/carousel';

import BreedCharacter from './BreedCharacter';



const BreedInfoDog=({selectedBreedInfoDog})=>{
    /* eslint-disable camelcase */
   // console.log(breedImg);
   
    const {id,name,bred_for,life_span}=selectedBreedInfoDog.breed;
    const {temperament}=selectedBreedInfoDog.papago;

 // eslint-disable-next-line
//  debugger;
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
    /* eslint-disable camelcase */

    return (
        <div >       
            <div id='imgSlider' style={textDivStyle}>
            <Carousel cellAlign='center' wrapAround='true' style={imgSliderStyle}>
            {
                 selectedBreedInfoDog.breedImg ?
                 selectedBreedInfoDog.breedImg.map((breedImgs) => {
                   return (
                     <img  src={breedImgs.url} alt={breedImgs.id}  style={imgStyle} key={breedImgs.id}/>
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
                {/* <p>설명 : {bred_for}</p> */}
               
                {/* <BreedCharacter BreedCharacter={good_with_children} BreedCharacterName= "good_with_children" /> */}

            </div>
        </div>
        
    )

}
export default BreedInfoDog;
