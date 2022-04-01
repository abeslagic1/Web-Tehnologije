var Spirala2 = (function(){

    var iscrtajRaspored = function(div, dani, satPocetak, satKraj)
    {
        if(satPocetak>=satKraj) throw "Greska";
        if(satPocetak - parseInt(satPocetak) != 0 || satPocetak<0 || satPocetak>24) throw "Greskaa";
        if(satKraj - parseInt(satKraj) != 0 || satKraj<0 || satKraj>24) throw "Greskaaaa";

        let parentDiv = div;
        let table = document.createElement('table');

        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        let row = document.createElement('tr');

        for(var a=satPocetak; a<=satKraj; a++)
        {
            let cell=document.createElement('td');
            let minutCell = document.createElement('td');
            if((a%2==0 && a<=12 && a<satKraj-1) || (a>= 15 && a%2==1 && a<satKraj)){
                cell.classList.add('sati');
                cell.innerHTML = a + ':' ;
            
                minutCell.classList.add('minute');
                minutCell.innerHTML = '00';
                row.appendChild(cell);
                row.appendChild(minutCell);
            }
            else if(a<satKraj){
                row.appendChild(cell);
                row.appendChild(minutCell);
            }
            else if(a==satKraj){
                row.appendChild(cell);
            }
        }

        thead.appendChild(row);
        table.appendChild(thead);

    
        for(var i=0; i<dani.length; i++)
        {
            let redDani = document.createElement('tr');
            redDani.classList.add(dani[i], 'dan');
            let koloneDani = document.createElement('td');
            koloneDani.classList.add('dani');
            koloneDani.innerHTML = dani[i];

            redDani.appendChild(koloneDani);

            for(var j=satPocetak; j<satKraj; j+=0.5)
            {
                let koloneDaniPuni = document.createElement('td');
                koloneDaniPuni.classList.add("slot");

                if(j%1 === 0)
                {
                    koloneDaniPuni.classList.add("slot_full");
                }
                koloneDaniPuni.setAttribute("count", j);

                redDani.appendChild(koloneDaniPuni);
            }

            tbody.appendChild(redDani);
        }

        table.appendChild(tbody);
        parentDiv.appendChild(table);
    }


    var dodajAktivnost = function(raspored, naziv, tip, vrijemePocetka, vrijemeKraja, dan){
    
        if( raspored == null || raspored == NaN) throw "Greska - raspored nije kreiran";
        let parentDiv = raspored;
        let startingSlotSelectorLabel = "."+ dan + " .slot[count='" + vrijemePocetka +"']";

        console.log(startingSlotSelectorLabel);
        let duration = (vrijemeKraja-vrijemePocetka)*2;
        let startingSlot = parentDiv.querySelector(startingSlotSelectorLabel);

        let currentSelector = '';
    
        for(let a = vrijemePocetka; a<vrijemeKraja; a+=0.5)
        {
            let suffix= a=== vrijemeKraja-0.5 ?'': ', ';
            currentSelector += "."+ dan + " .slot[count='" + a +"']" + suffix;
        }

        let selectedSlots = Array.from(parentDiv.querySelectorAll(currentSelector));

        if(selectedSlots.length === duration && !selectedSlots.some((el) => el.hasAttribute('colspan')) && 
        !selectedSlots.some((el) => el.hasAttribute('id')))
        {
            startingSlot.setAttribute("colspan", duration); 
            startingSlot.setAttribute("id", naziv+tip);
            parentDiv.querySelector("#" + naziv+tip).innerHTML = '<h3>'+ naziv + '</h3>' + '<p>' + tip + '</p>';
            selectedSlots.shift();
            selectedSlots.forEach(el => el.remove());
        }
        else{
            alert('Greška - već postoji termin u rasporedu u zadanom vremenu');
            return;
        }
    }

    return{
        iscrtajRaspored: iscrtajRaspored,
        dodajAktivnost: dodajAktivnost
    }
}());