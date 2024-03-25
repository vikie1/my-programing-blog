import { css } from "@emotion/react";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { BlogCard } from "../../components/blog-card";
import { Header } from "../../components/header/header";
import { Seo } from "../../components/headSection";
const ArticlesPage = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allBlog {
        nodes {
          desc
          img
          id
          name
          topics {
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
      <Header />
      <h1
          css={css`
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 500;
            font-size: 3.05733em;
            line-height: 1;
            text-align: center;
          `}
        >
          Blog Articles
        </h1>
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
            gap: 2rem;
            @media (min-width: 768px) {
              grid-template-columns: 1fr 1fr;
            }
            @media (min-width: 1024px) {
              grid-template-columns: 1fr 1fr 1fr;
            }
          `}
        >
          {data.allBlog.nodes.map((blog) => (
            <BlogCard blog={blog} data={data} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ArticlesPage;

export const Head = () => (
  <Seo
    pageTitle="Read Blog Articles"
    description={
      "Access blogs discussing important aspects of tech that will help bolster your knowledge and cultivate best practices."
    }
    siteLocation={"/blog/"}
  />
);
