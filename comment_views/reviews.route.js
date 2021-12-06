const express = require("express");

// Configura um roteador
const router = express.Router();

// Importar o modelo da coleção
const reviewsModel = require("../room_views/room.models");

// REST => REpresentational State Transfer

// CRUD

// Crud Create (POST)

router.post("/comment", async (req, res) => {
    try {
        // Extrair as informações do corpo da requisição
        console.log(req.body);

        // Inserir no banco
        const result = await reviewsModel.create(req.body);

        // Atualizar a lista de quartos comentados do usuário
         const updatedUser = await reviewsModel.findOneAndUpdate(
             { _id: req.body.roomId },
             { $push: { reviews: result._id } }, // Adicionar um novo elemento (id do comentário recém-criado) no campo 'reviews' que é uma array
             { new: true, runValidators: true }
         );

         console.log(updatedUser);

        // Responder a requisição
        // Pela regra do REST, a resposta de uma inserção deve conter o registro recém-inserido com status 201 (Created)
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// cRud Read (GET) (Lista)

router.get("/comment", async (req, res) => {
     try {
//         // Buscar as informações no banco
        const orders = await reviewsModel.find()
             .populate({patch:'reviews', model: 'Review'});
 
//         // Responder a requisição
        res.status(200).json(orders);
     } catch (err) {
         console.log(err);
        res.status(500).json(err);
     }
 });

module.exports = router;