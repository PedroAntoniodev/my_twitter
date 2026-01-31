import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import type { User } from "../../types/user";

import * as S from "./styles";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://pedroantoniodev1.pythonanywhere.com/api/auth/me/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <S.MainLayoutContainer>
      <S.SideBarContainer>
        <Sidebar user={user} />
      </S.SideBarContainer>
      <S.MainLayoutContent>{children}</S.MainLayoutContent>
    </S.MainLayoutContainer>
  );
};

export default MainLayout;
