import { useEffect, useState } from "react";
import type React from "react";

import Header from "../../components/Header";
import * as S from "./styles";
import type { Post } from "../../types/post";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://pedroantoniodev1.pythonanywhere.com/api/posts/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          },
        );
        if (!response.ok) throw new Error("Erro ao buscar posts");
        const data = await response.json();
        console.log("Posts da API:", data);
        setPosts(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const [newPost, setNewPost] = useState("");

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

  const handleLike = async (id: number) => {
    try {
      const response = await fetch(
        `https://pedroantoniodev1.pythonanywhere.com/api/posts/${id}/like/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      if (!response.ok) throw new Error("Erro ao dar like");

      const data = await response.json();

      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, likedByMe: data.liked, total_likes: data.total_likes }
            : p,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async (id: number, comment: string) => {
    try {
      const response = await fetch(
        `https://pedroantoniodev1.pythonanywhere.com/api/posts/${id}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify({ content: comment }),
        },
      );
      if (!response.ok) throw new Error("Erro ao comentar");
      const newComment = await response.json();
      console.log("comentario criado:", newComment);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                comments: [...(p.comments || []), newComment],
                total_comments: p.total_comments + 1,
              }
            : p,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async (postId: number) => {
    try {
      const resoponse = await fetch(
        `https://pedroantoniodev1.pythonanywhere.com/api/posts/${postId}/comments/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      if (!resoponse.ok) throw new Error("Erro ao buscar comentários");
      const data = await resoponse.json();

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments: data.results } : p,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.HomePageContainer>
      <Header />
      <S.NewPostForm onSubmit={handleSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="O que você está pensando?"
        />
        <button type="submit">Postar</button>
      </S.NewPostForm>

      <S.Feed>
        {posts.map((post) => (
          <S.Post key={post.id}>
            <strong>@{post.author}</strong>
            <p>{post.content}</p>
            <span>{new Date(post.created_at).toLocaleString("pt-BR")}</span>

            <S.Actions>
              <button onClick={() => handleLike(post.id)}>
                {post.likedByMe ? "👎" : "👍"} {post.total_likes}
              </button>
            </S.Actions>

            <S.Comments>
              <strong>{post.total_comments} comentários</strong>
              <button onClick={() => fetchComments(post.id)}>
                Ver comentários
              </button>
              {post.comments &&
                post.comments.map((c) => (
                  <div key={c.id}>
                    <strong>@{c.author}</strong> {c.content}
                  </div>
                ))}
              <S.CommentForm
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.elements.namedItem(
                    "comment",
                  ) as HTMLInputElement;
                  if (input.value.trim()) {
                    handleComment(post.id, input.value);
                    input.value = "";
                  }
                }}
              >
                <input name="comment" placeholder="Adicione um comentário" />
                <button type="submit">Comentar</button>
              </S.CommentForm>
            </S.Comments>
          </S.Post>
        ))}
      </S.Feed>
    </S.HomePageContainer>
  );
};

export default HomePage;
