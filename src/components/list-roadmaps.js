import { css } from "@emotion/react";
import { graphql, useStaticQuery } from "gatsby";
import { BlogCard } from "./blog-card";
import React from "react";

export const ListRoadMaps = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allRoadMaps {
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
      {data.allRoadMaps.nodes.map((roadmap) => (
        <BlogCard blog={roadmap} data={data} />
      ))}
    </div>
  );
};
