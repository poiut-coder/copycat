import React from 'react';

const SeoulHospitalGrid = ({ isLoading, data }) => {

    return (
        <section className="container">
            { isLoading === true ? (
                <div className="loader">
                    <span className="loader_text">Loading...</span>
                </div>
            ):(
                <div>
                    <br />
                    <table className="table" style={{marginLeft:'110px'}}>
                    <thead>
                        <th> </th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>지번주소</th>
                        <th>도로명주소</th>
                    </thead>
                    <tbody>
                        { data ? 
                            data.map((d, cnt) => (
                                <tr key={d.mgtno}>
                                    <td>{cnt + 1}</td>
                                    <td>{d.bplcnm}</td>
                                    <td>{d.sitetel}</td>
                                    <td>{d.sitewhladdr}</td>
                                    <td>{d.rdnwhladdr}</td>
                                </tr>
                            ))
                            :
                            <tr><td colSpan={5}>data not available</td></tr>
                        }
                    </tbody>
                </table>
                </div>
            )}
        </section>
    );

};

export default React.memo(SeoulHospitalGrid);