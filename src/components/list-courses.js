import { css } from "@emotion/react";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { BlogCard } from "./blog-card";

export const ListCourses = () => {
  const query = useStaticQuery(graphql`
    query {
      allCourse {
        nodes {
          desc
          id
          img
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
    <div
      css={css`
        display: grid;
        place-content: center;
        gap: 2rem;
        @media (min-width: 768px) {
          grid-template-columns: 1fr 1fr;
        }
        @media (min-width: 1024px) {
          grid-template-columns: 1fr 1fr 1fr;
        }
      `}
    >
      {query.allCourse.nodes.map((blog) => (
        <BlogCard blog={blog} data={query} />
      ))}
    </div>
  );
};
