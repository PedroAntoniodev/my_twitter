import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import type { User } from "../../types/user";
import type { Post } from "../../types/post";

import {
  fetchUserByUsername,
  fetchProfile,
  fetchFollowers,
  fetchFollowing,
} from "../../api/profile";
import { fetchPosts } from "../../api/posts";

import PostItem from "../../components/PostItem";
import FollowToggle from "../../components/FollowToggle";

import AvatarImg from "../../assets/images/avatar.webp";

import * as S from "./styles";
import { fetchCurrentUser } from "../../api/users";

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
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const LoadData = async () => {
      try {
        // Buscar dados básicos do usuário
        if (!username) return;

        const userData = await fetchUserByUsername(username);
        const foundUser = (userData.results || userData)[0];
        setUser(foundUser);

        // Buscar dados do perfil
        const profileData = await fetchProfile(username);
        setProfile(profileData);

        // Buscar todos os posts e filtrar no frontend
        const postsData = await fetchPosts("all");
        const allPosts = postsData.results || postsData;

        // Filtrar apenas os posts do usuário visitado
        const userPosts = allPosts.filter((p: Post) => p.author === username);
        setPosts(userPosts);

        // Buscar seguidores
        const followersData = await fetchFollowers(username);
        setFollowersCount(followersData.followers?.length ?? 0);

        // Buscar seguindo
        const followingData = await fetchFollowing(username);
        setFollowingCount(followingData.following?.length ?? 0);
      } catch (error) {
        console.error(error);
      }
    };

    if (username) {
      LoadData();
    }
  }, [username]);

  useEffect(() => {
    const LoadUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setCurrentUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    LoadUser();
  }, []);

  const displayName = profile?.display_name?.trim()
    ? profile.display_name
    : "@" + user?.username;

  return (
    <>
      <S.ProfileContainer>
        <img src={profile?.avatar || AvatarImg} alt="Foto de perfil" />
        <S.InfoContent>
          <h2>{displayName}</h2>
          <FollowToggle username={username!} />
        </S.InfoContent>
        <S.InfoContent>
          <S.FollowersCount>
            {followersCount} <S.FollowersInfo>Seguidores</S.FollowersInfo>
          </S.FollowersCount>
          <S.FollowersCount>
            {followingCount} <S.FollowersInfo>Seguindo</S.FollowersInfo>
          </S.FollowersCount>
        </S.InfoContent>
        <S.Bio>{profile?.bio || "Sem bio ainda"}</S.Bio>
      </S.ProfileContainer>
      <S.PostsContainer>
        <h3>Posts de @{username}</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              showAuthorLink={false}
              currentUser={currentUser?.username}
            />
          ))
        ) : (
          <p>Este usuário ainda não postou nada.</p>
        )}
      </S.PostsContainer>
    </>
  );
};

export default ProfilePage;
