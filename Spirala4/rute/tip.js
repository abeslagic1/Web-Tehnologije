const express = require("express");

module.exports = (sequelize) =>{
    const ruter = express.Router();
    const{Tip} = sequelize.models;

    ruter.get("/tipovi", async (req, res) => {
        let tipovi = await Tip.findAll();

        return res.status(200).json(tipovi);
    });

    ruter.get("/tip/:id", async (req, res) => {
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({message: `id mora biti broj, primljen je "${id}"`});
        }
        let tip = await Tip.findByPk(+id);
        if(tip === null) {
            return res.status(404).json({message: `nije pronadjen tip sa id "${id}"`});
        }
        
        return res.status(200).json(tip);
    });

    ruter.post("/tip", async (req, res) =>{
        const tip = req.body;

        if(!tip.naziv){
            return res.status(400).json({message: `tip nije validan`});
        }
        try{
            const noviTip = await Tip.create(tip);
        
            return res.status(201).json(noviTip)
        }
        catch(e){
            return res.status(500).json({message: "nije moguce dodati u bazu"});
        }
    })

    ruter.put("/tip", async (req, res) =>{
        const tip = req.body;

        if (!tip.naziv || !tip.id){
            return res.status(400).json({message: `tip nije validan`});
        }
        try{
            const noviTip = await Tip.findByPk(+tip.id);
            noviTip.naziv = tip.naziv;
            noviTip.save();

            return res.status(200).json(noviTip)
        }
        catch(e){
            console.log(e);
            return res.status(500).json({message: "nije moguce izmijeniti u bazi"});
        }

    })

    ruter.delete("/tip/:id", async (req, res) =>{
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({message: `id mora biti broj, primljen je "${id}"`});
        }

        try{
            await Tip.destroy({
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




