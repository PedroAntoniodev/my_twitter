import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchCurrentUser } from "../../api/users";

import type { User } from "../../types/user";

import Sidebar from "../../components/Sidebar";

import { FaUserCircle, FaEdit, FaHome, FaSearch } from "react-icons/fa";

import * as S from "./styles";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const LoadUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    LoadUser();
  }, []);

  return (
    <S.MainLayoutContainer>
      <S.SideBarContainer>
        <Sidebar user={user} />
      </S.SideBarContainer>
      <S.MainLayoutContent>{children}</S.MainLayoutContent>

      <S.BottomBar>
        <Link to="/home">
          <FaHome style={{ color: "#2980b9" }} />
        </Link>
        {user && (
          <Link to={`/profile/${user.username}`}>
            <FaUserCircle style={{ color: "#4a90e2" }} />
          </Link>
        )}
        {user && (
          <Link to={`/profile/update`}>
            <FaEdit style={{ color: "#f39c12" }} />
          </Link>
        )}
        <Link to="/home">
          <FaSearch style={{ color: "#4a90e2" }} />
        </Link>
      </S.BottomBar>
    </S.MainLayoutContainer>
  );
};

export default MainLayout;
