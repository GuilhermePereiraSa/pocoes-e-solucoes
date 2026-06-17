import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

export default function Admin() {
  const [pocoes, setPocoes] = useState([]);

  // CORREÇÃO: Apenas um objeto, e chaves traduzidas para bater certo com a Base de Dados
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    imagem: "",
    preco: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3333/pocoes").then((res) => setPocoes(res.data));
  }, []);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("A enviar dados para o servidor:", formData);

    axios
      .post("http://localhost:3333/pocoes", formData)
      .then((result) => {
        console.log("Resposta do Servidor:", result);
        if (result.status === 201) {
          alert("Poção adicionada com sucesso ao catálogo!");
          setPocoes([...pocoes, result.data]);
          setFormData({ nome: "", descricao: "", imagem: "", preco: "" });
        }
      })
      .catch((erro) => {
        console.error("ERRO FATAL NA REQUISIÇÃO:", erro);
        alert("A magia falhou! Abra a consola (F12) para ver o motivo.");
      });
  }

  function deletar(id) {
    axios.delete(`http://localhost:3333/pocoes/${id}`).then((result) => {
      if (result.status == 200) {
        setPocoes((pocoesAntes) => pocoesAntes.filter((p) => p.id !== id));
      }
    });
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Painel de Gestão</h2>

      <form onSubmit={handleSubmit} className="glass-panel mb-5">
        <h4 className="mb-4" style={{ color: "var(--accent-purple)" }}>
          Registar Nova Poção
        </h4>

        {/* Repare que alterámos a propriedade 'name' de todos os inputs */}
        <div className="mb-3">
          <label className="mb-1">Nome da Poção</label>
          <input
            type="text"
            className="glass-input"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: Poção do Perfume Misterioso"
            required
          />
        </div>

        <div className="mb-3">
          <label className="mb-1">Descrição</label>
          <input
            type="text"
            className="glass-input"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descreva os efeitos mágicos..."
            required
          />
        </div>

        <div className="mb-3">
          <label className="mb-1">URL da Imagem</label>
          <input
            type="text"
            className="glass-input"
            name="imagem"
            value={formData.imagem}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="mb-4">
          <label className="mb-1">Preço (moedas)</label>
          <input
            type="number"
            className="glass-input"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            placeholder="200"
            required
          />
        </div>

        <button type="submit" className="btn-magico">
          Adicionar ao Stock
        </button>
      </form>

      <h3 className="mb-3">Stock Atual</h3>
      <ul className="list-group mb-5 invisible-bullets flex-column gap-2">
        {pocoes.map((pocao) => (
          <li
            key={pocao.id}
            className="glass-list-item d-flex justify-content-between align-items-center p-3"
          >
            <div>
              <strong style={{ fontSize: "1.1rem" }}>{pocao.nome}</strong>
              <span className="ms-2" style={{ color: "#fca311" }}>
                ({pocao.preco} moedas)
              </span>
            </div>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => deletar(pocao.id)}
            >
              <FaTrashAlt /> Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
