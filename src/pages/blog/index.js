import { css } from "@emotion/react";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { BlogCard } from "../../components/blog-card";
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
          topics{
            id
            name
          }
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
  return (
    <main>
      <Header pageTitle="Read Blog Articles" />
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={css`
            width: 85%;
            display: grid;
            place-content: center;
            padding: 3rem 0;
            @media (min-width: 768px) {
              grid-template-columns: 1fr 1fr;
              gap: 2rem;
            }
            @media (min-width: 1024px) {
              grid-template-columns: 1fr 1fr 1fr;
              gap: 2rem;
            }
          `}
        >
          {data.allBlog.nodes.map((blog) => (
            <BlogCard blog={blog} data={data}/>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ArticlesPage;
