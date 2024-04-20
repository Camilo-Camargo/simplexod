# Simplexod 
Simplexod is a implementation of linear programming simplex method using
Java how backend and React how front end.

## Demo
https://simplexod.learnofficial.org/

## Getting Started
To getting started you must first compile web and then api.

### Web
Go to the web folder and follow the next steps.
1. Install dependencies
```bash
yarn
```
2. Build
```bash
yarn build
```

### Api
Go to the api directory and build using
```bash
./gradlew build
```

## What is simplex method?
The simplex method is a widely used algorithm for solving 
linear programming problems. It involves iteratively improving 
an initial feasible solution until the optimal solution is reached. 
At each iteration, the method examines adjacent feasible solutions 
and selects the one that improves the objective function the most. 
This process continues until no further improvements can be made, 
at which point the optimal solution is found. The simplex method is a 
powerful tool for optimizing problems that can be modeled as linear 
programs.

## Helpful variables to solve simplex method
To solve a linear programming problem using the simplex method,
we often need to introduce additional variables to convert 
inequality constraints into equality constraints. The following 
types of variables are commonly used in the simplex method:

## Surplus Variables
Surplus variables are introduced to represent the amount by 
which the left-hand side of an inequality constraint exceeds 
the right-hand side. Surplus variables are nonnegative and help
to convert "greater than" constraints into "equals" constraints.

## Slack Variables
Slack variables are introduced to represent the amount by which 
the right-hand side of an inequality constraint exceeds the 
left-hand side. Slack variables are also nonnegative and help to 
convert "less than" constraints into "equals" constraints.

## Artificial Variables
Artificial variables are introduced to represent the initial 
feasible solution or to help find a feasible solution in cases
where one does not exist. Artificial variables are used to create 
an initial feasible basis for the simplex method when the original 
problem has no feasible solution. They are also used to convert 
inequality constraints into equality constraints, but are 
eventually removed from the final solution because they do not 
contribute to the objective function.
