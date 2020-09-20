const fs = require("fs");

if(process.argv.length >= 3){

    let fil = fs.readFileSync(process.argv[2],"utf-8");
    let ordListe = fil.split(" ");

    /* TODO
     - Beautify words (fjern . og , etc.)
     - Ha med frekvensordliste i rapporten.
    */

    /* Lag en ordbok med frekvenser for hvert ord */
    let ordbok = [];

    ordListe.forEach(ord => {
        if(ordbok[ord]!=undefined){
            ordbok[ord] += 1;
        } else {
            ordbok[ord] = 1;
        }
    });

    /* Beregn LIX-indeks */
    let antallOrd = ordListe.length; //A

    let bokstavListe = fil.split("");

    let setningsTerminator = 0; //B

    const storeBokstaver = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Æ", "Ø", "Å"];

    bokstavListe.forEach(tegn => {
        if(tegn === "." || tegn === ":"){
            setningsTerminator++;
        }

        if(storeBokstaver.indexOf(tegn) != -1){
            setningsTerminator++;
        }
    })

    let antallLangeOrd = 0; //C

    ordListe.forEach(ord => {
        if(ord.length > 6){
            antallLangeOrd++;
        }
    })

    let lix = Math.round(antallOrd/setningsTerminator + (antallLangeOrd*100)/antallOrd);

    let result = `
    
    Antall ord: ${antallOrd}
    Antall setningsterminatorer: ${setningsTerminator}
    Antall lange ord: ${antallLangeOrd}
    Beregnet lesbarhet: ${lix}
    
    Tolkning:
    Under 25: Barnebøker
    25 - 30: Enkle tekster
    30 - 40: Normal skjønnlitteratur
    40 - 50: Sakprosa (som f.eks. Wikipedia-artikler)
    50 - 60: Sakprosa
    Over 60: Avanserte fagtekster som forskning eller juss
    
    `;

    if(process.argv.length >= 4){
        //Skriv til fil
        fs.writeFileSync(process.argv[3], result);
    } else {
        console.log(result);
    }


} else {
    console.log("Trenger en fil.");
}
