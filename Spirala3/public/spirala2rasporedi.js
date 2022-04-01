//U ovom dijelu pozivamo funkcije iz iscrtaj2.js
/*
let okvir = document.getElementById("okvir");

try{
    iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 22);
    
    dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
    dodajAktivnost(okvir,"WT","vježbe",12,13.5,"Ponedjeljak");
    dodajAktivnost(okvir,"RMA","predavanje",14,17,"Ponedjeljak");
    dodajAktivnost(okvir,"RMA","vježbe",12.5,14,"Utorak");
    dodajAktivnost(okvir,"DM","tutorijal",14,16,"Utorak");
    dodajAktivnost(okvir,"DM","predavanje",16,19,"Utorak");
    dodajAktivnost(okvir,"OI","predavanje",13,17,"Utorak");
}
catch(err){
    okvir.innerHTML = err;
}

let okvir2 = document.getElementById("okvir2");

try{
    iscrtajRaspored(okvir2, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 19);
    
    dodajAktivnost(okvir2,"WT","predavanje",9,12,"Ponedjeljak");
    dodajAktivnost(okvir2,"WT","vježbe",12,13.5,"Ponedjeljak");
    dodajAktivnost(okvir2,"RMA","predavanje",14,17,"Utorak");
    dodajAktivnost(okvir2,"RMA","vježbe",12.5,14,"Srijeda");
    dodajAktivnost(okvir2,"DM","tutorijal",14,16,"Utorak");
    dodajAktivnost(okvir2,"DM","predavanje",16,19,"Četvrtak");
    dodajAktivnost(okvir2,"OI","predavanje",13,17,"Petak");   
}
catch(err){
    okvir2.innerHTML = err;
}

try{
    iscrtajRaspored(okvir3, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"], 8, 24);
    
    dodajAktivnost(okvir3,"WT","predavanje",9,12,"Ponedjeljak");
    dodajAktivnost(okvir3,"WT","vježbe",12,13.5,"Ponedjeljak");
    dodajAktivnost(okvir3,"RMA","predavanje",14,17,"Subota");
    dodajAktivnost(okvir3,"RMA","vježbe",12.5,14,"Srijeda");
    dodajAktivnost(okvir3,"DM","tutorijal",14,16,"Utorak");
    dodajAktivnost(okvir3,"DM","predavanje",16,19,"Petak");
    dodajAktivnost(okvir3,"OI","predavanje",13,17,"Nedjelja"); 
}
catch(err){
    okvir3.innerHTML = err;
}

*/


//U ovom dijelu pozivamo iz dijela iscrtajModul.js

let okvir = document.getElementById("okvir");

try{
    Spirala2.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 22);
    
    Spirala2.dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
    Spirala2.dodajAktivnost(okvir,"WT","vježbe",12,13.5,"Ponedjeljak");
    Spirala2.dodajAktivnost(okvir,"RMA","predavanje",14,17,"Ponedjeljak");
    Spirala2.dodajAktivnost(okvir,"RMA","vježbe",12.5,14,"Utorak");
    Spirala2.dodajAktivnost(okvir,"DM","tutorijal",14,16,"Utorak");
    Spirala2.dodajAktivnost(okvir,"DM","predavanje",16,19,"Utorak");
    Spirala2.dodajAktivnost(okvir,"OI","predavanje",13,17,"Nedjelja");
}
catch(err){
    okvir.innerHTML = err;
}

let okvir2 = document.getElementById("okvir2");

try{
    Spirala2.iscrtajRaspored(okvir2, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 19);
    
    Spirala2.dodajAktivnost(okvir2,"WT","vježbe",12,13.5,"Ponedjeljak");
    Spirala2.dodajAktivnost(okvir2,"RMA","predavanje",14,17,"Utorak");
    Spirala2.dodajAktivnost(okvir2,"WT","predavanje",9,12,"Ponedjeljak");
    Spirala2.dodajAktivnost(okvir2,"RMA","vježbe",12.5,14,"Srijeda");
    Spirala2.dodajAktivnost(okvir2,"DM","tutorijal",14,16,"Utorak");
    Spirala2.dodajAktivnost(okvir2,"DM","predavanje",16,19,"Četvrtak");
    Spirala2.dodajAktivnost(okvir2,"OI","predavanje",13,17,"Petak");   
}
catch(err){
    okvir2.innerHTML = err;
}

let okvir3 = document.getElementById("okvir3");

try{
    Spirala2.iscrtajRaspored(okvir3, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 19);
    
    Spirala2.dodajAktivnost(okvir3,"WT","vježbe",12,13.5,"Ponedjeljak");
    Spirala2.dodajAktivnost(okvir3,"RMA","predavanje",14,17,"Utorak");
    Spirala2.dodajAktivnost(okvir3,"WT","predavanje",9,12,"Ponedjeljak");
    Spirala2.dodajAktivnost(okvir3,"RMA","vježbe",12.5,14,"Srijeda");
    Spirala2.dodajAktivnost(okvir3,"DM","tutorijal",14,16,"Utorak");
    Spirala2.dodajAktivnost(okvir3,"DM","predavanje",16,19,"Četvrtak");
    Spirala2.dodajAktivnost(okvir3,"OI","predavanje",13,17,"Petak");   
}
catch(err){
    okvir3.innerHTML = err;
}