// src/api/posts.ts
const API_URL = "https://pedroantoniodev1.pythonanywhere.com/api";

// Buscar posts
export const fetchPosts = async (feedMode: "all" | "following") => {
  const url = feedMode === "all" ? `${API_URL}/posts/` : `${API_URL}/feed/`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao buscar posts");
  return res.json();
};

// Criar post
export const createPost = async (content: string) => {
  const res = await fetch(`${API_URL}/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("Erro ao criar post");
  return res.json();
};

// Buscar comentários
export const fetchComments = async (postId: number) => {
  const res = await fetch(`${API_URL}/posts/${postId}/comments/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao buscar comentários");
  return res.json();
};

// Adicionar comentário
export const addComment = async (postId: number, content: string) => {
  const res = await fetch(`${API_URL}/posts/${postId}/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Erro ao adicionar comentário");
  return res.json();
};

// Curtir post
export const likePost = async (postId: number) => {
  const res = await fetch(`${API_URL}/posts/${postId}/like/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao curtir post");
  return res.json();
};

// Busca post pelo id
export const fetchPostById = async (postId: number) => {
  const res = await fetch(`${API_URL}/posts/${postId}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao buscar post");
  return res.json();
};

// Editar post
export const editPost = async (postId: number, content: string) => {
  const res = await fetch(`${API_URL}/posts/${postId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Erro ao editar post");
  return res.json();
};

// Deletar post
export const deletePost = async (postId: number) => {
  const res = await fetch(`${API_URL}/posts/${postId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao deletar post");
  return true;
};

// editar comentario

export const editComment = async (commentId: number, content: string) => {
  const res = await fetch(`${API_URL}/posts/comments/${commentId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Erro ao editar comentário");
  return res.json();
};

// deletar comentário

export const deleteComment = async (commentId: number) => {
  const res = await fetch(`${API_URL}/posts/comments/${commentId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao deletar post");
  return true;
};
