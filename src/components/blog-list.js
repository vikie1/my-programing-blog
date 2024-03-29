import { Link } from "gatsby";
import React from "react";
import { css } from "@emotion/react";
import { globalVars } from "../res/globalVars";

export const BlogList = ({ blog, data }) => {
  const getBlogUrl = (id) => {
    const blogUrl = data.allSitePage.nodes.find((blog) => {
      if (blog.pageContext.id) {
        return blog.pageContext.id === "" + id;
      }
    });
    return blogUrl.path;
  };

  const separator = globalVars("separator");
  const imgAndCredits = blog.img.split(separator);
  const image = imgAndCredits[0];

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
          display: flex;
          :hover {
            h2 {
              color: blue;
              text-decoration: underline;
            }
          }
          align-items: center;
          font-size: 0;
        `}
      >
        <span>
          <img
            src={image+ "?h=70&w=70&fm=webp"}
            loading="lazy"
            alt="Blogs preview"
            width={70}
            height={70}
          />
        </span>
        <span
          css={css`
            max-width: 280px;
          `}
        >
          <h2
            css={css`
              font-size: medium;
              font-family: "Nunito", sans-serif;
              margin: 0;
              padding: 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            {blog.name}
          </h2>
          <p
            css={css`
              font-size: small;
              font-family: "Karla", sans-serif;
              margin: 0%;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2; /* number of lines to show */
              line-height: X; /* fallback */
              max-height: X * 2;
            `}
          >
            {blog.desc}
          </p>
          <div
            css={css`
              font-family: "Dosis", sans-serif;
              font-weight: lighter;
              font-size: small;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            tags:
            {blog.topics.map((topic, index) => (
              <>
                {index > 0 ? "," : ""}
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
        </span>
      </Link>
    </article>
  );
};
