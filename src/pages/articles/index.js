import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { Header } from "../../components/header/header";

const ArticlesPage = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allBlog {
        nodes {
          desc
          img
          id
          name
          topics
        }
      }
    }
  `);
  return (
    <main>
      <Header pageTitle="Read Articles" />
      {data.allBlog.nodes.map((blog) => (
        <article key={blog.id}>
          <h2>
            <Link to={`/articles/${blog.name}`}>{blog.name}</Link>
          </h2>
          <p>{blog.description}</p>
        </article>
      ))}
      {console.log(data.allBlog)}
    </main>
  );
};

export default ArticlesPage;
