const express = require("express");

module.exports = (sequelize) =>{
    const ruter = express.Router();
    const{Grupa} = sequelize.models;

    ruter.get("/grupe", async (req, res) => {
        let grupe = await Grupa.findAll({
            include: ["predmet", "studenti", "aktivnosti"]
        });

        return res.status(200).json(grupe);
    });

    ruter.get("/grupa/:id", async (req, res) => {
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({message: `id mora biti broj, primljen je "${id}"`});
        }
        let grupa = await Grupa.findOne({
            where:{ id },
            include: ["predmet", "studenti", "aktivnosti"]
        });
        if(grupa === null) {
            return res.status(404).json({message: `nije pronadjena grupa sa id "${id}"`});
        }
        
        return res.status(200).json(grupa);
    });

    ruter.post("/grupa", async (req, res) =>{
        const grupa = req.body;

        if(!grupa.naziv){
            return res.status(400).json({message: `grupa nije validna`});
        }
        try{
            const novaGrupa = await Grupa.create(grupa);
        
            return res.status(201).json(novaGrupa)
        }
        catch(e){
            return res.status(500).json({message: "nije moguce dodati u bazu"});
        }
    })

    ruter.put("/grupa", async (req, res) =>{
        const grupa = req.body;

        if (!grupa.naziv || !grupa.id){
            return res.status(400).json({message: `grupa nije validna`});
        }
        try{
            const novaGrupa = await Grupa.findByPk(+grupa.id);
            novaGrupa.naziv = grupa.naziv;
            novaGrupa.save();

            return res.status(200).json(novaGrupa)
        }
        catch(e){
            console.log(e);
            return res.status(500).json({message: "nije moguce izmijeniti u bazi"});
        }

    })

    ruter.delete("/grupa/:id", async (req, res) =>{
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({message: `id mora biti broj, primljen je "${id}"`});
        }

        try{
            await Grupa.destroy({
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




