import { useState, useEffect } from "react";
import axios from "axios";
import PocaoCard from "../components/PocaoCard.jsx";

export default function Home() {
  const [pocoes, setPocoes] = useState([]);

  useEffect(() => {
    async function carregarPocoes() {
      try {
        const response = await axios.get("http://localhost:3333/pocoes");
        if (response.status == 200) {
          setPocoes(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar poções da Merigold, ", error);
      }
    }

    carregarPocoes();
  }, []);

  return (
    <div className="container mt-4">
      <header className="mb-5 text-center">
        <h1>Poções e Soluções</h1>
        <p>A magia do Becoda Última Saída, tradição desde 1867.</p>
      </header>

      <h2>Nosso Catálogo</h2>
      <div className="catalog-grid d-flex flex-wrap gap-4 mt-4">
        {pocoes.map(function (pocao) {
          return (
            <PocaoCard
              key={pocao.id}
              nome={pocao.nome}
              descricao={pocao.descricao}
              imagem={pocao.imagem}
              preco={pocao.preco}
            />
          );
        })}
      </div>

      <footer className="mt-5 text-center p-3 border-top border-secondary">
        <p>Contato: merigold@beco.com | Beco da Última Saída</p>
      </footer>
    </div>
  );
}
