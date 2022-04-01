let predmeti = []; 

let apiUrl = "http://localhost:3000/v1";

$.ajax({
    method:"GET",
    url: apiUrl + "/predmeti",
    success: function(response){
        predmeti = response;
    },
    error: function(response){
        infoPoruka("Greska! - nije moguce dohvatiti listu predmeta.");
    },
});

document.getElementById("aktivnost").addEventListener("submit", async function(event){
    event.preventDefault();
   
    
    let noviPredmet = false;
    let aktivnost = {
        naziv:document.getElementById("naziv").value,
        tip:document.getElementById("tip").value,
        pocetak:document.getElementById("pocetak").value,
        kraj:document.getElementById("kraj").value,
        dan:document.getElementById("dan").value,
    }

    if(!predmeti.some(function(predmet){
        return predmet.naziv === aktivnost.naziv;
    })){
        noviPredmet = true;
        try{
            await createPredmet(aktivnost.naziv);
        }
        catch(e){
            infoPoruka("Greska! - nije moguce kreirati novi predmet.");
            return;
        }
    }

    $.ajax({
        method: "POST",
        url: apiUrl + "/aktivnost",
        data: aktivnost,
        success: function(response){
            infoPoruka("Aktivnost uspjesno dodana.");
        },
        error: function(response){
            infoPoruka("Greska! - nije moguce kreirati novu aktivnost.");
            if(noviPredmet){
                deletePredmet(aktivnost.naziv);
            }
        },
    })
})

function createPredmet(predmet){
    return $.ajax({
        method: "POST",
        url: apiUrl + "/predmet",
        data: {
            naziv: predmet
        },    
    })
}

function deletePredmet(predmet){
    return $.ajax({
        method: "DELETE",
        url: apiUrl + "/predmet/" + predmet,    
    })
}

function infoPoruka(poruka){
    document.getElementById("infoPoruka").innerText = poruka;
}
