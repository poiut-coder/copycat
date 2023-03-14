package com.copycatlatte.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping(path = { "/", "/dashboard/app", "/dashboard/kakaomap", "/dashboard/parkinfo", "/dashboard/hospital" })
	public String home() {
		
		return "home";
	}
	
}
