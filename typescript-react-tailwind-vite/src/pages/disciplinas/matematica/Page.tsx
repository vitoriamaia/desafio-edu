import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Matematica: FC = () => {
  const navigate = useNavigate();

  
  const assuntosFundamental = ["Números Inteiros", "Frações", "Geometria", "Equações", "Funções"];
  const assuntosMedio = ["Trigonometria", "Geometria Analítica", "Cálculo", "Estatística", "Probabilidade"];

  const handleStart = (assunto: string) => {
    console.log(`Assunto selecionado: ${assunto}`);
    navigate("/disciplinas/matematica/Learning", { state: { assunto } });
  };
  const handleQStart = (assunto: string) => {
    console.log(`Assunto selecionado: ${assunto}`);
    navigate("/disciplinas/matematica/Questions", { state: { assunto } });
  };

  return (
    <div className="p-4">
      <h4 className="text-xl font-semibold mb-2">Ensino Fundamental</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {assuntosFundamental.map((assunto, index) => (
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
  );
};

export default Matematica;
