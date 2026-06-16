import { useEffect, useState } from "react";

import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

export default function Admin() {
  const [pocoes, setPocoes] = useState([]);
  const [formData, setFormData] = useState(
    {
      name: "",
      description: "",
      image: "",
      price: "",
    },
    [],
  );
  useEffect(() => {
    axios
      .get("http://localhost:3000/pocoes")
      .then((res) => setPocoes(res.data));
  }, []);

  function handleChange(event) {
    // atualiza valor dinamicamente baseado no 'name' do input
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios.post("http://localhost:3000/pocoes", formData).then((result) => {
      if (result.status == 201) {
        alert("Poção adicionada com sucesso ao catálogo.");
        setPocoes([...pocoes, result.data]);
        setFormData({ name: "", description: "", image: "", price: "" }); // limpa
      }
    });
  }

  function deletar(id) {
    axios.delete(`http://localhost:3000/pocoes/${id}`).then((result) => {
      if (result.status == 200) {
        // atualiza tirando o item removido - FILTRA!
        setPocoes((pocoesAntes) => pocoesAntes.filter((p) => p.id !== id));
      }
    });
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Painel de Cadastro Merigold</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-dark p-4 rounded border border-secondary mb-5"
      >
        <div className="mb-3">
          <label>Nome da Poção</label>
          <input
            type="text"
            className="form-control bg-secondary text-light"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Descrição</label>
          <input
            type="text"
            className="form-control bg-secondary text-light"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>URL da Imagem</label>
          <input
            type="text"
            className="form-control bg-secondary text-light"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Preço (moedas)</label>
          <input
            type="number"
            className="form-control bg-secondary text-light"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Cadastrar Poção
        </button>
      </form>

      <h3>Estoque Atual</h3>
      <ul className="list-group mb-5">
        {pocoes.map((pocao) => (
          <li
            key={pocao.id}
            className="list-group-item bg-dark text-light border-secondary d-flex justify-content-between align-items-center"
          >
            <span>
              <strong>{pocao.nome}</strong> - {pocao.preco} moedas
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deletar(pocao.id)}
            >
              <FaTrashAlt /> Remover{" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
