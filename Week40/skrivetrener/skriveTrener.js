const fs = require("fs");

console.clear();

const lines = [
    "Dette er en testlinje.",
    "Hvor fort kan du skrive dette?",
    "Siste linje nå, dette klarer du!"
];

let answers = [];
let startTime = 0;
let endTime = 0;

function newLine(i=0){
    process.stdout.write(`${lines[i]}\n`);
    process.stdout.write(` > `);
}

newLine();

process.stdin.on("data", (data)=> {

    if(startTime === 0){
        startTime = Date.now();
    }
    

    answers.push(data.toString().trim());
    
    if(answers.length < lines.length){
        newLine(answers.length)
    } else {
        process.exit();
    }
    
});

process.on("exit", ()=>{
    endTime = Date.now();

    let seconds = (endTime - startTime)/1000;
    let errors = 0;
    let clicks = 0;
    let clickPerSecond = 0;

    

    for(let i = 0; i < answers.length; i++){
        //console.log(answers[i] === lines[i]);
        if(answers[i] != lines[i]){
            errors++;
        }
        clicks += answers[i].length;
    }

    clickPerSecond = clicks/seconds;

    let res = `Du hadde ${errors} feil.\n
    Du brukte ${clickPerSecond.toFixed(1)} klikk per sekund.\n
    Alt i alt brukte du ${seconds.toFixed(1)} sekunder.
    `

    fs.writeFileSync("log.txt", res);

    console.log(`
    Du hadde ${errors} feil.\n
    Du brukte ${clickPerSecond.toFixed(1)} klikk per sekund.\n
    Alt i alt brukte du ${seconds.toFixed(1)} sekunder.
    `);

})