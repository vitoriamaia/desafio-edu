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
  const [chatMessages, setChatMessages] = useState<{ question: string; answer: string }[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

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
              prompt: `Crie uma pergunta sobre o seguinte tema de filosofia: "${assunto}". O formato da resposta deve ser JSON, e as opções de resposta devem vir dentro de botões. {"question": "Pergunta?", "options": ["A", "B", "C", "D"], "correctAnswer": "A"}.`,
              stream: false,
            }),
          });

          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.statusText}`);
          }

          const data = await response.json();
          return JSON.parse(data.response) as Question;
        } catch (error) {
          console.error("Erro ao buscar pergunta:", error);
          return null;
        }
      });

      const results = await Promise.all(requests);
      setQuestions(results.filter((q) => q !== null) as Question[]);
    } catch (error) {
      console.error("Erro ao buscar perguntas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async () => {
    if (!userMessage.trim()) return;

    setIsTyping(true);
    setChatMessages((prev) => [...prev, { question: userMessage, answer: "..." }]);

    try {
      const response = await fetch(LLAMA_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: LLAMA_MODEL,
          prompt: `Responda de forma objetiva à seguinte pergunta sobre ${assunto}: "${userMessage}".`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.statusText}`);
      }

      const data = await response.json();
      const answerText = data.response || "Erro ao obter resposta.";

      setChatMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1].answer = answerText;
        return updatedMessages;
      });
    } catch (error) {
      console.error("Erro no chatbot:", error);
    } finally {
      setIsTyping(false);
      setUserMessage("");
    }
  };

  const handleSelectAnswer = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  useEffect(() => {
    fetchQuestions();
  }, [assunto]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Perguntas sobre {assunto}</h2>

      {loading ? (
        <p className="text-center text-gray-600">Carregando perguntas...</p>
      ) : questions.length > 0 ? (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
              <p className="font-semibold text-lg mb-2">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((option, idx) => {
                  const isSelected = selectedAnswers[index] === option;
                  const isCorrect = option === q.correctAnswer;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(index, option)}
                      className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition ${
                        selectedAnswers[index] === option
                          ? option.toLowerCase() === q.correctAnswer.toLowerCase()
                            ? "bg-green-500"  
                            : "bg-red-500"     
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Nenhuma pergunta encontrada.</p>
      )}

      <div className="mt-8 p-6 border rounded-lg shadow-lg bg-gray-100">
        <h3 className="text-2xl font-bold mb-4">Chatbot</h3>
        <div className="h-56 overflow-y-auto border p-3 rounded-md bg-white">
          {chatMessages.length > 0 ? (
            chatMessages.map((msg, index) => (
              <div key={index} className="mb-3">
                <div className="text-right">
                  <p className="bg-blue-500 text-white p-2 rounded-lg inline-block">{msg.question}</p>
                </div>
                <div className="mt-1 text-left">
                  <p className="bg-gray-300 p-2 rounded-lg inline-block">{msg.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Faça uma pergunta sobre {assunto}.</p>
          )}
        </div>
        {isTyping && <p className="text-gray-500 text-center mt-2">Pensando...</p>}
        <div className="mt-3 flex">
          <input
            type="text"
            className="border p-2 flex-1 rounded-l-md"
            placeholder="Digite sua pergunta..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            disabled={isTyping}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md"
            onClick={handleChatSubmit}
            disabled={isTyping}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
