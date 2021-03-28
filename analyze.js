const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/weather.json`, 'utf8');
let jsArr = JSON.parse(data);

/*
for (i=0;i<jsArr.length;i++){
	console.log(jsArr[i].date + " " + jsArr[i].time+": "+jsArr[i].temp+",
	"+jsArr[i].feels+","+jsArr[i].desc+","+jsArr[i].windspeed);
}
console.log(jsArr.length);
*/

let highestWindspeed = 0.0;
let highestWindspeedIndex = 0;
for (i=0;i<jsArr.length;i++){
	if (jsArr[i].windspeed > highestWindspeed){
		highestWindspeed = jsArr[i].windspeed;
		highestWindspeedIndex = i;
	}
}

let lowestFeel = 0.0;
let lowestFeelIndex = 0;
for (i=0;i<jsArr.length;i++){
	if (jsArr[i].feels < lowestFeel){
		lowestFeel = jsArr[i].feels;
		lowestFeelIndex = i;
	}
}	

let highestTemp = 0.0;
let highestTempIndex = 0;
for (i=0; i<jsArr.length; i++){
	if (jsArr[i].temp > highestTemp){
		highestTemp = jsArr[i].temp;
		highestTempIndex = i;
	}
}

console.log("\n Number of entries: " + jsArr.length);
console.log("\nHighest Windspeed entry");
console.log(jsArr[highestWindspeedIndex]);
console.log("\nLowest Temperature (Feeling) entry");
console.log(jsArr[lowestFeelIndex]);
console.log("\nHigh Temperature entry");
console.log(jsArr[highestTempIndex]);
console.log("\nLatest Entry");
console.log(jsArr[jsArr.length-1]);
