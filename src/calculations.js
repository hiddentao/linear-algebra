Matrix.prototype.getSum = function() {

 // data of this matrix
 var thisData = this.data,
   thisRows = this.rows,
   thisCols = this.cols;

 var sum = 0;

 for (var i = 0; i<thisRows; ++i) {
   for (var j = 0; j<thisCols; ++j) {
     sum += thisData[i][j];
   }
 }
 
 return sum;  
};

