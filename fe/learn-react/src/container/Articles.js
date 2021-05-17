import React, { useState } from "react";
import Article from "../components/Article/Article";
import AddArticle from "../components/AddArticle/AddArticle";

const Articles = () => {
  const [articles, setArticles] = useState([
    { id: 1, title: "post 1", body: "Quisque cursus, metus vitae pharetra" },
    { id: 2, title: "post 2", body: "Quisque cursus, metus vitae pharetra" },
  ]);
  const saveArticle = (e) => {
    e.preventDefault();
    // 逻辑代码稍后更新
  };

  return (
    <div>
      <AddArticle saveArticle={saveArticle} />
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
};

export default Articles;
