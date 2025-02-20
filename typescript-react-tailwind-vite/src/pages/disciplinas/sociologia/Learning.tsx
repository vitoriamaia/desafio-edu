import { LayoutSidebar } from "@/widgets";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const Learning: FC = () => {
  const [cookies, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();
  const [showSubjects, setShowSubjects] = useState(false);
  const location = useLocation();
  const { assunto } = location.state as { assunto: string };
  const [resumo, setResumo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const LLAMA_API_URL = "http://localhost:11434/api/generate";
  const LLAMA_MODEL = "mistral";

  const fetchResumo = async () => {
    setLoading(true);
    try {
      const response = await fetch(LLAMA_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: LLAMA_MODEL,
          prompt: `Resuma o seguinte tema de sociologia em um parágrafo simples: ${assunto}`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Resumo gerado pelo Llama:", data.response);
      setResumo(data.response);
    } catch (error) {
      console.error("Erro ao gerar resumo:", error);
      setResumo("Não foi possível carregar o resumo no momento.");
    } finally {
      setLoading(false);
    }
  };
  const handleShowSubjects = () => {
    setShowSubjects(!showSubjects);
  };
  const handleLogout = () => {
    removeCookie('jwt', { path: '/' });
    navigate('/Authentication/login');
  };

  useEffect(() => {
    fetchResumo();
    if (!cookies.jwt) {
      navigate('/Authentication/login');
    }
  },[assunto]);
  

  return (
    <div style={{ display: "flex" }}>
      <LayoutSidebar
        showSubjects={showSubjects}
        handleShowSubjects={handleShowSubjects}
        navigate={navigate}
        handleLogout={handleLogout}
      />
      <div style={{ flex: 1, padding: "20px" }}>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Assunto: {assunto}</h1>
          {loading ? <p>Gerando resumo...</p> : <p>{resumo}</p>}
        </div>
      </div>
    </div>
  );
};

export default Learning;
