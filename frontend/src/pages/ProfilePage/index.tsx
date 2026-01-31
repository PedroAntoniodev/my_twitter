import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { User } from "../../types/user";
import type { Post } from "../../types/post"; // 👈 reaproveitando o type Post
import AvatarImg from "../../assets/images/avatar.webp";
import * as S from "./styles";

interface Profile {
  user: number;
  display_name: string;
  avatar: string | null;
  bio: string;
}

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]); // 👈 usando o type Post

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar dados básicos do usuário
        const userRes = await fetch(
          `https://pedroantoniodev1.pythonanywhere.com/api/users/?search=${username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          },
        );
        const userData = await userRes.json();
        const foundUser = (userData.results || userData)[0];
        setUser(foundUser);

        // Buscar dados do perfil
        const profileRes = await fetch(
          `https://pedroantoniodev1.pythonanywhere.com/api/profile/${username}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          },
        );
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Buscar posts do usuário pelo id
        if (profileData.user) {
          const postsRes = await fetch(
            `https://pedroantoniodev1.pythonanywhere.com/api/posts/?user=${profileData.user}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            },
          );
          const postsData = await postsRes.json();
          setPosts(postsData.results || postsData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  const displayName = profile?.display_name?.trim()
    ? profile.display_name
    : "@" + user?.username;

  return (
    <S.ProfileContainer>
      <img src={profile?.avatar || AvatarImg} alt="Foto de perfil" />
      <S.InfoContent>
        <h2>{displayName}</h2>
        <S.FollowButton>Seguir</S.FollowButton>
      </S.InfoContent>
      <S.InfoContent>
        <S.FollowersCount>
          1 <S.FollowersInfo>Seguidores</S.FollowersInfo>
        </S.FollowersCount>
        <S.FollowersCount>
          15 <S.FollowersInfo>Seguindo</S.FollowersInfo>
        </S.FollowersCount>
      </S.InfoContent>
      <S.Bio>{profile?.bio || "Sem bio ainda"}</S.Bio>

      {/* Posts do usuário */}
      <h3>Posts</h3>
      {posts.length > 0 ? (
        posts.map((post) => (
          <S.PostsContainer key={post.id}>
            <p>{post.content}</p>
            <span>{new Date(post.created_at).toLocaleString("pt-BR")}</span>
          </S.PostsContainer>
        ))
      ) : (
        <p>Este usuário ainda não postou nada.</p>
      )}
    </S.ProfileContainer>
  );
};

export default ProfilePage;
