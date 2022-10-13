import "antd/dist/antd.min.css";
import ContainerPage from "./layout/containerPage";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import RoutesPages from "./routes";

function App() {
  return (
    <>
      <Header />
      <ContainerPage>
        <RoutesPages />
        <Footer />
      </ContainerPage>
    </>
  );
}

export default App;
