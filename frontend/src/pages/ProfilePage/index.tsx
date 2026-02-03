import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { User } from "../../types/user";
import type { Post } from "../../types/post";
import AvatarImg from "../../assets/images/avatar.webp";
import * as S from "./styles";
import PostItem from "../../components/PostItem";

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
  const [posts, setPosts] = useState<Post[]>([]);

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

        // Buscar todos os posts e filtrar no frontend
        const postsRes = await fetch(
          "https://pedroantoniodev1.pythonanywhere.com/api/posts/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          },
        );
        const postsData = await postsRes.json();
        const allPosts = postsData.results || postsData;

        // Filtrar apenas os posts do usuário visitado
        const userPosts = allPosts.filter((p: Post) => p.author === username);
        setPosts(userPosts);
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
    <>
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
      </S.ProfileContainer>
      <S.PostsContainer>
        <h3>Posts de @{username}</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem key={post.id} post={post} showAuthorLink={false} />
          ))
        ) : (
          <p>Este usuário ainda não postou nada.</p>
        )}
      </S.PostsContainer>
    </>
  );
};

export default ProfilePage;
