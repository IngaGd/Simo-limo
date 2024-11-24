import { Outlet } from "react-router-dom";
import { Header } from "components/Header";
import { WallPaper } from "components/Wallpaper";
import { Footer } from "components/Footer";

export function MainLayout() {
  return (
    <>
      <WallPaper />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
