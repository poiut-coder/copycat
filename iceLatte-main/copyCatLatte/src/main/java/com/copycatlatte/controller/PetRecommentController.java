package com.copycatlatte.controller;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.copycatlatte.dto.PetRecommentDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping(path = { "/petRecomment" })

public class PetRecommentController {

	@CrossOrigin
	@PostMapping(path = { "/papago" })
	@ResponseBody
	public PetRecommentDto papago(PetRecommentDto petRecommentDto) throws ParseException {
		 System.out.println(petRecommentDto);
		
		if(petRecommentDto.getName() !=null) {
			petRecommentDto.setName(translate(petRecommentDto.getName()));

		}if(petRecommentDto.getDescription() !=null) {
			petRecommentDto.setDescription(translate(petRecommentDto.getDescription()));

		}if(petRecommentDto.getTemperament() !=null) {
			String[] temperament = petRecommentDto.getTemperament();
			
			for (int i = 0; i < temperament.length; i++) {
					temperament[i]="["+translate(temperament[i])+"] ";

			}
			
			petRecommentDto.setTemperament(temperament);

		}
		

		System.out.println(petRecommentDto);

		return petRecommentDto;
	}

	@CrossOrigin
	@PostMapping(path = { "/searchDogBreedInfo" })
	@ResponseBody
	public PetRecommentDto searchDogBreedInfo(String name) throws IOException {

		PetRecommentDto petRecommentDto = null;

		System.out.println(name);

		URL url = new URL("https://api.api-ninjas.com/v1/dogs?name="+name);
//		System.out.println("url");

		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//		System.out.println("connection");

		connection.setRequestProperty("accept", "application/json");
//		System.out.println("setRequestProperty");

		InputStream responseStream = connection.getInputStream();
		System.out.println("오류 포인");

		ObjectMapper mapper = new ObjectMapper();
		System.out.println("mapper");

		JsonNode root = mapper.readTree(responseStream);
		System.out.println(root.path("fact").asText());

		return petRecommentDto;
	}

	private String translate(String target) throws ParseException {

		String clientId = "tiErIHdBwPR0YJwhrY2v";// 애플리케이션 클라이언트 아이디값";
		String clientSecret = "OoBC00nxKZ";// 애플리케이션 클라이언트 시크릿값";

		String apiURL = "https://openapi.naver.com/v1/papago/n2mt";
		String text;
		try {
			text = URLEncoder.encode(target, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException("인코딩 실패", e);
		}

		Map<String, String> requestHeaders = new HashMap<>();
		requestHeaders.put("X-Naver-Client-Id", clientId);
		requestHeaders.put("X-Naver-Client-Secret", clientSecret);

		String responseBody = post(apiURL, requestHeaders, text);

		System.out.println(responseBody);

		JSONParser jsonParser = new JSONParser();

		JSONObject jsonObject = (JSONObject) jsonParser.parse(responseBody);
//        System.out.println(jsonObject);

		JSONObject objMessage = (JSONObject) jsonObject.get("message");
//        System.out.println(objMessage);

		JSONObject objResult = (JSONObject) objMessage.get("result");
//        System.out.println(objResult);

		String translatedText = (String) objResult.get("translatedText");
//        System.out.println(translatedText);

		return translatedText;

	}

	// 파파고 api 클레스
	private static String post(String apiUrl, Map<String, String> requestHeaders, String text) {
		HttpURLConnection con = connect(apiUrl);
		String postParams = "source=en&target=ko&text=" + text; // 원본언어: 한국어 (ko) -> 목적언어: 영어 (en)
		try {
			con.setRequestMethod("POST");
			for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
				con.setRequestProperty(header.getKey(), header.getValue());
			}

			con.setDoOutput(true);
			try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
				wr.write(postParams.getBytes());
				wr.flush();
			}

			int responseCode = con.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
				return readBody(con.getInputStream());
			} else { // 에러 응답
				return readBody(con.getErrorStream());
			}
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
	}

	private static HttpURLConnection connect(String apiUrl) {
		try {
			URL url = new URL(apiUrl);
			return (HttpURLConnection) url.openConnection();
		} catch (MalformedURLException e) {
			throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
		} catch (IOException e) {
			throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
		}
	}

	private static String readBody(InputStream body) {
		InputStreamReader streamReader = new InputStreamReader(body);

		try (BufferedReader lineReader = new BufferedReader(streamReader)) {
			StringBuilder responseBody = new StringBuilder();

			String line;
			while ((line = lineReader.readLine()) != null) {
				responseBody.append(line);
			}

			return responseBody.toString();// responseBody.toString()
		} catch (IOException e) {
			throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
		}
	}

}
