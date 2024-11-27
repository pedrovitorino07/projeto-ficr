import "../styles/MainContent.css";
import Demanda from "../assets/demanda.png";
import Text from "../assets/pctext.png";
import { Link } from 'react-router-dom';

function MainContent() {
  return (
    <div className="Main">
      <h2>Bem Vindo ao Communication</h2>
      <div className="carrossel">
        <a href="http://localhost:3000/listagemEvents">
          <div className="elementos">
            <img src={Text} alt="Text" />
            Listar Eventos
          </div>
        </a>

        <a href="http://localhost:3000/RegisterEvent">
          <div className="elementos">
            <img src={Demanda} alt="Demanda" />
            Criar Evento
          </div>
        </a>
      </div>
      <Link to="/RegisterEvent">
      <button className="botao">COMUNICADO</button>
      </Link>
    </div >
  );
}

export default MainContent;
