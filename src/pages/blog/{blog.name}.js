import { css } from "@emotion/react";
import { graphql } from "gatsby";
import React from "react";
import { BlogList } from "../../components/blog-list";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { compileMDXFunction, useMDXFunction } from "../../lib/mdx";

const BlogPost = ({ data }) => {
  const mdxContents = compileMDXFunction(data.blog.content);
  const MDXContent = useMDXFunction(mdxContents.value);
  return (
    <div>
      <Header pageTitle={data.blog.name} />
      <div
        css={css`
          width: 100vw;
          @media (min-width: 1024px) {
            display: flex;
            justify-content: space-between;
          }
          padding-bottom: 1rem;
        `}
      >
        <div
          css={css`
            width: 90%;
            margin: 0 auto;
            @media (min-width: 1024px) {
              width: 50%;
              margin: 0 5rem;
            }
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
          `}
        >
          <h1>{data.blog.name}</h1>
          <div
            css={css`
              padding-bottom: 0.2rem;
            `}
          >
            <span
              css={css`
                opacity: 0.5;
                text-decoration: underline;
                font-family: "Dosis", sans-serif;
                font-style: italic;
              `}
            >
              Last Edit: {new Date(data.blog.date).toDateString()}
            </span>
          </div>
          <img
            src={data.blog.img}
            css={css`
              max-width: 100%;
            `}
            alt="Blogs hero"
            loading="lazy"
          />
          <div
            css={css`
              h1 {
                display: none;
              }
            `}
          >
            <MDXContent />
          </div>
        </div>
        <div
          css={css`
            padding-left: 1rem;
          `}
        >
          <div>
            <h2
              css={css`
                font-family: "Nunito", sans-serif;
              `}
            >
              Related:{" "}
            </h2>
          </div>
          {data.allBlog.nodes
            .filter((related) => {
              return related.topics.some((topic) => {
                for (const key in data.blog.topics) {
                  return data.blog.topics[key].id === topic.id;
                }
              });
            })
            .slice(0, 5)
            .map((blog) => (
              <div
                css={css`
                  margin-top: 1rem;
                  margin-right: 2rem;
                `}
              >
                {/*to negate this, currently needed only for layout */}{blog.id === data.blog.id && (
                  <BlogList blog={blog} data={data} />
                )}
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default BlogPost;

export const query = graphql`
  query ($id: String) {
    blog(id: { eq: $id }) {
      id
      img
      name
      content
      date
      topics {
        id
        name
      }
    }
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
`;
