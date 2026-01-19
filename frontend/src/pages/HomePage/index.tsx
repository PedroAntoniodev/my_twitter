import { useState } from "react";
import type React from "react";

import Header from "../../components/Header";

import * as S from "./styles";

interface Post {
  id: number;
  user: string;
  content: string;
  created_at: Date;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "Pedro",
      content: "Olá mundo! primeiro post MyTwitter",
      created_at: new Date(),
    },
    {
      id: 2,
      user: "Laura",
      content: "Aprendendo muito com esse projeto 😎",
      created_at: new Date(),
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: posts.length + 1,
      user: "meuUsuarioTeste",
      content: newPost,
      created_at: new Date(),
    };

    setPosts([...posts, post]);
    setNewPost("");
  };

  return (
    <S.HomePageContainer>
      <Header />
      <S.NewPostForm onSubmit={HandleSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="O que você esta pensando?"
        />
        <button type="submit">Postar</button>
      </S.NewPostForm>
      <S.Feed>
        {posts.map((post) => (
          <S.Post key={post.id}>
            <strong>@{post.user}</strong>
            <p>{post.content}</p>
            <span>{post.created_at.toLocaleString()}</span>
          </S.Post>
        ))}
      </S.Feed>
    </S.HomePageContainer>
  );
};

export default HomePage;
