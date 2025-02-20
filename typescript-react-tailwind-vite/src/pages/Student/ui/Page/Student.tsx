import "@/pages/Student/ui/Page/Student.css";
import LayoutSidebar from "@/widgets/LayoutSidebar/ui/LayoutSidebar/LayoutSidebar";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

// 🔹 Tipagem dos erros do formulário
interface FormErrors {
  title?: string;
  description?: string;
  dateRange?: string;
}

const Student: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cookies, removeCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();
  const [showSubjects, setShowSubjects] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/Authentication/login");
    }
  }, [cookies, navigate]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (content: string) => {
    setDescription(content);
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "O título é obrigatório.";
    }

    if (!description.trim()) {
      newErrors.description = "A descrição é obrigatória.";
    }

    if (!dateRange[0] || !dateRange[1]) {
      newErrors.dateRange = "Selecione um intervalo de datas.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Título:", title);
    console.log("Descrição:", description);
    console.log("Data de início:", dateRange[0]?.toLocaleDateString());
    console.log("Data de fim:", dateRange[1]?.toLocaleDateString());

    // Aqui você pode chamar a API para salvar os dados
  };

  return (
    <section style={{ display: "flex", minHeight: "100vh" }}>
      <LayoutSidebar
        showSubjects={showSubjects}
        handleShowSubjects={() => setShowSubjects(!showSubjects)}
        navigate={navigate}
        handleLogout={() => {
          removeCookie("jwt", { path: "/" });
          navigate("/Authentication/login");
        }}
      />

      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Cronograma</h1>
        <h2 className="text-xl font-semibold mb-4">📌 Adicionar cronograma</h2>

        <section className="bg-white p-6 rounded-lg shadow-lg flex flex-col w-full max-w-4xl mx-auto mb-8">
          <h2 className="text-xl font-semibold mb-4">📋 Tarefas</h2>

          <form onSubmit={handleSubmit}>
            <div className="relative">
              <DatePicker
                selected={dateRange[0]}
                onChange={handleDateChange}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                selectsRange
                className="mb-4 p-4 border rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-12"
                dateFormat="dd/MM/yyyy"
                dateFormatCalendar="MM/YYYY"
                placeholderText="Date - Date"
                minDate={new Date("2022-01-01")}
              />
              <FaCalendarAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {errors.dateRange && <p className="text-red-500 text-sm mt-1">{errors.dateRange}</p>}

            <input
              type="text"
              name="title"
              className="mb-4 p-4 border rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={handleTitleChange}
              placeholder="Título"
            />

            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

            {/* Editor de Texto com ReactQuill */}
            <div className="editor">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={handleDescriptionChange}
                modules={modules}
                formats={formats}
                placeholder="Descreva a tarefa..."
              />
            </div>

            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}

            <button className="btn-primary btn w-full mt-4 p-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-200">
              Adicionar
            </button>
          </form>
        </section>
      </div>
    </section>
  );
};

// 🔹 Módulos do Quill (Toolbar)
const modules: object = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

// 🔹 Formatos Permitidos no Quill
const formats: string[] = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "align",
  "color",
  "background",
  "link",
  "image",
  "video",
];

export default Student;
