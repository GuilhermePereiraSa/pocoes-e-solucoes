import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import MyRoutes from "./routes/MyRoutes.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <MyRoutes />
      </div>
    </Router>
  );
}
