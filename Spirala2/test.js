let assert = chai.assert;
describe('Spirala2', function() {
 describe('iscrtajRaspored()', function() {
   
    it('trebelo bi biti 5 redova', function() {
    let okvir = document.getElementById('okvir');
     Spirala2.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 22);
     let tabele = document.getElementsByTagName("table");
     let tglava = document.getElementsByTagName("thead");
     let ttijelo = document.getElementsByTagName("tbody");
     let tabela = ttijelo[ttijelo.length-1]
     let redovi = tabela.getElementsByTagName("tr");
     assert.equal(redovi.length, 5,"Broj redova treba biti 5");
   });

   it('test kolona', function() {
       let okvir = document.getElementById("okvir");
       Spirala2.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 22);
       let tabele = document.getElementsByTagName("table");
       let tabela = tabele[tabele.length-1]
       let redovi = tabela.getElementsByTagName("tr");
       let kolone = redovi[2].getElementsByTagName("td");
       let brojPrikazanih = 0;
       for(let i=0;i<kolone.length;i++){
           let stil = window.getComputedStyle(kolone[i])
           if(stil.display!=='none') brojPrikazanih++;
       }
       assert.equal(brojPrikazanih, 28,"Broj kolona treba biti 28");
     });
 });
});
