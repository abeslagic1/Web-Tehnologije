const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {spirala4Router} = require('../Spirala4/index');
const app = express();
const router = express.Router();

app.use(express.static('public'));
app.use(express.static('../Spirala4/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



//prvi GET zahtijev:
router.get('/predmeti', function(req, res){
    readPredmetiFile()
        .then(function(value){
            res.send(value);
        })
        .catch(function(err){
            res.send(err);
        })
});

//drugi GET zahtijev:
router.get('/aktivnosti', function(req, res){
    readAktivnostiFile()
        .then(function(value){
            res.send(value);
        })
        .catch(function(err){
            res.send(err);
        })
});

//treci GET zahtijev:
router.get('/predmet/:naziv/aktivnost/', function(req, res){
    let trazeni = req.params.naziv;
    fs.readFile("aktivnosti.txt", function(err, data){
        if(err) 
        {
            res.send("Doslo je do greske");
        }
        else
        {
            let aktivnosti = [];
            let tekst = data.toString();
            let redovi = tekst.split("\n");

            for(let i=0; i<redovi.length; i++)
            {
                if(redovi[i] !== "")
                {
                    let kolone = redovi[i].split(",");

                    if(trazeni == kolone[0])
                    {
                        aktivnosti.push({naziv: kolone[0],
                                     tip: kolone[1],
                                     pocetak: kolone[2],
                                     kraj: kolone[3],
                                     dan: kolone[4]});
                        }
                }
            }
            res.send(aktivnosti);
        }
    })
});

//prvi POST zahtijev:
router.post('/predmet', async function(req, res){
    let tijelo = req.body;
    let naziv = req.body.naziv;
    let predmeti =await readPredmetiFile();
    let predmetPostoji = predmeti.some(function(predmet){
        return predmet.naziv === naziv;
    });
    if(predmetPostoji){
        return res.json({message: "Naziv predmeta postoji!"});
    }

    let prefix = "";

    if(predmeti.length > 0){
        prefix = "\n";
    }
    let novaLinija = prefix + tijelo['naziv'];

    fs.appendFile('predmeti.txt', novaLinija, function(err){
        if(err){
           return res.json({message:"Doslo je do greske"});
        }
        
        res.json({message: "Uspjesno dodan predmet", data:novaLinija});
    })
});

//drugi POST zahtijev:
router.post('/aktivnost', async function(req, res){

    let tijelo = req.body;
    let naziv = req.body.naziv;

    let satiPocetak = parseInt(tijelo.pocetak.substr(0,2));
    let minutePocetak = parseInt(tijelo.pocetak.substr(3,2));
    let satiKraj = parseInt(tijelo.kraj.substr(0,2));
    let minuteKraj = parseInt(tijelo.kraj.substr(3,2));

    let pocetakTrazeni = (satiPocetak * 100) + minutePocetak;
    let krajTrazeni = (satiKraj * 100) + minuteKraj;

    let predmeti = await readPredmetiFile();
    let predmetPostoji = predmeti.some(function(predmet){
        return predmet.naziv === naziv;
    });
    //validacija:
    if(!predmetPostoji || pocetakTrazeni >= krajTrazeni || pocetakTrazeni < 800 || pocetakTrazeni >= 2000 || krajTrazeni < 800 || krajTrazeni > 2000 || 
        naziv === "" || tijelo.tip === "" || tijelo.pocetak === "" || tijelo.kraj === "" || tijelo.dan === "")
    {
        res.statusCode = 400;
        return res.json({message: "Aktivnost nije validna!"});
    }
    //validacija preklpanja termina:
    let terminiSePoklapaju = false;

    let fileData = fs.readFileSync("aktivnosti.txt");

    let tekst = fileData.toString();
    let redovi = tekst.split("\n");

    for(let i=0; i<redovi.length; i++)
    {
        let kolone = [];
        kolone = redovi[i].split(",");

        let satiPocetakTxt = parseInt(kolone[2].substr(0,2));
        let minutePocetakTxt = parseInt(kolone[2].substr(3,2));
        let satiKrajTxt = parseInt(kolone[3].substr(0,2));
        let minuteKrajTxt = parseInt(kolone[3].substr(3,2));

        let pocetakTxt = (satiPocetakTxt * 100) + minutePocetakTxt;
        let krajTxt = (satiKrajTxt * 100) + minuteKrajTxt;


        if(tijelo.dan === kolone[4].replace("\r", ""))
        {
            if((pocetakTrazeni <= pocetakTxt) && (krajTrazeni >= krajTxt)){
                terminiSePoklapaju = true;
            }
            else if((pocetakTrazeni >= pocetakTxt) && (krajTrazeni <= krajTxt)){
                terminiSePoklapaju = true;
            }
            else if((pocetakTrazeni <= pocetakTxt) && (pocetakTxt < krajTrazeni) && (krajTrazeni <= krajTxt)){
                terminiSePoklapaju = true;
            } 
            else if((pocetakTrazeni > pocetakTxt) && (pocetakTrazeni < krajTxt) && (krajTrazeni > krajTxt)){
                terminiSePoklapaju = true;
            } 
        }
    }
    
    if(terminiSePoklapaju){
        res.statusCode = 400;
        return res.json({message: "Aktivnost nije validna!"});
    }

    let aktivnosti = await readAktivnostiFile();
    let prefix = "";

    if(aktivnosti.length > 0){
        prefix = "\n";
    }

    let novaLinija = prefix + tijelo['naziv'] + "," + tijelo['tip'] + "," + tijelo['pocetak'] + "," + tijelo['kraj'] + "," + tijelo['dan'];
    fs.appendFile('aktivnosti.txt', novaLinija, function(err){
        if(err){
           return res.json({message:"Aktivnost nije validna"});
        }
        res.json({message: "Uspjesno dodana aktivnost", data:novaLinija});
    })
});
//prvi DELETE zahtijev:
router.delete('/aktivnost/:naziv', function(req, res){
    
    let trazeni = req.params.naziv;
    fs.readFile("aktivnosti.txt", function(err, data){
       
        let tekstBezObrisanog = "";
        let tekst = data.toString();
        let redovi = tekst.split("\n");
        let daLiJeObrisano = false;

        for(let i=0; i<redovi.length; i++)
        {
            let kolone = [];
            kolone = redovi[i].split(",");

            if(trazeni !== kolone[0])
            {
                tekstBezObrisanog += redovi[i] + "\n";
            }
            else{
                daLiJeObrisano= true;
            }
        }   
        if(tekstBezObrisanog.slice(tekstBezObrisanog.length-1) === "\n"){

            tekstBezObrisanog = tekstBezObrisanog.substr(0,tekstBezObrisanog.length-1);
        }
        
        fs.writeFile("aktivnosti.txt", tekstBezObrisanog, function(err){
            if(err || daLiJeObrisano === false) return res.send({message: "Greska - aktivnost nije obrisana!"});
            else res.send({message: "Uspjesno obrisana aktivnost!"});
        }) 
    })
});
//drugi DELETE zahtijev:
router.delete('/predmet/:naziv', function(req, res){
    let trazeni = req.params.naziv;
    fs.readFile("predmeti.txt", function(err, data){
        let tekstBezObrisanog = "";
        let tekst = data.toString();
        let redovi = tekst.split("\n");
        let daLiJeObrisano = false;

        for(let i=0; i<redovi.length; i++)
        {
            if(redovi[i].replace("\r", "") !== trazeni)
                tekstBezObrisanog = tekstBezObrisanog  + redovi[i] + "\n";
            else{
                daLiJeObrisano = true;
            }
        }
        if(tekstBezObrisanog.slice(tekstBezObrisanog.length-1) === "\n"){

            tekstBezObrisanog = tekstBezObrisanog.substr(0,tekstBezObrisanog.length-1);
        }
       
        fs.writeFile("predmeti.txt", tekstBezObrisanog, function(err){
            if(err || daLiJeObrisano === false) return res.send({message: "Greska - predmet nije obrisan!"});
            else res.send({message: "Uspjesno obrisan predmet!"});
        })
    })
});
//treci DELETE zahtijev:
router.delete('/all', function(req, res){
    
    Promise.all([
        writeToFile("predmeti.txt", ""),
        writeToFile("aktivnosti.txt", ""),
    ]).then(function(){
        res.send({message: "Uspjesno obrisan sadrzaj datoteka!"});
    })
    .catch(function(err){
        res.send({message: err});
    })
});

app.use("/v1", router);
app.use(spirala4Router);

let port = 3000;
app.listen(port);
console.log("server pokrenut na portu: " + port);

function readPredmetiFile(){
    return new Promise(function(resolve, reject){
        fs.readFile("predmeti.txt", function(err, data){
            if(err)
            {
                reject("Doslo je do greske.");
            }
            else
            {
                let predmeti = [];
                let tekst = data.toString();
                let redovi = tekst.split("\n");
                for(let i=0; i<redovi.length; i++)
                {
                    if(redovi[i] !== "")
                    predmeti.push({naziv: redovi[i].replace("\r", "")})
                }
                resolve(predmeti);
            }
        })
    })   
};

function readAktivnostiFile(){
    return new Promise(function(resolve, reject){
        fs.readFile("aktivnosti.txt", function(err, data){
            if(err) 
            {
                reject("Doslo je do greske");
            }
            else
            {
                let aktivnosti = [];
                let tekst = data.toString();
                let redovi = tekst.split("\n");
    
                for(let i=0; i<redovi.length; i++)
                {
                    if(redovi[i] !== "")
                    {
                        let kolone = redovi[i].split(",");
                        aktivnosti.push({naziv: kolone[0],
                                         tip: kolone[1],
                                         pocetak: kolone[2],
                                         kraj: kolone[3],
                                         dan: kolone[4]});
                    }
                }
                resolve(aktivnosti);
            }
        })
    })
};

function writeToFile(filename, fileContent){
    return new Promise(function(resolve, reject){
        fs.writeFile(filename, fileContent, function(err){

            if(err) reject("Greska pri pisanju - " + filename);
            else resolve();
        })
    })
};