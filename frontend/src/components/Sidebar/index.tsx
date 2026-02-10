import { Link } from "react-router-dom";

import type { User } from "../../types/user";

import { FaUserCircle, FaEdit, FaHome } from "react-icons/fa";

import * as S from "./styles";

interface SidebarProps {
  user: User | null;
}

const Sidebar = ({ user }: SidebarProps) => {
  return (
    <S.SidebarContainer>
      <h2>
        <strong>My</strong>Twitter
      </h2>

      <nav>
        <Link to="/home">
          <FaHome
            style={{
              cursor: "pointer",
              color: "#2980b9",
              marginRight: "8px",
            }}
          />
          Home
        </Link>
        {user && (
          <S.SidebarContent>
            <Link to={`/profile/${user.username}`}>
              <FaUserCircle
                style={{
                  cursor: "pointer",
                  color: "#4a90e2",
                  marginRight: "8px",
                }}
              />
              My Perfil
            </Link>
          </S.SidebarContent>
        )}
        {user && (
          <S.SidebarContent>
            <Link to={`/profile/update`}>
              <FaEdit
                style={{
                  cursor: "pointer",
                  color: "#f39c12",
                  marginRight: "8px",
                }}
              />
              Editar perfil
            </Link>
          </S.SidebarContent>
        )}
      </nav>
    </S.SidebarContainer>
  );
};

export default Sidebar;
