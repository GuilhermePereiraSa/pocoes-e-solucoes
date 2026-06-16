import express from "express";
import cors from "cors";

import { Sequelize, DataTypes } from "sequelize";

const app = express();

app.use(cors());
app.use(express.json());

// config ORM
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "memory",
  logging: false,
});

// model
const Pocao = sequelize.define("Pocao", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  image: DataTypes.STRING, // url or path
  price: DataTypes.FLOAT,
});

await sequelize.sync();
// routes

app.get("/pocoes", async (req, res) => {
  try {
    const pocoes = await Pocao.findAll();

    res.status(200).json(pocoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar poções." });
  }
});

app.post("/pocoes", async (req, res) => {
  try {
    const { name, description, image, price } = req.body;

    const novaPocao = await Pocao.create({ name, description, image, price });
    res.status(201).json(novaPocao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar poção." });
  }
});

app.delete("/pocoes/:id", async (req, res) => {
  try {
    const { id } = req.body;

    const deletado = await Pocao.destroy({ where: { id } });

    if (deletado) {
      res.status(200).json({ message: "Poção removida com sucesso." });
    } else {
      res.status(404).json({ error: "Poção não encontrada." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover poção." });
  }
});

// port
app.listen(3000, () => console.log("Web Service rodando na porta 3000"));
