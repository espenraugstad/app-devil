const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let finishMessage = "";

rl.question("Skriv inn nedtelling på formen hh:mm:ss > ", (input)=>{
    
    rl.question("Skriv inn melding ved avslutning > ",(msg)=>{
        let times = input.split(":");
        let seconds = parseInt(times[2]);
        let minutes = parseInt(times[1]);
        let hours = parseInt(times[0]);
        //finishMessage = msg;
        finishMessage = "Tiden er ute";
        startCountdown(hours, minutes, seconds);
        rl.close();
    });    

    
});

function startCountdown(hours, minutes, seconds){
    let countdownInterval = setInterval(() => {
        if(seconds < 0){
            seconds = 59;
            if(minutes != 0){
                minutes--;
            } else if(minutes <=0) {
                minutes = 59;
                if(hours != 0){
                    hours--;
                }
            }
        }
        
        console.log(hours+":"+minutes+":"+seconds);

        if(seconds === 0 && minutes === 0 && hours === 0){
            console.log(finishMessage);
            process.exit();
        } 

        seconds--;
        
    },10);
}
