import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/layout.css";
import ListNumber from "../components/ListNumber";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="content">
        <ListNumber />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;