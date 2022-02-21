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
      allSitePage {
        nodes {
          pageContext
          path
        }
      }
    }
  `);
  const getBlogUrl = (id) => {
    const blogUrl = data.allSitePage.nodes.find((blog) => {
      if (blog.pageContext.id) {
        return blog.pageContext.id === "" + id;
      }
    });
    console.log(blogUrl);
    return blogUrl.path;
  };
  return (
    <main>
      <Header pageTitle="Read Articles" />
      {data.allBlog.nodes.map((blog) => (
        <article key={blog.id}>
          <h2>
            <Link to={getBlogUrl(blog.id)}>{blog.name}</Link>
          </h2>
          <p>{blog.description}</p>
        </article>
      ))}
    </main>
  );
};

export default ArticlesPage;
