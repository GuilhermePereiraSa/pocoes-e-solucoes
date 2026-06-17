export default function PocaoCard(props) {
  return (
    <div className="potion-card">
      <div className="p-img-container">
        {props.imagem ? (
          <img src={props.imagem} alt={props.nome} className="p-img" />
        ) : (
          <div className="p-img-placeholder">Sem Imagem</div>
        )}
      </div>

      <div className="potion-card-body">
        <h4 className="mb-3">{props.nome}</h4>
        <p className="mb-4">{props.descricao}</p>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span>Preço:</span>
          <span className="potion-price">{props.preco} moedas</span>
        </div>

        <button className="btn-magico">Adquirir</button>
      </div>
    </div>
  );
}
