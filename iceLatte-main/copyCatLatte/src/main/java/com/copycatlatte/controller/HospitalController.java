package com.copycatlatte.controller;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.copycatlatte.dto.HospitalDto;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

@Controller
@RequestMapping(path = { "/hospitals" })
public class HospitalController {
	
	@GetMapping(path = { "/save-gu-dong-list" })
	@ResponseBody
	public String saveGuDongList(HttpServletRequest req) {
		
		ServletContext application = req.getServletContext();
		String path = application.getRealPath("/WEB-INF/data-files/seoul-gu-dong-list.csv");
		
		FileInputStream fis = null;
		InputStreamReader isr = null;
		BufferedReader br = null;
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		try {
			fis = new FileInputStream(path);
			isr = new InputStreamReader(fis);
			br = new BufferedReader(isr);
			
			Class.forName("com.mysql.cj.jdbc.Driver");
			
			// 2. 연결 및 연결 객체 가져오기
			conn = DriverManager.getConnection(
					"jdbc:mysql://43.201.107.251:3306/copycat", // 데이터베이스 연결 정보
					"copycat", "copycat"); 						// 데이터베이스 계정 정보
			
			// 3-1. SQL 작성 + 명령 객체 가져오기
			String sql2 = "DELETE FROM sigudong ";
			pstmt = conn.prepareStatement(sql2);
			pstmt.executeUpdate();
			
			pstmt.close();
			
			while(true) {
				String line = br.readLine();
				if (line == null) {
					break;
				}
				
				String[] row = line.split(",");
				
				// System.out.println(row[0].replaceAll("\"", "") + " / " + row[1].replaceAll("\"", "") + " / " + row[2].replaceAll("\"", "") + " / " +row[3].replaceAll("\"", ""));
				
				String sql =
    					"INSERT INTO sigudong (si, gu, dong, id) " +
    					"VALUES (?, ?, ?, ?)"; // ? : 나중에 채워질 영역 표시
    			pstmt = conn.prepareStatement(sql);
    			
    			pstmt.setString(1, row[3].replaceAll("\"", ""));		// SQL의 1번째 ?를 대체할 데이터
    			pstmt.setString(2, row[2].replaceAll("\"", ""));
    			pstmt.setString(3, row[1].replaceAll("\"", "").replaceAll("[0-9]", ""));
    			pstmt.setInt(4, Integer.parseInt(row[0].replaceAll("\"", "")));
    			
    			pstmt.executeUpdate();
			}
		} catch(Exception ex) {
			ex.printStackTrace();
		} finally {
			try { br.close(); } catch (Exception ex) {}
			try { isr.close(); } catch (Exception ex) {}
			try { fis.close(); } catch (Exception ex) {}
		}
		
		return "success";
	}
	
	// DB에 동물병원 데이터 불러와서 저장 
	@GetMapping(path = { "/save-hospitals-to-db" })
	@ResponseBody
	public String saveHospitalsToDb() {
		
		try {
			int startNo = 1;
			ArrayList<HospitalDto> allHospitals = new ArrayList<>();
			while (true) {
			
				StringBuilder urlBuilder = new StringBuilder(String.format("http://openapi.seoul.go.kr:8088/43566e4768776c67363270416d6979/json/LOCALDATA_020301/%d/%d/", startNo, startNo + 999)); /*URL*/
		        URL url = new URL(urlBuilder.toString());
		        
		        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		        conn.setRequestMethod("GET");
		        conn.setRequestProperty("Content-type", "application/json");
		        
		        System.out.println("Response code: " + conn.getResponseCode());
		        
		        InputStream is = conn.getInputStream();
		        InputStreamReader isr = new InputStreamReader(is);
		       		        
		        JsonElement root = JsonParser.parseReader(isr);
		        JsonObject obj = root.getAsJsonObject();
		        
		        Gson gson = new Gson();
		        
		        JsonObject localData = obj.get("LOCALDATA_020301").getAsJsonObject();
		        int totalCount = localData.get("list_total_count").getAsInt();
		        TypeToken<ArrayList<HospitalDto>> collectionType = new TypeToken<ArrayList<HospitalDto>>() {};
		        ArrayList<HospitalDto> hospitals = gson.fromJson(localData.get("row"), collectionType);
		        allHospitals.addAll(hospitals);
		        
		        System.out.println(hospitals);
		        
		        startNo += 1000;
		        if (startNo > totalCount) {
		        	break;
		        }
			}
			
	        // 데이터베이스에 데이터 저장
	        System.out.println(allHospitals.size());
	        
        	Connection conn = null;			// 연결과 관련된 JDBC 호출 규격 ( 인터페이스 )
    		PreparedStatement pstmt = null;	// 명령 실행과 관련된 JDBC 호출 규격 ( 인터페이스 )
    		PreparedStatement pstmt2 = null;
    		
    		try {
    			// 1. Driver 등록
    			// DriverManager.registerDriver(new com.mysql.cj.jdbc.Driver());
    			Class.forName("com.mysql.cj.jdbc.Driver");
    			
    			// 2. 연결 및 연결 객체 가져오기
    			conn = DriverManager.getConnection(
    					"jdbc:mysql://43.201.107.251:3306/copycat", 		// 데이터베이스 연결 정보
    					"copycat", "copycat"); 						// 데이터베이스 계정 정보
    			
    			// 3-1. SQL 작성 + 명령 객체 가져오기
    			String sql2 =
    					"DELETE FROM hospital ";
    			pstmt2 = conn.prepareStatement(sql2);
    			pstmt2.executeUpdate();
    			
    			String sql =
    					"INSERT INTO hospital (MGTNO, BPLCNM, SITETEL, SITEWHLADDR, RDNWHLADDR, DTLSTATEGBN, X, Y) " +
    					"VALUES (?, ?, ?, ?, ?, ?, ?, ?)"; // ? : 나중에 채워질 영역 표시
    			pstmt = conn.prepareStatement(sql);
    			
    			for (HospitalDto hospital : allHospitals) {
	    			pstmt.setString(1, hospital.getMGTNO());		// SQL의 1번째 ?를 대체할 데이터
	    			pstmt.setString(2, hospital.getBPLCNM());
	    			pstmt.setString(3, hospital.getSITETEL());
	    			pstmt.setString(4, hospital.getSITEWHLADDR().trim());
	    			pstmt.setString(5, hospital.getRDNWHLADDR());
	    			pstmt.setString(6, hospital.getDTLSTATEGBN());
	    			pstmt.setString(7, hospital.getX().trim());
	    			pstmt.setString(8, hospital.getY().trim());
	    			
	    			// 4-1. 명령 실행
	    			pstmt.executeUpdate(); // executeUpdate : select 이외의 SQL에 사용하는 메서드
    			}
    			
    		} catch (Exception ex) {
    			ex.printStackTrace(); // 개발 용도로 사용
    		} finally {
    			// 6. 연결 닫기
    			try { pstmt2.close(); } catch (Exception ex) {}
    			try { pstmt.close(); } catch (Exception ex) {}
    			try { conn.close(); } catch (Exception ex) {}
    		}
	        
	        return "success";
	        				
		} catch (Exception ex) {
			ex.printStackTrace();
			return "fail";
		}
		
	}
	
	@CrossOrigin 	        
	@PostMapping(path= {"/find-hospitals-by-area"})
	@ResponseBody
	public List<HospitalDto> loadHospitalList(String gu, String dong) {
		
		Connection conn = null;			// 연결과 관련된 JDBC 호출 규격 ( 인터페이스 )
		PreparedStatement pstmt = null;	// 명령 실행과 관련된 JDBC 호출 규격 ( 인터페이스 )
		ResultSet rs = null;			// 결과 처리와 관련된 JDBC 호출 규격 ( 인터페이스 )
		
		ArrayList<HospitalDto> hospitals = new ArrayList<>();		// 조회한 데이터를 저장할 DTO 객체
		
		try {
			// 1. Driver 등록
			// DriverManager.registerDriver(new Driver());
			Class.forName("com.mysql.cj.jdbc.Driver");
			
			// 2. 연결 및 연결 객체 가져오기
			conn = DriverManager.getConnection(
					"jdbc:mysql://43.201.107.251:3306/copycat", // 데이터베이스 연결 정보
					"copycat", "copycat"); 						// 데이터베이스 계정 정보
			
			// 3. SQL 작성 + 명령 객체 가져오기
			String sql = 
					"SELECT MGTNO, BPLCNM, SITETEL, SITEWHLADDR, RDNWHLADDR, X, Y " +
					"FROM hospital " +
					"WHERE DTLSTATEGBN = '0000' " +
					"AND (( SITEWHLADDR LIKE ? AND SITEWHLADDR LIKE ? ) OR ( RDNWHLADDR LIKE ? AND RDNWHLADDR LIKE ? )) "; // 최신 글이 앞에 보이도록 조회
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, "%" + gu + "%");
			pstmt.setString(2, "%" + dong + "%" );
			pstmt.setString(3, "%" + gu + "%");
			pstmt.setString(4, "%" + dong + "%" );
			
			// 4. 명령 실행
			rs = pstmt.executeQuery(); // executeQuery : select 일 때 사용하는 메서드
			
			// 5. 결과 처리 (결과가 있다면 - SELECT 명령을 실행한 경우)
			while (rs.next()) {	// 결과 집합의 다음 행으로 이동
				HospitalDto hospital = new HospitalDto();
				
				hospital.setMGTNO(rs.getString(1));
				hospital.setBPLCNM(rs.getString(2));
				hospital.setSITETEL(rs.getString(3));
				hospital.setSITEWHLADDR(rs.getString(4));
				hospital.setRDNWHLADDR(rs.getString(5));
				hospital.setX(rs.getString(6));
				hospital.setY(rs.getString(7));
				
				hospitals.add(hospital);
			}			
			
		} catch (Exception ex) {
			ex.printStackTrace(); // 개발 용도로 사용
		} finally {
			// 6. 연결 닫기
			try { rs.close(); } catch (Exception ex) {}
			try { pstmt.close(); } catch (Exception ex) {}
			try { conn.close(); } catch (Exception ex) {}
		}
		return hospitals;
	}
	
	@CrossOrigin 	        
	@GetMapping(path= {"/choose-gu"})
	@ResponseBody
	public List<String> chooseGu() {
		
		Connection conn = null;			// 연결과 관련된 JDBC 호출 규격 ( 인터페이스 )
		PreparedStatement pstmt = null;	// 명령 실행과 관련된 JDBC 호출 규격 ( 인터페이스 )
		ResultSet rs = null;			// 결과 처리와 관련된 JDBC 호출 규격 ( 인터페이스 )
		
		ArrayList<String> guList = new ArrayList<>();
			
		try {
			// 1. Driver 등록
			// DriverManager.registerDriver(new Driver());
			Class.forName("com.mysql.cj.jdbc.Driver");
			
			// 2. 연결 및 연결 객체 가져오기
			conn = DriverManager.getConnection(
					"jdbc:mysql://43.201.107.251:3306/copycat", // 데이터베이스 연결 정보
					"copycat", "copycat"); 						// 데이터베이스 계정 정보
			
			// 3. SQL 작성 + 명령 객체 가져오기
			String sql = 
					"SELECT DISTINCT gu " +
					"FROM sigudong " +
					"WHERE si = '서울' " +
					"ORDER BY gu ";
			
			pstmt = conn.prepareStatement(sql);
			
			// 4. 명령 실행
			rs = pstmt.executeQuery(); // executeQuery : select 일 때 사용하는 메서드
			
			// 5. 결과 처리 (결과가 있다면 - SELECT 명령을 실행한 경우)
			while (rs.next()) {	// 결과 집합의 다음 행으로 이동
				guList.add(rs.getString(1));
			}			
			
		} catch (Exception ex) {
			ex.printStackTrace(); // 개발 용도로 사용
		} finally {
			// 6. 연결 닫기
			try { rs.close(); } catch (Exception ex) {}
			try { pstmt.close(); } catch (Exception ex) {}
			try { conn.close(); } catch (Exception ex) {}
		}
		return guList;
	}
	
	@CrossOrigin 	        
	@PostMapping(path= {"/choose-dong"})
	@ResponseBody
	public List<String> chooseDong(String gu) {
		
		if (gu == null) {
			return null;
		}
		
		Connection conn = null;			// 연결과 관련된 JDBC 호출 규격 ( 인터페이스 )
		PreparedStatement pstmt = null;	// 명령 실행과 관련된 JDBC 호출 규격 ( 인터페이스 )
		ResultSet rs = null;			// 결과 처리와 관련된 JDBC 호출 규격 ( 인터페이스 )
		
		ArrayList<String> dongList = new ArrayList<>();
			
		try {
			// 1. Driver 등록
			// DriverManager.registerDriver(new Driver());
			Class.forName("com.mysql.cj.jdbc.Driver");
			
			// 2. 연결 및 연결 객체 가져오기
			conn = DriverManager.getConnection(
					"jdbc:mysql://43.201.107.251:3306/copycat", // 데이터베이스 연결 정보
					"copycat", "copycat"); 						// 데이터베이스 계정 정보
			
			// 3. SQL 작성 + 명령 객체 가져오기
			String sql = 
					"SELECT DISTINCT dong " +
					"FROM sigudong " +
					"WHERE si = '서울' " +
					"AND gu = ? " +
					"ORDER BY dong ";
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, gu);
			
			// 4. 명령 실행
			rs = pstmt.executeQuery(); // executeQuery : select 일 때 사용하는 메서드
			
			// 5. 결과 처리 (결과가 있다면 - SELECT 명령을 실행한 경우)
			while (rs.next()) {	// 결과 집합의 다음 행으로 이동
				dongList.add(rs.getString(1));
			}			
			
		} catch (Exception ex) {
			ex.printStackTrace(); // 개발 용도로 사용
		} finally {
			// 6. 연결 닫기
			try { rs.close(); } catch (Exception ex) {}
			try { pstmt.close(); } catch (Exception ex) {}
			try { conn.close(); } catch (Exception ex) {}
		}
		return dongList;
	}
}
