package com.learn.simplexod.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.learn.simplexod.model.Simplex;
import com.learn.simplexod.model.SimplexRequest;
import com.learn.simplexod.model.Simplex.SimplexMethodType;

@RestController
public class SimplexController {
	@PostMapping("/simplex")
	public String postSimplex(@RequestBody SimplexRequest simplexRequest) {
		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		Simplex simplex = new Simplex(
				simplexRequest.objective,
				simplexRequest.constraints,
				simplexRequest.constraintTypes,
				SimplexMethodType.MAXIMIZE);
		System.out.println(simplexRequest.objective);
		String json = "";
		try {
			json = ow.writeValueAsString(simplex.iteration());
		} catch (JsonProcessingException e) {
			System.out.println(e);
		}

		return json;
	}
}
