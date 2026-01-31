import { Link } from "react-router-dom";
import * as S from "./styles";
import type { User } from "../../types/user";

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
        <Link to="/home">🏠 Home</Link>
        {user && <Link to={`/profile/${user.username}`}>👤 Perfil</Link>}
        {user && <Link to={`/profile/update`}>✏️ Editar perfil</Link>}
      </nav>
    </S.SidebarContainer>
  );
};

export default Sidebar;
