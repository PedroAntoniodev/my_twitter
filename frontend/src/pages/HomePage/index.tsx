import { useEffect, useState } from "react";
import * as S from "./styles";
import type { Post } from "../../types/post";
import type { User } from "../../types/user";
import { Link } from "react-router-dom";

import PostItem from "../../components/PostItem";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [feedMode, setFeedMode] = useState<"all" | "following">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);

  // Buscar posts conforme feedMode
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url =
          feedMode === "all"
            ? "https://pedroantoniodev1.pythonanywhere.com/api/posts/"
            : "https://pedroantoniodev1.pythonanywhere.com/api/feed/";

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        if (!response.ok) throw new Error("Erro ao buscar posts");
        const data = await response.json();
        setPosts(data.results || data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [feedMode]);

  // Criar novo post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const response = await fetch(
        "https://pedroantoniodev1.pythonanywhere.com/api/posts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify({ content: newPost }),
        },
      );
      if (!response.ok) throw new Error("Erro ao criar post");
      const created = await response.json();
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
      const response = await fetch(
        `https://pedroantoniodev1.pythonanywhere.com/api/users/?search=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      if (!response.ok) throw new Error("Erro ao buscar usuários");
      const data = await response.json();
      setSearchResults(data.results || data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.HomePageContainer>
      {/* Barra de busca */}
      <S.SearchForm onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar usuários..."
        />
        <button type="submit">🔍</button>
      </S.SearchForm>

      {/* Resultados da busca */}
      {searchResults.length > 0 && (
        <div>
          <h3>Resultados:</h3>
          {searchResults.map((u) => (
            <div key={u.id}>
              <Link to={`/profile/${u.username}`}>@{u.username}</Link>
            </div>
          ))}
        </div>
      )}

      {/* Botões de feed */}

      {/* Formulário de novo post */}
      <S.NewPostForm onSubmit={handleSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="O que você está pensando?"
        />
        <button type="submit">Postar</button>
      </S.NewPostForm>

      {/* Feed */}
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
          <PostItem key={post.id} post={post} showAuthorLink={true} />
        ))}
      </S.Feed>
    </S.HomePageContainer>
  );
};

export default HomePage;
