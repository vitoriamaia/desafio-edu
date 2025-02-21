import LayoutSidebar from "@/widgets/LayoutSidebar/ui/LayoutSidebar/LayoutSidebar"; // Importe o LayoutSidebar
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const Learning: FC = () => {
  const location = useLocation();
  const [cookies, removeCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();
  const [showSubjects, setShowSubjects] = useState<boolean>(false);
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
          prompt: `Resuma o seguinte tema de fisica em um parágrafo simples: ${assunto}`,
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

  useEffect(() => {
    fetchResumo();
  }, [assunto]);

  return (
    <section style={{ display: "flex", minHeight: "100vh" }}>
      <LayoutSidebar
        showSubjects={showSubjects} 
        handleShowSubjects={() => setShowSubjects(!showSubjects)}
        navigate={() => { navigate }}
        handleLogout={() => {
          removeCookie("jwt", { path: "/" });
          navigate("/Authentication/login");
        }}
      />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-3xl mx-auto rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <h1 className="text-3xl font-semibold text-white text-center">
               {assunto}
            </h1>
          </div>
          
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center mt-4">
                <svg
                  className="animate-spin h-10 w-10 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="none"
                    strokeWidth="4"
                    d="M4 12a8 8 0 0116 0"
                  ></path>
                </svg>
                <p className="ml-4 text-gray-600">Gerando resumo...</p>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-gray-700 text-lg leading-relaxed">{resumo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Learning;
