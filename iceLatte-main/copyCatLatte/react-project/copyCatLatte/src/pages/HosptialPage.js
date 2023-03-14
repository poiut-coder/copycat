import { Helmet } from 'react-helmet-async';
import SeoulHospital from '../_mock/hospital/SeoulHospital';

// ----------------------------------------------------------------------

export default function HospitalPage() {

  return (
    <>
      <Helmet>
        <title> 동물병원 찾기</title>
      </Helmet>

     <button  type="button" className="btn btn-primary" style={{marginLeft: '220px'}}>동물병원 조회 페이지</button>
        <br/><br/>
      <SeoulHospital />
      
    </>
  );
}
