import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import type { Post, Comment } from "../../types/post";

import {
  fetchComments,
  addComment,
  likePost,
  fetchPostById,
  editPost,
  deletePost,
  editComment,
  deleteComment,
} from "../../api/posts";
import { fetchProfile } from "../../api/profile";

import FollowToggle from "../FollowToggle";

import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

import AvatarImg from "../../assets/images/avatar.webp";

import * as S from "./styles";

const profileCache: Record<string, string> = {};

interface PostItemProps {
  post: Post;
  showAuthorLink?: boolean;
  currentUser?: string;
  onPostUpdated?: (updated: Post) => void;
  onPostDeleted?: (id: number) => void;
}

const PostItem = ({
  post,
  showAuthorLink = true,
  currentUser,
  onPostDeleted,
  onPostUpdated,
}: PostItemProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(post.total_likes || 0);
  const [showAllComments, setShowAllComments] = useState(false);
  const [likedByMe, setLikedByMe] = useState(post.liked_by_me || false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [commentAvatars, setCommentAvatars] = useState<Record<string, string>>(
    {},
  );
  const [editingPost, setEditingPost] = useState(false);
  const [PostNewContent, setPostNewContent] = useState(post.content);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [commentNewContent, setCommentNewContent] = useState("");

  // Função para buscar o avatar
  const fetchAvatar = async (author: string): Promise<string> => {
    if (profileCache[author]) {
      return profileCache[author];
    }
    try {
      const data = await fetchProfile(author);
      const avatarUrl = data.avatar || "";
      profileCache[author] = avatarUrl;
      return avatarUrl;
    } catch (err) {
      console.error("Erro ao buscar avatar:", err);
    }
    return "";
  };

  // Função para buscar os comentários
  useEffect(() => {
    const loadComments = async () => {
      const data = await fetchComments(post.id);
      const commentsData = data.results || data;
      setComments(commentsData);

      commentsData.forEach(async (c: Comment) => {
        const avatarUrl = await fetchAvatar(c.author);
        setCommentAvatars((prev) => ({
          ...prev,
          [c.author]: avatarUrl,
        }));
      });
    };
    loadComments();
  }, [post.id]);

  // Função para buscar o avatar do autor
  useEffect(() => {
    const loadAvatar = async () => {
      const avatarUrl = await fetchAvatar(post.author);
      setAvatar(avatarUrl);
    };
    loadAvatar();
  }, [post.author]);

  const handleLike = async () => {
    try {
      await likePost(post.id);
      const updated = await fetchPostById(post.id);
      setLikes(updated.total_likes);
      setLikedByMe(updated.liked_by_me);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("Você precisa escrever algo antes de comentar");
      return;
    }

    try {
      const data: Comment = await addComment(post.id, newComment);
      setComments((prev) => [...prev, data]);
      const avatarUrl = await fetchAvatar(data.author);
      setCommentAvatars((prev) => ({
        ...prev,
        [data.author]: avatarUrl,
      }));

      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPost = async () => {
    try {
      const updated = await editPost(post.id, PostNewContent);
      setEditingPost(false);
      onPostUpdated?.(updated);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(post.id);
      onPostDeleted?.(post.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = async (commentId: number) => {
    try {
      const updated = await editComment(commentId, commentNewContent);
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, content: updated.content } : c,
        ),
      );
      setEditingCommentId(null);
      setCommentNewContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.log(error);
    }
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, 2);

  console.log("currentUser:", currentUser, "post.author:", post.author);

  return (
    <S.Post>
      {showAuthorLink ? (
        <S.PostAuthorContainer>
          <S.PostAvatar src={avatar || AvatarImg} alt="Avatar do usuario" />
          <Link to={`/profile/${post.author}`}>
            <strong>@{post.author}</strong>
          </Link>
          {currentUser === post.author && (
            <S.UpdatePostContainer>
              <FaEdit
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => setEditingPost(true)}
              />
              <FaTrash
                style={{ cursor: "pointer", color: "red" }}
                onClick={handleDeletePost}
              />
            </S.UpdatePostContainer>
          )}
          {currentUser !== post.author && (
            <FollowToggle username={post.author} />
          )}
        </S.PostAuthorContainer>
      ) : (
        <S.PostAuthorContainer>
          <S.PostAvatar src={avatar || AvatarImg} alt="Avatar do usuario" />
          <strong>@{post.author}</strong>
          {currentUser === post.author && (
            <S.UpdatePostContainer>
              <FaEdit
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => setEditingPost(true)}
              />
              <FaTrash
                style={{ cursor: "pointer", color: "red" }}
                onClick={handleDeletePost}
              />
            </S.UpdatePostContainer>
          )}
        </S.PostAuthorContainer>
      )}
      <div>
        {editingPost ? (
          <S.EditPostContainer>
            <S.EditPostTextArea
              value={PostNewContent}
              onChange={(e) => setPostNewContent(e.target.value)}
            />
            <div>
              <FaSave
                style={{ cursor: "pointer", color: "blue", marginRight: "8px" }}
                onClick={handleEditPost}
              />
              <MdCancel
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => setEditingPost(false)}
              />
            </div>
          </S.EditPostContainer>
        ) : (
          <>
            <p>{post.content}</p>
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{new Date(post.created_at).toLocaleString("pt-BR")}</span>
        <S.Button onClick={handleLike}>
          {likedByMe ? "💔 Descurtir" : "❤️ Curtir"} ({likes})
        </S.Button>
      </div>

      <S.Comments>
        <S.Line />
        {visibleComments.map((c) => (
          <S.CommentAuthorContainer key={c.id}>
            <S.CommentAvatar
              src={commentAvatars[c.author] || AvatarImg}
              alt="Avatar do usuario"
            />
            <Link to={`/profile/${c.author}/`}>
              <strong>@{c.author}:</strong>
            </Link>
            {editingCommentId === c.id ? (
              <>
                <S.EditCommentTextArea
                  value={commentNewContent}
                  onChange={(e) => setCommentNewContent(e.target.value)}
                />
                <S.EditCommentContainer>
                  <FaSave
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => handleEditComment(c.id)}
                  />
                  <MdCancel
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => setEditingCommentId(null)}
                  />
                </S.EditCommentContainer>
              </>
            ) : (
              <S.EditPostContainer>
                <span>{c.content}</span>
                {currentUser === c.author && (
                  <>
                    <FaEdit
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => {
                        setEditingCommentId(c.id);
                        setCommentNewContent(c.content);
                      }}
                    />
                    <FaTrash
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDeleteComment(c.id)}
                    />
                  </>
                )}
              </S.EditPostContainer>
            )}
          </S.CommentAuthorContainer>
        ))}

        {comments.length > 2 && (
          <S.Button
            style={{ margin: "6px 0" }}
            onClick={() => setShowAllComments((prev) => !prev)}
          >
            {showAllComments
              ? "Ver menos"
              : `Ver todos os comentários (${comments.length})`}
          </S.Button>
        )}
      </S.Comments>

      <S.CommentForm onSubmit={handleComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escreva um comentário..."
        />
        <S.Button type="submit">Comentar</S.Button>
      </S.CommentForm>
    </S.Post>
  );
};

export default PostItem;
