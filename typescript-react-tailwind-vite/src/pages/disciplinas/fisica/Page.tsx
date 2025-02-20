import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Fisica: FC = () => {
  const navigate = useNavigate();

  
  const assuntosFundamental = ["Movimento", "Força", "Energia", "Ondas", "Eletricidade"];
  const assuntosMedio = ["Cinemática", "Dinâmica", "Termodinâmica", "Eletromagnetismo", "Óptica"];

  const handleStart = (assunto: string) => {
    console.log(`Assunto selecionado: ${assunto}`);
    navigate("/disciplinas/fisica/Learning", { state: { assunto } });
  };
  const handleQStart = (assunto: string) => {
    console.log(`Assunto selecionado: ${assunto}`);
    navigate("/disciplinas/fisica/Questions", { state: { assunto } });
  };

  return (
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

      
    </div>
  );
};

export default Fisica;
