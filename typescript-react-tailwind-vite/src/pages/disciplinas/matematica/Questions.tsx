import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Questions: FC = () => {
  const location = useLocation();
  const { assunto } = location.state as { assunto: string };
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const LLAMA_API_URL = "http://localhost:11434/api/generate";
  const LLAMA_MODEL = "mistral";

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const requests = Array.from({ length: 2 }, async () => {
        try {
          const response = await fetch(LLAMA_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: LLAMA_MODEL,
              prompt: `Crie uma pergunta sobre o seguinte tema de matematica: "${assunto}". O formato da resposta deve ser JSON: {"question": "Pergunta?", "options": ["A", "B", "C", "D"], "correctAnswer": "A"}.`,
              stream: false,
            }),
          });

          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.statusText}`);
          }

          const data = await response.json();
          console.log("Resposta do Llama:", data.response);
          return JSON.parse(data.response) as Question;
        } catch (error) {
          console.error("Erro ao buscar ou processar pergunta:", error);
          return null;
        }
      });

      const results = await Promise.all(requests);
      setQuestions(results.filter((q) => q !== null) as Question[]);
    } catch (error) {
      console.error("Erro inesperado ao buscar perguntas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [assunto]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Perguntas sobre {assunto}</h2>
      {loading ? (
        <p>Carregando perguntas...</p>
      ) : questions.length > 0 ? (
        <ul className="list-disc pl-5">
          {questions.map((q, index) => (
            <li key={index} className="mb-4">
              <strong>{q.question}</strong>
              <ul className="list-none pl-2">
                {q.options.map((option, idx) => (
                  <li key={idx}>• {option}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>Não foi possível carregar perguntas.</p>
      )}
    </div>
  );
};

export default Questions;