const express = require("express");

module.exports = (sequelize) =>{
    const ruter = express.Router();
    const{Predmet} = sequelize.models;

    ruter.get("/predmeti", async (req, res) => {
        let predmeti = await Predmet.findAll();

        return res.status(200).json(predmeti);
    });

    ruter.get("/predmet/:id", async (req, res) => {
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({message: `id mora biti broj, primljen je "${id}"`});
        }
        let predmet = await Predmet.findByPk(+id);
        if(predmet === null) {
            return res.status(404).json({message: `nije pronadjen predmet sa id "${id}"`});
        }
        
        return res.status(200).json(predmet);
    });

    ruter.post("/predmet", async (req, res) =>{
        const predmet = req.body;

        if(!predmet.naziv){
            return res.status(400).json({message: `predmet nije validan`});
        }
        try{
            const noviPredmet = await Predmet.create(predmet);
        
            return res.status(201).json(noviPredmet)
        }
        catch(e){
            return res.status(500).json({message: "nije moguce dodati u bazu"});
        }
    })

    ruter.put("/predmet", async (req, res) =>{
        const predmet = req.body;

        if (!predmet.naziv || !predmet.id){
            return res.status(400).json({message: `predmet nije validan`});
        }
        try{
            const noviPredmet = await Predmet.findByPk(+predmet.id);
            noviPredmet.naziv = predmet.naziv;
            noviPredmet.save();

            return res.status(200).json(noviPredmet)
        }
        catch(e){
            console.log(e);
            return res.status(500).json({message: "nije moguce izmijeniti u bazi"});
        }

    })

    ruter.delete("/predmet/:id", async (req, res) =>{
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({message: `id mora biti broj, primljen je "${id}"`});
        }

        try{
            await Predmet.destroy({
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




