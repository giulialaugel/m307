//email regex, um zu wissen wie eine email validiert wird
const emailregex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
const fs = require('fs');
//modul benutzt express
let express = require("express");
let app     = express();
const port  = process.env.PORT || 3000;
//bodyparser modul wird benutzt
const bodyparser = require("body-parser")
const server = app.listen(port);
console.log(`Running at Port ${port}`);
server.timeout = 1000 * 60 * 2; // 2 minutes
let data = fs.readFileSync('script/server/data.json', { encoding: "utf8", flag: "r" });
if (data.length) {
    data = JSON.parse(data);
}
//body parser
// app.use(bodyparser.urlencoded())
app.use(bodyparser.urlencoded({extended:true}))
// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.header('Content-Type', 'application/json');
    next();
});
//data speichern
function saveData(data) {
    fs.writeFile('script/server/data.json', data,  { encoding: "utf8", flag: "w" }, (err) => {
        if(err){
            throw err;
        }
        console.log("JSON daten sind gespeichert");
    });
}
//Das kommt bei Postman als info für mich raus
//nur unter validate (dem Pfad) wird die Funktion ausgeführt
app.post("/validate",(req,res)=>{
    const {radio, vorname, nachname, email, dropdown, agb} = req.body;
    const errors = {};
    //Validierung
    if (
        !vorname || vorname.length<2 || vorname.length>10
    ){
        errors["vorname"] = "Vorname nicht korrekt";
        //wenn Validierung fehlschlägt
    }
    //wenn Validierung okay ist
    if (
        !radio
    ){
        errors["radio"] = "radio nicht korrekt";
        //wenn Validierung fehlschlägt
    }
    if (
        !nachname || nachname.length<2 || nachname.length>15
    ){
        errors["nachname"] = "nachname nicht korrekt";
        //wenn Validierung fehlschlägt
    }
    if (
        !email || !emailregex.test(email)
    ){
        errors["email"] = "email nicht korrekt";
        //wenn Validierung fehlschlägt
    }
    if (
        !dropdown
    ){
        errors["dropdown"] = "dropdown nicht korrekt";
        //wenn Validierung fehlschlägt
    }
    if (
        !agb || agb === "1"
    ){
        errors["agb"] = "agb nicht korrekt";
        //wenn Validierung fehlschlägt
    }
    if (Object.keys(errors).length === 0){
        data = [...data, { radio, vorname, nachname, email, dropdown }];
        saveData(JSON.stringify(data));
        res.status(200).send("alles ist richtig");
    } else {
        console.error(errors);
        res.status(400).send(errors);
    }
})

