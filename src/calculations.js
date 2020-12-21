Matrix.prototype.getSum = function() {
 var thisData = this.data,
   rows = this.rows,
   cols = this.cols;

 var sum = 0;

 for (var i = 0; i<rows; ++i) {
   for (var j = 0; j<cols; ++j) {
     sum += thisData[i][j];
   }
 }
 
 return sum;  
};

Matrix.prototype.getInverse = function() {

    var matrix = new Matrix(this.toArray());
    rows = this.rows,
    cols = this.cols;
    let temp;
    
    if(cols != rows){
      _throwError('matrix should be squared');
    }

    order = rows;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < 2*rows; j++) {
          if (j == (i + rows))
              matrix[i][j] = 1;
      }
    }

  for (let i = order - 1; i > 0; i--) {
    if (matrix[i - 1][0] < matrix[i][0]) {
        temp = matrix[i];
        matrix[i] = matrix[i - 1];
        matrix[i - 1] = temp;
    }
  }

  for (let i = 0; i < order; i++) {
     for (let j = 0; j < order; j++) {
        if (j != i) {
            temp = matrix[j][i] / matrix[i][i];
            for (let k = 0; k < 2 * order; k++) {
                matrix[j][k] -= matrix[i][k] * temp;
            }
        }
      }
  }

  for (let i = 0; i < rows; i++) {
    temp = matrix[i][i];
    for (let j = 0; j < 2 * rows; j++) {
        matrix[i][j] = matrix[i][j] / temp;
    }
  }


 };
 
 