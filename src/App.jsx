import { Routes, Route, Link } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import QuizMode from "./pages/QuizMode";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import History from "./pages/History";

export default function App() {
  return (
    <QuizProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="modos" element={<QuizMode />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="resultado" element={<Result />} />
          <Route path="resultados-anteriores" element={<History />} />
          <Route path="sobre" element={<About />} />
          <Route path="privacidade" element={<Privacy />} />
          <Route path="contato" element={<Contact />} />
          <Route
            path="*"
            element={
              <div className="container page-section">
                <h1>Página não encontrada</h1>
                <Link className="button primary" to="/">
                  Voltar ao início
                </Link>
              </div>
            }
          />
        </Route>
      </Routes>
    </QuizProvider>
  );
}
