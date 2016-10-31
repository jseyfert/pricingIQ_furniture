var test = [true, true, false];

var newTest = test.map(function(url){
  if (url){
    return 1;
  } else {
    return 2;
  }
})


console.log(newTest);
