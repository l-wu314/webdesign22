const Calculate = {
    factorial(n) {
      let range = [...Array(n+1).keys()];
      let result = 1;
  
      range.forEach( currentNumber => {
        if (currentNumber != 0){
          return result *= currentNumber;
        }
      });
      
      return result;
    }
  }
  
  module.exports = Calculate;
  
  
  