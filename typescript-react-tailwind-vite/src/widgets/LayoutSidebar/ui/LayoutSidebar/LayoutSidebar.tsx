import { FC } from "react";

interface LayoutSidebarProps {
  showSubjects: boolean;
  handleShowSubjects: () => void;
  navigate: (path: string) => void;
  handleLogout: () => void;
}

const LayoutSidebar: FC<LayoutSidebarProps> = ({ showSubjects, handleShowSubjects, navigate, handleLogout }) => {
  return (
    <div style={{ width: "200px", backgroundColor: "#1E3A8A", color: "white", padding: "20px", transition: "height 0.3s", height: showSubjects ? "auto" : "100vh" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ margin: "10px 0" }}>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>Cronograma</a>
        </li>
        <li style={{ margin: "10px 0" }}>
          <a href="#" onClick={handleShowSubjects} style={{ color: "white", textDecoration: "none" }}>Disciplinas</a>
        </li>
        {showSubjects && (
          <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
            <li style={{ margin: "5px 0" }}>Matemática</li>
            <li style={{ margin: "5px 0" }}><a onClick={() => navigate('/disciplinas/biologia')}>Biologia</a></li>
            <li style={{ margin: "5px 0" }}><a onClick={() => navigate('/disciplinas/fisica')}>Fisica</a></li>
            <li style={{ margin: "5px 0" }}><a onClick={() => navigate('/disciplinas/matematica')}>Matematica</a></li>
            <li style={{ margin: "5px 0" }}><a onClick={() => navigate('/disciplinas/historia')}>Historia</a></li>
            <li style={{ margin: "5px 0" }}><a onClick={() => navigate('/disciplinas/sociologia')}>Sociologia</a></li>
            <li style={{ margin: "5px 0" }}><a onClick={() => navigate('/disciplinas/quimica')}>Quimica</a></li>
            <li style={{ margin: "5px 0" }}><a onClick={() => navigate('/disciplinas/geografia')}>Geografia</a></li>
            <li style={{ margin: "5px 0" }}><a onClick={() => navigate('/disciplinas/filosofia')}>Filosofia</a></li>
          </ul>
        )}
        <li style={{ margin: "10px 0" }}>
          <button onClick={handleLogout} style={{ color: "white", textDecoration: "none", background: "none", border: "none", cursor: "pointer" }}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LayoutSidebar;
