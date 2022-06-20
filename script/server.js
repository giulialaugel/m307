//email regex, um zu wissen wie eine email validiert wird
const emailregex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
//modul benutzt express
let express = require("express");
let app     = express();
const port = process.env.PORT || 3000;
//bodyparser modul wird benutzt
const bodyparser = require("body-parser")
const server = app.listen(port);
console.log(`Running at Port ${port}`);
server.timeout = 1000 * 60 * 2; // 2 minutes
let data = [];
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
app.get('/data', (req, res) => {
    res.send(data)
})
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
        // res.status(400).send("Vorname nicht korrekt")
    }
    //wenn Validierung okay ist
    if (
        !radio
    ){
        errors["radio"] = "radio nicht korrekt";
        //wenn Validierung fehlschlägt
        // res.status(400).send("radio nicht korrekt")
    }
    if (
        !nachname || nachname.length<2 || nachname.length>15
    ){
        errors["nachname"] = "nachname nicht korrekt";
        //wenn Validierung fehlschlägt
        // res.status(400).send("Nachname nicht korrekt")
    }
    if (
        !email || !emailregex.test(email)
    ){
        errors["email"] = "email nicht korrekt";
        //wenn Validierung fehlschlägt
        // res.status(400).send("E-Mail nicht korrekt")
    }
    if (
        !dropdown
    ){
        errors["dropdown"] = "dropdown nicht korrekt";
        //wenn Validierung fehlschlägt
        // res.status(400).send("Kein Produkt ausgewählt")
    }
    if (
        !agb || agb === "1"
    ){
        errors["agb"] = "agb nicht korrekt";
        //wenn Validierung fehlschlägt
        // res.status(400).send("AGB nicht akzeptiert")
    }
    if (Object.keys(errors).length === 0){
        data = [
            ...data,
            {
                radio,
                vorname,
                nachname,
                email,
                dropdown
            }
        ]
        console.log(data)
        res.send("alles ist richtig")
    } else {
        console.error(errors);
        res.status(400).send(errors);
    }
})
//redirecting
function confirmInput() {
    fname = document.forms['vorname'].fname.value;
    alert("Hello " + fname + "! You will now be redirected to www.w3Schools.com");
}