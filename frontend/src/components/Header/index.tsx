import { Link } from "react-router-dom";
import { HeaderContainer } from "./styles";

const Header = () => {
  return (
    <HeaderContainer>
      <h1>
        <strong>My</strong>Twitter
      </h1>
      <Link to="/profile/:username">
        <button>Perfil</button>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
