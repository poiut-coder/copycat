/* eslint-disable */
import axios from 'axios';
import { useState,useEffect } from 'react'; 

import BreedInfo from './Breeds/BreedInfo';

import BreedItemOption from './Breeds/BreedItemOption';

const RecommendationSearch=()=>{
    const [breeds, setBreeds] = useState([]);
    const [selectedBreedInfo, setSelectedBreedInfo] = useState(null);
    const [selectedV, setSelectedV] = useState("abys");
    //const [breedImg, setBreedImg] = useState([]);
    //const [papago, setPapago] = useState([]);
    const divStyle = {
      padding:"10px",
      margin:"0 auto"
    }

    const selectedBreedStyle = {
      height:"40px",  
      margin:"0px auto"
      
    }


    const breedHandler =  async (e) => {
      
        let selectedBreed = null;    
      // 종 검색 
        for (let i = 0; i < breeds.length; i += 1) { 
          const breed = breeds[i];
          if(breed.id===selectedV) {
              selectedBreed = breed;
              break;
            }   
        }
        if (selectedBreed) {
          
          // 파파고;
          const response = await axios.post("http://localhost:8080/petRecomment/papago", {
                    // name: selectedBreedInfo.name,
                      description: selectedBreed.description,
                      temperament: selectedBreed.temperament
                    },
                    { headers: { "Content-Type": "application/x-www-form-urlencoded" }});
          console.log(response.data);
          // setPapago(response.data);

          // 이미지
          const apiKey = "live_q1tvM4oqjNcUwFMR2jYw0mDZC8EeNbWzk9An4QaB68IKrjUnYL3UpycN5K5PNVVp";
          const urlForBreeds = ` https://api.thecatapi.com/v1/images/search?breed_ids=${selectedV}&api_key=${apiKey}&limit=5`;
          const response2 = await axios.get(urlForBreeds);
          // setBreedImg(response2.data); 
          
          setSelectedBreedInfo({ breed: selectedBreed, papago: response.data, breedImg: response2.data });
        } 
    };

    // 값 확인
    const changeValue = (e) => {
        setSelectedV(e.target.value);
    }


    // 고양이  정보 로딩
    useEffect(()=>{
        const urlForBreeds = `https://api.thecatapi.com/v1/breeds`;
        axios.get(urlForBreeds)
             .then( (response) => {
                    setBreeds(response.data);    
              })
    },[]);
    return (

            <div>
            <center style={{alignContent:'center', marginLeft:'410px'}}>
                <div className="input-group mb-3" >
                <select id='selectedBreed' onChange={ changeValue } value={ selectedV } >
                {

                  breeds ?
                    breeds.map((breed, idx) => {
                      return (
                        <BreedItemOption key={breed.id} breed={breed} />
                      )
                    })
                    : "빈 데이터"
                }
              </select>
              <button type={"button"} className="btn btn-primary"onClick={breedHandler}>종 가져오기</button>

            </div>
          </center>
            {
              selectedBreedInfo?<BreedInfo selectedBreedInfo={selectedBreedInfo}  />:null
            }
        </div>

    )
}
export default RecommendationSearch;