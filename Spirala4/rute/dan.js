const express = require("express");

module.exports = (sequelize) =>{
    const ruter = express.Router();
    const{Dan} = sequelize.models;

    ruter.get("/dani", async (req, res) => {
        let dani = await Dan.findAll();

        return res.status(200).json(dani);
    });

    ruter.get("/dan/:id", async (req, res) => {
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({message: `id mora biti broj, primljen je "${id}"`});
        }
        let dan = await Dan.findByPk(+id);
        if(dan === null) {
            return res.status(404).json({message: `nije pronadjen dan sa id "${id}"`});
        }
        
        return res.status(200).json(dan);
    });

    ruter.post("/dan", async (req, res) =>{
        const dan = req.body;

        if(!dan.naziv){
            return res.status(400).json({message: `dan nije validan`});
        }
        try{
            const noviDan = await Dan.create(dan);
        
            return res.status(201).json(noviDan)
        }
        catch(e){
            return res.status(500).json({message: "nije moguce dodati u bazu"});
        }
    })

    ruter.put("/dan", async (req, res) =>{
        const dan = req.body;

        if (!dan.naziv || !dan.id){
            return res.status(400).json({message: `dan nije validan`});
        }
        try{
            const noviDan = await Dan.findByPk(+dan.id);
            noviDan.naziv = dan.naziv;
            noviDan.save();

            return res.status(200).json(noviDan)
        }
        catch(e){
            console.log(e);
            return res.status(500).json({message: "nije moguce izmijeniti u bazi"});
        }

    })

    ruter.delete("/dan/:id", async (req, res) =>{
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({message: `id mora biti broj, primljen je "${id}"`});
        }

        try{
            await Dan.destroy({
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




