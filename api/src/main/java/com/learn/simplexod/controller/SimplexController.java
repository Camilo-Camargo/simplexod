package com.learn.simplexod.controller;

import java.util.ArrayList;
import java.util.HashMap;

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
				simplexRequest.type);
		System.out.println(simplexRequest.objective);

		ArrayList<double[][]> iterations = new ArrayList<double[][]>();

		while (!simplex.checkOptimize()) {
			double[][] iteration = new double[simplex.tableau.length][];
			for (int i = 0; i < simplex.tableau.length; i++) {
				iteration[i] = simplex.tableau[i].clone();
			}
			iterations.add(iteration);
			simplex.iteration();
		}

		String json = "";

		try {
			json = ow.writeValueAsString(iterations);
		} catch (JsonProcessingException e) {
			System.out.println(e);
		}

		return json;
	}
}
