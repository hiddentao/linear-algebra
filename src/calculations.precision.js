/**
 * @fileOverview  High precision version.
 */




/**
 * Sum every element.
 * @return {Number}
 */
Matrix.prototype.getSum = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var sum = new Array(rows * cols);

  for (var i = 0, jBase = 0; i<rows; ++i, jBase += cols) {
    for (var j = 0; j<cols; ++j) {
      sum[jBase + j] = thisData[i][j];
    }
  }
  
  return adder(sum); 
};

Matrix.prototype.getMax = function() {
 var thisData = this.data,
   rows = this.rows,
   cols = this.cols,
   max = thisData[0][0];

 for (var i = 0; i<rows; ++i) {
   for (var j = 0; j<cols; ++j) {
     if (thisData[i][j] > max) {
       max = thisData[i][j];
     }
   }
 }

 return max;
};

Matrix.prototype.getMin = function() {
 var thisData = this.data,
   rows = this.rows,
   cols = this.cols,
   min = thisData[0][0];

 for (var i = 0; i<rows; ++i) {
   for (var j = 0; j<cols; ++j) {
     if (thisData[i][j] < min) {
       min = thisData[i][j];
     }
   }
 }

 return min;
};

Matrix.prototype.getArgMax = function() {
 var thisData = this.data,
   rows = this.rows,
   cols = this.cols,
   max = thisData[0][0],
   idx = 0;

 for (var i = 0; i<rows; ++i) {
   for (var j = 0; j<cols; ++j) {
     if (thisData[i][j] > max) {
       max = thisData[i][j];
       idx = cols * i + j;
     }
   }
 }

 return idx;
};

Matrix.prototype.getArgMin = function() {
 var thisData = this.data,
   rows = this.rows,
   cols = this.cols,
   min = thisData[0][0],
   idx = 0;

 for (var i = 0; i<rows; ++i) {
   for (var j = 0; j<cols; ++j) {
     if (thisData[i][j] < min) {
       min = thisData[i][j];
       idx = cols * i + j;
     }
   }
 }

 return idx;
};
