/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.css';

const ParkList = ({park}) => {
    return (
        <>
        <div className="table-responsive" style={{
              width:'1000px',
              height:'500px',
              }}>
                  <table className="table align-middle">
                    <thead>
                    <tr>
                        <td colSpan={2}>{park.P_PARK}</td>
                        {/* <th colSpan={2}>{park.P_PARK}</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td rowSpan={3} style={{
                            width:'300px',
                            }}>
                <img src={park.P_IMG} alt={park.P_PARK}></img></td>
                    </tr>
                    <tr className="align-middle">
                    <td>{park.P_ADDR}</td>
                    </tr>
                    <tr>
                    <td className="align-middle">{park.USE_REFER}</td>
                    </tr>
                    </tbody>
                </table>
        </div>
        
        </>
    )

}
export default ParkList;