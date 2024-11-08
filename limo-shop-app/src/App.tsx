import "./styles/main.scss";

function App() {
  return (
    <div className="wallpaper">
      <div className="straps">
        {[...Array(6)].map((_, index) => (
          <div className="strap" key={index}></div>
        ))}
      </div>
    </div>
  );
}

export default App;
