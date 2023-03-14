const BreedItemOttion=({breed})=>{
    const {id,name}=breed;
    
    // const {url}=breedsImg;
    // const { url } =typeof(image);
    return (
        <option value={id}>{name}</option>
    )
}
export default BreedItemOttion;