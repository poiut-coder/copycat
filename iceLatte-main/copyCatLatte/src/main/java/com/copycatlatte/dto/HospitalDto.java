package com.copycatlatte.dto;

import lombok.Data;

@Data
public class HospitalDto {
	String MGTNO;			// 관리번호 
	String BPLCNM;		// 사업장명 
	String SITETEL;		// 전화번호
	String SITEWHLADDR;	// 지번주소
	String RDNWHLADDR;	// 도로명주소 
	String DTLSTATEGBN;	// 상세영업상태코드 - 0000 영업/정상
	String X;
	String Y;
}
