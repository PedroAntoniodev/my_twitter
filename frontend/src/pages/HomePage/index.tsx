import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Post } from "../../types/post";
import type { User } from "../../types/user";

import { fetchPosts, createPost } from "../../api/posts";
import { searchUsers, fetchCurrentUser } from "../../api/users";

import PostItem from "../../components/PostItem";

import * as S from "./styles";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [feedMode, setFeedMode] = useState<"all" | "following">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Buscar posts
    const LoadPosts = async () => {
      try {
        const data = await fetchPosts(feedMode);
        setPosts(data.results || data);
      } catch (error) {
        console.error(error);
      }
    };
    LoadPosts();
  }, [feedMode]);

  // Buscar usuário logado
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

  // Criar novo post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const created = await createPost(newPost);
      setPosts([created, ...posts]);
      setNewPost("");
    } catch (error) {
      console.error(error);
    }
  };

  // Buscar usuários
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const data = await searchUsers(searchTerm);
      setSearchResults(data.results || data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.HomePageContainer>
      <S.SearchForm onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={async (e) => {
            const value = e.target.value;
            setSearchTerm(value);

            if (value.trim()) {
              try {
                const data = await searchUsers(value);
                setSearchResults(data.results || data);
              } catch (error) {
                console.error(error);
              }
            } else {
              setSearchResults([]);
            }
          }}
          placeholder="Buscar usuários..."
        />
        <span className="icon">🔍</span>
        {searchResults.length > 0 && (
          <S.SearchResults>
            {searchResults.map((u) => (
              <S.SearchResultItem key={u.id}>
                <Link to={`/profile/${u.username}`}>@{u.username}</Link>
              </S.SearchResultItem>
            ))}
          </S.SearchResults>
        )}
      </S.SearchForm>

      <S.NewPostForm onSubmit={handleSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="O que você está pensando?"
        />
        <S.PostButton type="submit">Postar</S.PostButton>
      </S.NewPostForm>

      <S.Tabs>
        <S.FeedButton
          className={feedMode === "all" ? "active" : ""}
          onClick={() => setFeedMode("all")}
        >
          Para você
        </S.FeedButton>
        <S.FeedButton
          className={feedMode === "following" ? "active" : ""}
          onClick={() => setFeedMode("following")}
        >
          Seguindo
        </S.FeedButton>
      </S.Tabs>
      <S.Feed>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            showAuthorLink={true}
            currentUser={currentUser?.username}
            onPostUpdated={(updated) =>
              setPosts(posts.map((p) => (p.id === updated.id ? updated : p)))
            }
            onPostDeleted={(id) => setPosts(posts.filter((p) => p.id !== id))}
          />
        ))}
      </S.Feed>
    </S.HomePageContainer>
  );
};

export default HomePage;
