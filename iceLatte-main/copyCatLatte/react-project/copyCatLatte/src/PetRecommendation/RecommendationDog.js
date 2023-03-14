/* eslint-disable */
import axios from 'axios';
import { useState,useEffect } from 'react'; 
import BreedInfoDog from './Breeds/BreedInfoDog';
import BreedItemOption from './Breeds/BreedItemOption';

const RecommendationDog=()=>{
    const [breedsDog, setBreedsDog] = useState([]);
    const [selectedBreedInfoDog, setSelectedBreedInfoDog] = useState(null);
    const [selectedV, setSelectedV] = useState(1);
    
    const divStyle = {
      padding:"10px",
      margin:"0 auto"
    }

    const selectedBreedStyle = {
      height:"40px",  
      margin:"0px auto"
      
    }
    const breedHandlerDog= async (e)=>{    
      // 종 검색 
      let selectedBreed = null;    

        for (let i = 0; i < breedsDog.length; i += 1) { 
            const breed = breedsDog[i];
          if(parseInt(breed.id)===parseInt(selectedV)) {
            selectedBreed=breed;
            break;
          }  
      } 
      if(selectedBreed) {
        console.log("if selectedBreed?");
        console.log(selectedBreed);

        // 파파고;
      const response = await axios.post("http://localhost:8080/petRecomment/papago", {
        // description: selectedBreed.description,
          temperament: selectedBreed.temperament
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" }});
      console.log(response.data);

      // 이미지
      const apiKey = "live_uaf9rYc7rT0b37IVxnu3U8caUrgmcGhvW4w4ETgWf3wZsnaW8vHTIGgNSqCJxCrW";
      const urlForBreeds = ` https://api.thedogapi.com/v1/images/search?breed_ids=${selectedV}&api_key=${apiKey}&limit=5`;
      const response2 = await axios.get(urlForBreeds);
      
    

      setSelectedBreedInfoDog({ breed: selectedBreed, papago: response.data, breedImg: response2.data });
      console.log("is ?selectedBreedInfoDog");

      console.log(selectedBreedInfoDog);

  } 
              
    }

    // 값 확인
    const changeValue = (e) => {
        setSelectedV(e.target.value);
    }



   

    // ㄱ가ㅇ아지  정보 로딩
    useEffect(()=>{
        const urlForBreeds = `https://api.thedogapi.com/v1/breeds`;
        axios.get(urlForBreeds)
             .then( (response) => {
                    setBreedsDog(response.data);    
              })
    },[]);
    return (
        <div>
            <center style={{alignContent:'center', marginLeft:'410px'}}>
              <div className="input-group mb-3" >
                <select id='selectedBreed' onChange={ changeValue } value={ selectedV }>
                  {

                    breedsDog ?
                      breedsDog.map((breed, idx) => {
                        return (
                          <BreedItemOption key={breed.id} breed={breed} />
                        )
                      })
                      : "빈 데이터"
                  }
                </select>
                <button type={"button"} className="btn btn-primary"onClick={breedHandlerDog}>종 가져오기</button>

              </div>
            </center>
              {
                selectedBreedInfoDog?<BreedInfoDog selectedBreedInfoDog={selectedBreedInfoDog}  />:null
              }
        </div>
    )
}
export default RecommendationDog;