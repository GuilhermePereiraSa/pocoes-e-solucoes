export default function PocaoCard(props) {
  return (
    <div className="potion-card">
      {props.image ? (
        <img src={props.image} alt={props.name} className="p-img" />
      ) : (
        <div className="p-img-placeholder">Sem Imagem</div>
      )}

      <h3>{props.name}</h3>
      <p>{props.description}</p>
      <p>
        <strong>Valor:</strong> {props.price} moedas de ouro
      </p>

      <button className="btn btn-primary mt-2">Comprar</button>
    </div>
  );
}
