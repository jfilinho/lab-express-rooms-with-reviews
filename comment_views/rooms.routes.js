const express = require("express");

// Configura um roteador
const router = express.Router();

// Importar o modelo da coleção
const roomsRoutes = require("../room_views/room.models");

// REST => REpresentational State Transfer

// Seguir as regras do REST: usar os métodos HTTP corretos pra cada ação (GET pra buscar, POST pra inserir, etc) e responder com o status HTTP correto (200 pra sucesso, 201 pra criação, 404 pra não encontrado, etc)

// CRUD

// Crud Create (POST)

router.post("/room", async (req, res) => {
    try {
        // Extrair as informações do corpo da requisição
 
        // Inserir no banco
        const result = await roomsRoutes.create(req.body);

        // Responder a requisição
        // Pela regra do REST, a resposta de uma inserção deve conter o registro recém-inserido com status 201 (Created)
        res.status(201).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// cRud Read (GET) ler a lista toda(Lista)

router.get("/room", async (req, res) => {
    try {
        // Buscar as informações no banco
        const room = await roomsRoutes.find();

        // Responder a requisição
        res.status(200).json(room);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//ler o detalhe de um produto
router.get("/room/:roomId", async (req, res) => {
    try {
        // Buscar as informações no banco
        const room = await roomsRoutes.findOne({_id: req.params.roomId});

        //verifica se tem o produto no banco
        if(!room){
       res.status(404).json({msg: 'produto não encontrado!'}); 
        }
        // Responder a requisição
        res.status(200).json(room);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// PUT => substituição (destrutiva)
// PATCH => atualização (não-destrutiva)

// crUd Update (PATCH)
router.patch("/room/:roomId", async (req, res) => {
    try {
        // Extrair os dados do corpo da requisição

        // Atualizar o registro
        const room = await roomsRoutes.findOneAndUpdate({ _id: req.params.roomId },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!room) {
            return res.status(404).json({ msg: "Room não encontrado." });
        }

        res.status(200).json(room);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// cruD Delete (DELETE)

router.delete("/room/:roomId", async (req, res) => {
    try {
        const room = await roomsRoutes.deleteOne({ _id: req.params.roomId });

        if (room.deletedCount < 1) {
            return res.status(404).json({ msg: "Room  não encontrado" });
        }

        // Pela regra do REST, deleções devem retornar um objeto vazio
        res.status(200).json({msg: "room deletado!"});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;