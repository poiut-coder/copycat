import Rating from 'react-rating';


const BreedCharacter=({BreedCharacterName,BreedCharacter})=>{
    /* eslint-disable camelcase */
    const spanStyle = {
        width:"200px",

    }

    return (
        <div><div style={spanStyle}>{BreedCharacterName} :</div> <Rating readonly initialRating={BreedCharacter} stop={BreedCharacter}  fullSymbol={<img src={`/assets/icons/star.png`} style={{ width:30, height:30} } alt="star"  />} /></div>
        )
}
export default BreedCharacter;