import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

const app = express();
app.use(cors({
  origin: '*', // Permite acesso de qualquer porta (inclusive a 5173 do Vite)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Libera os métodos que estamos usando
  allowedHeaders: ['Content-Type'] // Libera o envio de JSON
}));
app.use(express.json());

// sqlite ao inves de memory
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

const Pocao = sequelize.define("Pocao", {
  nome: DataTypes.STRING,
  descricao: DataTypes.STRING,
  imagem: DataTypes.STRING,
  preco: DataTypes.FLOAT,
});

async function iniciarServidor() {
  try {
    await sequelize.sync();
    console.log("Banco de dados SQLite sincronizado.");

    app.get("/pocoes", async (req, res) => {
      const pocoes = await Pocao.findAll();
      res.status(200).json(pocoes);
    });

    app.post("/pocoes", async (req, res) => {
      const { nome, descricao, imagem, preco } = req.body;
      const novaPocao = await Pocao.create({ nome, descricao, imagem, preco });
      res.status(201).json(novaPocao);
    });

    app.delete("/pocoes/:id", async (req, res) => {
      const { id } = req.params;
      const deletado = await Pocao.destroy({ where: { id } });
      if (deletado) res.status(200).json({ message: "Removida com sucesso." });
      else res.status(404).json({ error: "Poção não encontrada." });
    });

    // Armazenar a instância do servidor em uma constante
    const server = app.listen(3333, '0.0.0.0', () => {
      console.log(
        "🔥 Web Service 'Poções e Soluções' rodando firme na porta 3333",
      );
    });

    // Esse setInterval invisível garante que o Node.js tenha uma tarefa contínua,
    // impedindo-o de encerrar o processo com código 0.
    setInterval(() => {}, 1000 * 60 * 60);
  } catch (erro) {
    console.error("Falha ao subir o servidor:", erro);
  }
}

iniciarServidor();
