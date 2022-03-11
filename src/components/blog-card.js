import { Link } from "gatsby";
import React from "react";
import { css } from "@emotion/react";

export const BlogCard = ({ blog, data }) => {
  const getBlogUrl = (id) => {
    const blogUrl = data.allSitePage.nodes.find((blog) => {
      if (blog.pageContext.id) {
        return blog.pageContext.id === "" + id;
      }
    });
    return blogUrl.path;
  };

  return (
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
          <img src={blog.img} loading='lazy' alt="Blogs preview" width={348} height={200} />
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
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              `}
            >
              topics discussed:
              {blog.topics.map((topic, index) => (
                <>{index>0 ? ',' : ''}
                <span
                  key={index}
                  css={css`
                    padding-left: 5px;
                  `}
                >
                  {topic.name}
                </span>
                </>
              ))}
            </div>
          </div>
        </span>
      </Link>
    </article>
  );
};
