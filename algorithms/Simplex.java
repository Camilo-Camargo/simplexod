public class Simplex {
  private double[] objective_function;
  private double[][] constraints;
  private double[][] tableau;
  private String[] contraint_types;
  private String type;

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

  public double[] objectiveSlack() {
    int constraints_len = this.constraints.length;
    int objective_len = this.objective_function.length;
    int cols = constraints_len + objective_len + 1;

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

  public double[][] constraintSlack() {
    int constraint_len = this.constraints.length; // numbers of constraints
    int unknown_len = this.objective_function.length; // unknown variables
    int constraint_len_col = unknown_len + 1; // columns of constraint with result

    // add slack to the constraints
    double[][] constraints = new double[constraint_len][constraint_len + constraint_len_col];
    int identity_pos = 0;
    for (int i = 0; i < constraint_len; i++) {
      for (int j = 0; j < constraint_len + constraint_len_col; j++) {

        if (j < constraint_len_col - 1) {
          constraints[i][j] = this.constraints[i][j];
        } else if (j != constraint_len_col + constraint_len - 1) {
          if (j == identity_pos + constraint_len_col - 1)
            constraints[i][j] = 1;
        } else {
          // swap the the row of values to the last column
          constraints[i][j] = this.constraints[i][constraint_len_col - 1];
        }

      }
      identity_pos += 1;
    }
    return constraints;
  }

  public double[][] createTableau() {
    double[] objective = objectiveSlack();
    double[][] constraints = constraintSlack();
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

  public double[][] iteration() {
    double[][] tableau = this.tableau;
    int rows = tableau.length;
    int cols = tableau[0].length;
    int entering = pivotColumn();
    int departing = pivotRow(entering);

    // divide the pivot row with the pivot number
    double pivotNumber = tableau[departing][entering];
    for (int j = 0; j < cols; j++) {
      tableau[departing][j] /= pivotNumber;
    }

    // calculate the another rows
    for (int i = 0; i < rows; i++) {
      if (i != departing) {
        double pivot = tableau[i][entering];
        for (int j = 0; j < cols; j++) {
          // System.out.print(tableau[i][j] + "-(" + pivot + "*" + tableau[departing][j] +
          // ")");
          // System.out.print("=" + (tableau[i][j] - (pivot * tableau[departing][j])));
          // System.out.println("");
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

  public static void main(String[] args) {
    String type = "<=";
    double[] objective_function = { 40, 30 };
    String[] contraint_types = {
        "<=",
        "<="
    };
    double[][] constraints = {
        { 1, 1, 12 },
        { 2, 1, 16 }
    };

    assert (contraint_types.length == constraints.length);

    Simplex simplex = new Simplex(objective_function, constraints, contraint_types, type);
    for (double[] tableau : simplex.tableau) {
      for (double tableau2 : tableau) {
        System.out.print(tableau2 + "  ");
      }
      System.out.println("");
    }

    System.out.println("-----------------------");

    for (double[] tableau : simplex.iteration()) {
      for (double tableau2 : tableau) {
        System.out.print(tableau2 + "  ");
      }
      System.out.println("");
    }

    System.out.println("-----------------------");

    for (double[] tableau : simplex.iteration()) {
      for (double tableau2 : tableau) {
        System.out.print(tableau2 + "  ");
      }
      System.out.println("");
    }

    System.out.println(simplex.pivotRow(simplex.pivotColumn()));
  }

}
