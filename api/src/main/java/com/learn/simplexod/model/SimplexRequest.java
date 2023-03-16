package com.learn.simplexod.model;

import com.learn.simplexod.model.Simplex.SimplexOperator;

public class SimplexRequest{
  public double[] objective; 
  public double[][] constraints;
  public SimplexOperator[] constraintTypes; 

  public SimplexRequest( 
      double[] objective,
      double[][] constraints,
      SimplexOperator[] constraintTypes
      ){
    this.objective = objective;
    this.constraints = constraints;
    this.constraintTypes = constraintTypes;
  }
}
