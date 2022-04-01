const express = require("express");


module.exports = (sequelize) =>{
    const ruter = express.Router();
    const{Student, Grupa} = sequelize.models;

    ruter.get("/studenti", async (req, res) => {
        let studenti = await Student.findAll({
            include: ["grupa"]
        });

        return res.status(200).json(studenti);
    });

    ruter.get("/student/:id", async (req, res) => {
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({message: `id mora biti broj, primljen je "${id}"`});
        }
        let student = await Student.findOne({
            where:{ id },
            include: ["grupa"]
        });
        if(student === null) {
            return res.status(404).json({message: `nije pronadjen student sa id "${id}"`});
        }
        
        return res.status(200).json(student);
    });

    ruter.post("/studenti", async (req, res) =>{
        const { studenti, grupaId } = req.body;

        if((Array.isArray(studenti) && studenti.length === 0) || !grupaId){
            return res.status(400).json({message: "Unos neispravan!"});
        }

        const grupa = await Grupa.findByPk(+grupaId);
        if(grupa === null){
            return res.status(400).json({message: "Grupa ne postoji!"});
        }

        const greske = [];

        for(student of studenti){
            const postojeciStudent = await Student.findOne({
                where:{
                    index: student.index
                }
            });

            
            try{
                if(postojeciStudent === null){
                    const noviStudent = await Student.create(student);
                    await noviStudent.setGrupe([grupa]);
                }
                else if(postojeciStudent.ime !== student.ime){
                    greske.push(
                        `Student ${student.ime} nije kreiran jer postoji student ${postojeciStudent.ime} sa istim indexom ${postojeciStudent.index}.`
                    );
                }
                else if(postojeciStudent.ime === student.ime){
                    const studentoveGrupe = await postojeciStudent.getGrupe();
                    const noveStudentoveGrupe = studentoveGrupe.filter((g) => g.predmetId !== grupa.predmetId);
                    noveStudentoveGrupe.push(grupa);

                    postojeciStudent.setGrupe(noveStudentoveGrupe);
                }               
            }
            catch(e){
                return res.status(500).json({message: e.message});
            }
            
        }
        return res.status(200).json(greske);

    });

    ruter.post("/student", async (req, res) =>{
        const student = req.body;

        if(!student.ime || !student.index){
            return res.status(400).json({message: `student nije validan`});
        }
        try{
            const noviStudent = await Student.create(student);
        
            return res.status(201).json(noviStudent)
        }
        catch(e){
            return res.status(500).json({message: "nije moguce dodati u bazu"});
        }
    })

    ruter.put("/student", async (req, res) =>{
        const student = req.body;

        if (!student.id){
            return res.status(400).json({message: `student nije validan`});
        }
        try{
            const noviStudent = await Student.update(student, {
                where:{
                    id: student.id
                }
            });

            return res.status(200).json(noviStudent)
        }
        catch(e){
            console.log(e);
            return res.status(500).json({message: "nije moguce izmijeniti u bazi"});
        }

    })

    ruter.delete("/student/:id", async (req, res) =>{
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({message: `id mora biti broj, primljen je "${id}"`});
        }

        try{
            await Student.destroy({
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
