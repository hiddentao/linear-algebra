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
    var matrix = this.data,
    rows = this.rows,
    cols = this.cols;
    if(cols != rows){
      _throwError('matrix should be squared');
    }

    for (i = 0; i < rows; i++) {
 
      for (j = 0; j < 2*rows; j++) {
          if (j == (i + rows))
              matrix[i][j] = 1;
      }
  }

  for (i = 0; i < rows; i++) {
 
    temp = matrix[i][i];
    for (j = 0; j < 2 * rows; j++) {

        matrix[i][j] = matrix[i][j] / temp;
    }
}

 };
 
 