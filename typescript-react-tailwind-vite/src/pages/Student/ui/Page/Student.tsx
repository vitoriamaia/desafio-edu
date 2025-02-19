import LayoutSidebar from "@/widgets/LayoutSidebar/ui/LayoutSidebar/LayoutSidebar";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Student: React.FC = () => {
  const [title, setTitle] = useState('');
  const [cookies, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();
  const [showSubjects, setShowSubjects] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (!cookies.jwt) {
      navigate('/Authentication/login');
    }
  }, [cookies, navigate]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleLogout = () => {
    removeCookie('jwt', { path: '/' });
    navigate('/Authentication/login');
  };

  const handleShowSubjects = () => {
    setShowSubjects(!showSubjects);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTask();
  };

  return (
    <div style={{ display: "flex" }}>
      <LayoutSidebar
        showSubjects={showSubjects}
        handleShowSubjects={handleShowSubjects}
        navigate={navigate}
        handleLogout={handleLogout}
      />
      <div style={{ flex: 1, padding: "20px" }}>
        <h1 style={{ fontSize: "2.5em", fontWeight: "bold", marginBottom: "20px" }}>Cronograma</h1>
        <h2>📌 Adicionar cronograma</h2>
        <section className="bg-white p-6 rounded-lg shadow-lg flex w-3/4 max-w-4xl">
          <div className="box-element-line w-1/2 p-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                className="text-input mb-2 p-2 border rounded w-full"
                value={title}
                onChange={handleTitleChange}
                placeholder="Titulo"
              />
              <button className="btn-primary btn w-full mt-4" type="submit">
                Adicionar
              </button>
            </form>
          </div>
        </section>
        <section>
          <h2>📋 Tarefas</h2>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nova tarefa"
          />
          <button onClick={addTask}>Adicionar Tarefa</button>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.text}
                </span>
                <button onClick={() => removeTask(task.id)}>Remover</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Student;

