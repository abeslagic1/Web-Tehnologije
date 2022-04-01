let apiUrl = "http://localhost:3000/v2";

$.ajax({
    method:"GET",
    url: apiUrl + "/grupe",
    success: function(response){
        grupe = response;
        const grupaSelect = $("#grupa");

        for(grupa of grupe){
            grupaSelect.append(
                `<option value='${grupa.id}'>${grupa.naziv}</option>`
            );
        }
    },
    error: function(response){
       ispisiNizUTextarea([response.message]);
    },
});

$("#unosStudenata").submit((e) => {
    e.preventDefault();
    const unosStudenti = $("#studentiImeIndex").val().trim().split("\n");
    const grupaId = +$("#grupa").val();
    const studenti = [];
    for(student of unosStudenti){
        const [ime, index] = student.split(",");
        studenti.push({
            ime: ime.trim(),
            index: index.trim()
        })
    }
    $.ajax({
        method: "POST",
        url: apiUrl + "/studenti",
        dataType: 'json',
            contentType: 'application/json',
        data: JSON.stringify({
            grupaId,
            studenti
        }),
        success: function(response){
            ispisiNizUTextarea(response);
        },
        error: function(response){
            ispisiNizUTextarea([response.message]);
        }
    })
})

function ispisiNizUTextarea(niz){
    $("#studentiImeIndex").val(niz.join("\n"));
}