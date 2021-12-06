require("dotenv").config();

// Importar o Express
const express = require("express")
;
// Biblioteca de logs
const morgan = require("morgan");

const API_VERSION = 1;

const connectToDb = require("./auth_views/db.config");

// Instanciar o Express
const app = express();

// Configurar o Express para aceitar corpos de requisição no formato JSON
app.use(express.json());

// Ligando a biblioteca de logs no Express
app.use(morgan("dev"));

// Ligar os roteadores na instância do Express
//const authRoutes  = require("./route/auth.routes");
const reviewsRoutes  = require("./comment_views/reviews.route");
const roomsRoutes = require("./comment_views/rooms.routes");
const userRoutes = require("./comment_views/users.routes");

// Estamos prefixando todos os endpoints da nossa API com a palavra "api" e uma versão. Isso nos ajuda a identificar futuramente quando houverem vários clientes diferentes qual versão da API cada um deles usa
app.use(`/api/v${API_VERSION}`, reviewsRoutes );
app.use(`/api/v${API_VERSION}`, roomsRoutes);

app.use(`/api/v${API_VERSION}`, userRoutes );

// Esperando a conexão com o banco de dados antes de subir o servidor Express. Isso impede que tenhamos um servidor quebrado funcionando.
connectToDb
    .then(() => {
        // Escutar requisições em uma porta específica
        app.listen(4000, () => {
            console.log("Servidor subiu com sucesso!");
        });
    })
    .catch((err) => {
        console.log(err);
        // O código mata o processo do Node.js
        process.exit(5); // 5 significa Erro Fatal, ou seja, um erro sem solução nessa execução do script
    });