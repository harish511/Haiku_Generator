var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){ 
var syllabelsArr={};   
var lines = data.toString().split("\n"),
       lineSplit
   lines.forEach(function(line){    
   lineSplit = line.split("  ");  

   var syllabelCount=lineSplit[1].match(/\d+/g)?lineSplit[1].match(/\d+/g).length:0;
    	if(!syllabelsArr[syllabelCount]){
    		syllabelsArr[syllabelCount]=[];
    	}
    	syllabelsArr[syllabelCount].push(lineSplit[0]);
  });  

  return syllabelsArr; 
}

function createHaiku(structure){
  var arrOfWords;
  var syllabelsArr=formatData(cmudictFile);
  return structure.map(function(lines){
    return lines.map(function(syls){
      arrOfWords = syllabelsArr[syls];
      return arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
    }).join(' ');
  }).join('\n');
}

console.log(createHaiku([[5,7,5]]));
module.exports.createHaiku = createHaiku;
