import Footer from "../components/Footer";
import Header from "../components/Header";
import MainEvent from "../components/MainEvent";
import "../styles/layout.css";
export const ListagemEventos = () => {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <MainEvent />
      </div>
      <Footer />
    </div>
  );
};

export default ListagemEventos;