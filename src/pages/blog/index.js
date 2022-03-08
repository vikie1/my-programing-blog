import { css } from "@emotion/react";
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
  const getBlogUrl = (id) => {
    const blogUrl = data.allSitePage.nodes.find((blog) => {
      if (blog.pageContext.id) {
        return blog.pageContext.id === "" + id;
      }
    });
    return blogUrl.path;
  };
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
            <article
              key={blog.id}
              css={css`
                width: 350px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition: 0.3s;
                :hover {
                  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
                }
              `}
            >
              <Link
                to={getBlogUrl(blog.id)}
                css={css`
                  text-decoration: none;
                  color: black;
                `}
              >
                <span>
                  <img
                    src={blog.img}
                    alt="Blogs preview"
                    width={348}
                    height={200}
                  />
                </span>
                <span>
                  <div>
                    <h2
                      css={css`
                        font-size: larger;
                        font-family: "Nunito", sans-serif;
                        margin: 0%;
                        padding: 0.5rem 1px;
                      `}
                    >
                      {blog.name}
                    </h2>
                    <p
                      css={css`
                        font-size: medium;
                        font-family: "Karla", sans-serif;
                        margin: 0%;
                      `}
                    >
                      {blog.desc}
                    </p>
                    <div
                      css={css`
                        font-family: "Dosis", sans-serif;
                        font-weight: bold;
                        padding: 2px 0;
                      `}
                    >
                      topics:
                      {blog.topics.map((topic, index) => (
                        <span
                          key={index}
                          css={css`
                            padding: 5px;
                          `}
                        >
                          {topic.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ArticlesPage;
