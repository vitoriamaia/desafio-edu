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
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, string>>(new Map());

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
              prompt: `Crie uma pergunta sobre o seguinte tema de quimica: "${assunto}". O formato da resposta deve ser JSON: {"question": "Pergunta?", "options": ["A", "B", "C", "D"], "correctAnswer": "A"}.`,
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

  const handleOptionClick = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => new Map(prev).set(questionIndex, option));
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
          {questions.map((q, questionIndex) => {
            const selectedAnswer = selectedAnswers.get(questionIndex);
            return (
              <li key={questionIndex} className="mb-4">
                <strong>{q.question}</strong>
                <div className="mt-2 space-y-2">
                  {q.options.map((option, idx) => {
                    const isCorrect = selectedAnswer === option && option === q.correctAnswer;
                    const isIncorrect = selectedAnswer === option && option !== q.correctAnswer;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(questionIndex, option)}
                        className={`w-full py-2 px-4 rounded border ${
                          isCorrect ? "bg-green-500 text-white" : isIncorrect ? "bg-red-500 text-white" : "bg-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Não foi possível carregar perguntas.</p>
      )}
    </div>
  );
};

export default Questions;
