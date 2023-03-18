public class Simplex {
  private double[] objective_function;
  private double[][] constraints;
  private double[][] tableau;
  private String[] contraint_types;
  private String type;
  private int artificial = 0;

  public Simplex(
      double[] objective_function,
      double[][] constraints,
      String[] contraint_types,
      String type) {
    this.objective_function = objective_function;
    this.constraints = constraints;
    this.contraint_types = contraint_types;
    this.type = type;
    this.tableau = this.createTableau();
  }

  public double[] objectiveVariables() {
    int artificial = this.artificial;
    int constraints_len = this.constraints.length;
    int objective_len = this.objective_function.length;
    int cols = constraints_len + objective_len + 1 + artificial;

    double[] objective_function = new double[cols];
    for (int i = 0; i < cols; i++) {
      if (i < objective_len) {
        objective_function[i] = -this.objective_function[i];
      } else {
        objective_function[i] = 0;
      }
    }

    return objective_function;
  }

  public double[][] constraintVariables() {
    String[] types = this.contraint_types;
    int artificial = 0;
    for (int i = 0; i < types.length; i++) {
      if (types[i].equals(">=")) {
        artificial += 1;
      }
    }

    this.artificial = artificial;

    int constraint_len = this.constraints.length; // numbers of constraints
    int unknown_len = this.objective_function.length; // unknown variables
    int constraint_len_col = unknown_len + 1; // columns of constraint with result

    // add variables to the constraints
    double[][] constraints = new double[constraint_len][constraint_len + constraint_len_col + artificial];
    int identity_pos = 0;
    for (int i = 0; i < constraint_len; i++) {
      for (int j = 0; j < constraint_len + constraint_len_col + artificial; j++) {
        if (i < constraint_len && j < constraint_len_col - 1) {
          constraints[i][j] = this.constraints[i][j];
        } else if (j != constraint_len_col + constraint_len - 1 + artificial) {
          if (j == identity_pos + constraint_len_col - 1) {
            constraints[i][j] = 1;
          }
        } else {
          // swap the the row of values to the last column
          constraints[i][constraint_len_col + artificial + 1] = this.constraints[i][constraint_len_col - 1];
        }

      }
      identity_pos += 1;
    }
    return constraints;
  }

  public double[][] createTableau() {
    double[][] constraints = constraintVariables();
    double[] objective = objectiveVariables();
    int rows = constraints.length + 1;
    int cols = constraints[0].length;

    double[][] tableau = new double[rows][cols];

    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < cols; j++) {
        if (i < rows - 1) {
          tableau[i][j] = constraints[i][j];
        } else {
          tableau[i][j] = objective[j];
        }
      }
    }

    return tableau;
  }

  public int pivotColumn() {
    int pivot = 0;
    double[][] tableau = this.tableau;
    int rows = tableau.length;
    int cols = tableau[0].length;

    double mostNegative = 0;
    for (int j = 0; j < cols; j++) {
      double min = Math.min(tableau[rows - 1][j], mostNegative);
      if (mostNegative != min) {
        mostNegative = min;
        pivot = j;
      }
    }
    return pivot;
  }

  public int pivotRow(int column) {
    int pivot = -1;
    double[][] tableau = this.tableau;
    int rows = tableau.length;
    int cols = tableau[0].length;

    Double smallest = null;
    for (int i = 0; i < rows - 1; i++) { 
      //TODO: add check zero division
      double ratio = tableau[i][cols - 1] / tableau[i][column];
      if (smallest == null) {
        smallest = ratio;
        pivot = i;
      } else {
        smallest = Math.min(ratio, smallest);
        if (smallest == ratio) {
          pivot = i;
        }
      }
    }

    return pivot;
  }

  public boolean checkOptimize() {
    int cols = this.objective_function.length;
    int rows = this.constraints.length;
    double[][] tableau = this.tableau;

    for (int j = 0; j < cols; j++) {
      if (tableau[rows][j] < 0) {
        return false;
      }
    }
    return true;
  }

  public double[][] iteration() {
    double[][] tableau = this.tableau;
    int rows = tableau.length;
    int cols = tableau[0].length;
    int entering = pivotColumn();
    int departing = pivotRow(entering);

    // divide the pivot row with the pivot number
    System.out.println("Pivot Row: " + departing);
    System.out.println("Pivot Column: " + entering);

    double pivotNumber = tableau[departing][entering];
    for (int j = 0; j < cols; j++) {
      tableau[departing][j] /= pivotNumber;
    }

    // calculate the another rows
    for (int i = 0; i < rows; i++) {
      if (i != departing) {
        double pivot = tableau[i][entering];
        for (int j = 0; j < cols; j++) {
          System.out.print(tableau[i][j] + "-(" + pivot + "*" + tableau[departing][j] +
          ")");
          System.out.print("=" + (tableau[i][j] - (pivot * tableau[departing][j])));
          System.out.println("");
          tableau[i][j] -= pivot * tableau[departing][j];
        }
      }
    }

    // calculate the zj axis
    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < cols; j++) {

      }
    }

    return tableau;
  }

  @Override
  public String toString() {
    int rows = this.tableau.length;
    int cols = this.tableau[0].length;
    String msg = "";
    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < cols; j++) {
        msg += tableau[i][j] + " ";
      }
      msg += "\n";
    }
    return msg;
  }

  public static void main(String[] args) {
    String type = "maximize";
    double[] objective_function = { 3, 1, 3 };
    String[] contraint_types = {
        "<=",
        "<=",
        "<="
    };
    double[][] constraints = {
        { 2, 1, 1 , 2},
        { 1, 2, 3, 5},
        { 2, 2, 1, 6},
    };

    assert (contraint_types.length == constraints.length);

    Simplex simplex = new Simplex(objective_function, constraints, contraint_types, type);
    System.out.println(simplex);

    int i = 0;
    while (!simplex.checkOptimize()) {
      System.out.println("---------------");
      simplex.iteration();
      System.out.println(simplex);
      i++;
    }
    System.out.println("Iterations: " + i);
  }

}
