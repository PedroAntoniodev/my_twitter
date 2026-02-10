import { useState, useEffect } from "react";

import { checkFollowStatus, toggleFollow } from "../../api/follow";

import * as S from "./styles";

interface FollowToggleProps {
  username: string;
}

const FollowToggle = ({ username }: FollowToggleProps) => {
  const [followedByMe, setFollowedByMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const data = await checkFollowStatus(username);
        setFollowedByMe(data.followed_by_me);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };
    loadStatus();
  }, [username]);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleFollow(username);
      setFollowedByMe(!followedByMe);
    } catch (error) {
      console.error("Erro ao seguir ou deixar de seguir:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.FollowButton onClick={handleToggle} disabled={loading}>
      {followedByMe ? "Deixar de seguir" : "Seguir"}
    </S.FollowButton>
  );
};

export default FollowToggle;
