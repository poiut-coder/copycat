/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.css';

const ParkList = ({selectedShelter}) => {
    return (
        <>
        <div className="table-responsive" style={{
              width:'1000px',
              height:'500px',
              }}>
                  <table className="table align-middle">
                    <thead>
                    <tr>
                        <th>{selectedShelter.lat}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{selectedShelter.lng}</td>
                    </tr>
                    </tbody>
                </table>
        </div>
        
        </>
    )

}
export default ParkList;