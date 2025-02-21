import { LayoutSidebar } from "@/widgets";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Sociologia: FC = () => {
    const [cookies, removeCookie] = useCookies(['jwt']);
    const [showSubjects, setShowSubjects] = useState(false);
    
  
  const navigate = useNavigate();

  
  const assuntosFundamental = ["Cultura", "Estratificação Social", "Instituições Sociais", "Movimentos Sociais", "Identidade"];

  const assuntosMedio = ["Teorias Sociológicas", "Globalização", "Cidadania", "Diversidade Cultural", "Desigualdade Social"];

  const handleStart = (assunto: string) => {
    console.log(`Assunto selecionado: ${assunto}`);
    navigate("/disciplinas/sociologia/Learning", { state: { assunto } });
  };
  const handleQStart = (assunto: string) => {
    console.log(`Assunto selecionado: ${assunto}`);
    navigate("/disciplinas/sociologia/Questions", { state: { assunto } });
  };
  const handleShowSubjects = () => {
    setShowSubjects(!showSubjects);
  };
  const handleLogout = () => {
    removeCookie('jwt', { path: '/' });
    navigate('/Authentication/login');
  };
  useEffect(() => {
    if (!cookies.jwt) {
      navigate('/Authentication/login');
    }
  }, [cookies, navigate]);

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
          <h4 className="text-xl font-semibold mb-2">Ensino Fundamental</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {assuntosFundamental.map((assunto, index) => (
              <div key={index} className="p-4 border rounded shadow">
                <p>{assunto}</p>
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 bg-purple-500 text-white text-sm rounded" onClick={() => handleStart(assunto)}>
                    Começar
                  </button>
                  <button className="px-3 py-1 bg-purple-500 text-white text-sm rounded" onClick={() => handleQStart(assunto)}>
                    Questões
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h4 className="text-xl font-semibold mb-2">Ensino Médio</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assuntosMedio.map((assunto, index) => (
              <div key={index} className="p-4 border rounded shadow">
                <p>{assunto}</p>
                <button className="mt-2 px-2 py-1 bg-purple-500 text-white text-sm rounded" onClick={() => handleStart(assunto)}>
                  Começar
                </button>
                <button className="mt-2 px-2 py-1 bg-purple-500 text-white text-sm rounded" onClick={() => handleQStart(assunto)}>
                  Questoes
                </button>
              </div>
            ))}
          </div>  
        </div>
      </div>
    </div>
  );
};

export default Sociologia;
