import { useState, useEffect } from "react";
import type { Post, Comment } from "../../types/post";
import * as S from "./styles";
import { Link } from "react-router-dom";

interface PostItemProps {
  post: Post;
  showAuthorLink?: boolean;
}

const PostItem = ({ post, showAuthorLink = true }: PostItemProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(post.total_likes || 0);
  const [showAllComments, setShowAllComments] = useState(false);
  const [likedByMe, setLikedByMe] = useState(false);

  // Buscar comentários do post
  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(
        `https://pedroantoniodev1.pythonanywhere.com/api/posts/${post.id}/comments/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      const data = await res.json();
      setComments(data.results || data);
    };
    fetchComments();
  }, [post.id]);

  // Dar like
  const handleLike = async () => {
    const response = await fetch(
      `https://pedroantoniodev1.pythonanywhere.com/api/posts/${post.id}/like/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      },
    );

    if (response.ok) {
      setLikedByMe((prev) => !prev);
      setLikes((prev) => (likedByMe ? prev - 1 : prev + 1));
    }
  };

  // Adicionar comentário
  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const res = await fetch(
      `https://pedroantoniodev1.pythonanywhere.com/api/posts/${post.id}/comments/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({ content: newComment }),
      },
    );

    if (res.ok) {
      const data: Comment = await res.json();
      setComments((prev) => [...prev, data]);
      setNewComment("");
    }
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <S.Post>
      {showAuthorLink ? (
        <Link to={`/profile/${post.author}`}>
          <strong>@{post.author}</strong>
        </Link>
      ) : (
        <strong>@{post.author}</strong>
      )}
      <p>{post.content}</p>
      <span>{new Date(post.created_at).toLocaleString("pt-BR")}</span>

      {/* Botão de like */}

      {/* Comentários */}
      <S.Comments>
        <S.Line />
        {visibleComments.map((c) => (
          <div key={c.id}>
            <Link to={`/profile/${c.author}/`}>
              <strong>@{c.author}</strong>: {c.content}
            </Link>
          </div>
        ))}

        {comments.length > 2 && (
          <S.Button
            style={{ margin: "6px 0" }}
            onClick={() => setShowAllComments((prev) => !prev)}
          >
            {" "}
            {showAllComments
              ? "Ver menos"
              : `Ver todos os comentários (${comments.length})`}
          </S.Button>
        )}
      </S.Comments>

      {/* Formulário de comentário */}
      <S.CommentForm onSubmit={handleComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escreva um comentário..."
        />
        <S.Button type="submit">Comentar</S.Button>
        <S.Button onClick={handleLike}>
          {likedByMe ? "💔 Descurtir" : "❤️ Curtir"} ({likes})
        </S.Button>
      </S.CommentForm>
    </S.Post>
  );
};

export default PostItem;
