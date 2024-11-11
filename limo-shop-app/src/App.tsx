import Header from "./common/components/Header";
import WallPaper from "./common/components/Wallpaper";
import Home from "./pages/home/Home";
import "./styles/main.scss";

function App() {
  return (
    <>
      <WallPaper />
      <Header />
      <Home />
    </>
  );
}

export default App;
