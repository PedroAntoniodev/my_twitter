import { useState } from "react";
import type React from "react";

import Header from "../../components/Header";
import * as S from "./styles";
import type { Post } from "../../types/post";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "Pedro",
      content: "Olá mundo! primeiro post MyTwitter",
      createdAt: new Date(),
      likes: 0,
      comments: [],
    },
    {
      id: 2,
      user: "Laura",
      content: "Aprendendo muito com esse projeto 😎",
      createdAt: new Date(),
      likes: 0,
      comments: [],
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: posts.length + 1,
      user: "meuUsuarioTeste",
      content: newPost,
      createdAt: new Date(),
      likes: 0,
      comments: [],
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (id: number) => {
    setPosts(
      posts.map((p) => {
        if (p.id !== id) return p;

        if (p.likedByMe) {
          return { ...p, likes: p.likes - 1, likedByMe: false };
        } else {
          return { ...p, likes: p.likes + 1, likedByMe: true };
        }
      }),
    );
  };

  const handleComment = (id: number, comment: string) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: p.comments.length + 1,
                  user: "meuUsuarioTeste",
                  text: comment,
                  createdAt: new Date(),
                },
              ],
            }
          : p,
      ),
    );
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
            <strong>@{post.user}</strong>
            <p>{post.content}</p>
            <span>{post.createdAt.toLocaleString()}</span>

            <S.Actions>
              <button onClick={() => handleLike(post.id)}>
                {post.likedByMe ? "👎" : "👍"} {post.likes}
              </button>
            </S.Actions>

            <S.Comments>
              {post.comments.map((c) => (
                <div key={c.id}>
                  <strong>@{c.user}</strong> {c.text}
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
