import { FC } from "react";
import { FaChevronDown } from "react-icons/fa";

interface LayoutSidebarProps {
  showSubjects: boolean;
  handleShowSubjects: () => void;
  navigate: (path: string) => void; 
  handleLogout: () => void;
}

const LayoutSidebar: FC<LayoutSidebarProps> = ({ showSubjects, handleShowSubjects, navigate, handleLogout }) => {
  return (
    <div style={{ 
      width: "220px", 
      backgroundColor: "#1E3A8A", 
      color: "white", 
      padding: "20px", 
      transition: "height 0.3s", 
      height: "100vh" 
    }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ margin: "12px 0" }}>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>Cronograma</a>
        </li>

        <li 
          style={{ 
            margin: "12px 0", 
            display: "flex", 
            alignItems: "center", 
            cursor: "pointer" 
          }} 
          onClick={handleShowSubjects}
        >
          <span style={{ marginRight: "8px" }}>Disciplinas</span>
          <FaChevronDown size={12} />
        </li>

        {showSubjects && (
          <ul style={{ 
            listStyle: "none", 
            paddingLeft: "15px", 
            fontSize: "14px" 
          }}>
            <li style={{ margin: "5px 0", paddingLeft: "10px" }}><a onClick={() => navigate('/disciplinas/matematica')} style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>Matemática</a></li>
            <li style={{ margin: "5px 0", paddingLeft: "10px" }}>
              <a onClick={() => navigate('/disciplinas/biologia')} style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>Biologia</a>
            </li>
            <li style={{ margin: "5px 0", paddingLeft: "10px" }}>
              <a onClick={() => navigate('/disciplinas/fisica')} style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>Física</a>
            </li>
            <li style={{ margin: "5px 0", paddingLeft: "10px" }}>
              <a onClick={() => navigate('/disciplinas/historia')} style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>História</a>
            </li>
            <li style={{ margin: "5px 0", paddingLeft: "10px" }}>
              <a onClick={() => navigate('/disciplinas/sociologia')} style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>Sociologia</a>
            </li>
            <li style={{ margin: "5px 0", paddingLeft: "10px" }}>
              <a onClick={() => navigate('/disciplinas/quimica')} style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>Química</a>
            </li>
            <li style={{ margin: "5px 0", paddingLeft: "10px" }}>
              <a onClick={() => navigate('/disciplinas/geografia')} style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>Geografia</a>
            </li>
            <li style={{ margin: "5px 0", paddingLeft: "10px" }}>
              <a onClick={() => navigate('/disciplinas/filosofia')} style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>Filosofia</a>
            </li>
          </ul>
        )}

        <li style={{ margin: "12px 0" }}>
          <button 
            onClick={handleLogout} 
            style={{ 
              color: "white", 
              textDecoration: "none", 
              background: "none", 
              border: "none", 
              cursor: "pointer",
              padding: 0
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LayoutSidebar;
