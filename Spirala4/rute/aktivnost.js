const express = require("express");


function aktivnostJeValidna(aktivnost){
    if(!aktivnost.naziv || !aktivnost.pocetak || !aktivnost.kraj || !aktivnost.predmetId || !aktivnost.danId || !aktivnost.tipId || !aktivnost.grupaId){
        return false;
    }
    if(aktivnost.pocetak >= aktivnost.kraj){
        return false;
    }
    return true;
}

module.exports = (sequelize) =>{
    const ruter = express.Router();
    const{Aktivnost} = sequelize.models;

    ruter.get("/aktivnosti", async (req, res) => {
        let aktivnosti = await Aktivnost.findAll({
            include: ["predmet", "grupa", "tip", "dan"]
        });

        return res.status(200).json(aktivnosti);
    });

    ruter.get("/aktivnost/:id", async (req, res) => {
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({message: `id mora biti broj, primljen je "${id}"`});
        }
        let aktivnost = await Aktivnost.findOne({
            where:{ id },
            include: ["predmet", "grupa", "tip", "dan"]
        });
       
        if(aktivnost === null) {
            return res.status(404).json({message: `nije pronadjena aktivnost sa id "${id}"`});
        }
        
        return res.status(200).json(aktivnost);
    });

    ruter.post("/aktivnost", async (req, res) =>{
        const aktivnost = req.body;

        if(!aktivnostJeValidna(aktivnost)){
            return res.status(400).json({message: `aktivnost nije validna`});
        }
        try{
            const novaAktivnost = await Aktivnost.create(aktivnost);
        
            return res.status(201).json(novaAktivnost)
        }
        catch(e){
            return res.status(500).json({message: "nije moguce dodati u bazu"});
        }
    })

    ruter.put("/aktivnost", async (req, res) =>{
        const aktivnost = req.body;

        if(aktivnost.pocetak && aktivnost.kraj && aktivnost.pocetak >= aktivnost.kraj){
            return res.status(400).json({message: `aktivnost nije validna`});
        }
        try{
            const novaAktivnost = await Aktivnost.update(aktivnost, {
                where:{
                    id: aktivnost.id
                }
            });
            
            return res.status(200).json(novaAktivnost)
        }
        catch(e){
            console.log(e);
            return res.status(500).json({message: "nije moguce izmijeniti u bazi"});
        }
        
    });

    ruter.delete("/aktivnost/:id", async (req, res) =>{
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({message: `id mora biti broj, primljen je "${id}"`});
        }

        try{
            await Aktivnost.destroy({
                where: {
                    id
                }
            });
            return res.status(200).send();
        }
        catch(e){
            return res.status(500).json({message: "Nije moguce obrisati!"});
        }
    })

    return ruter;

}
