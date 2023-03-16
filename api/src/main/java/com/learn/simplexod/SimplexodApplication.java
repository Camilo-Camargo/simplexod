package com.learn.simplexod;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class SimplexodApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimplexodApplication.class, args);
	}

	@RequestMapping("/")
	public String index(){
		return "Hello World";
	}
}
