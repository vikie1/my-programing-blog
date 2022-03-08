import { css } from "@emotion/react";
import { graphql } from "gatsby";
import React from "react";
import { Header } from "../../components/header/header";
import { compileMDXFunction, useMDXFunction } from "../../lib/mdx";

const BlogPost = ({ data }) => {
  const mdxContents = compileMDXFunction(data.blog.content);
  const MDXContent = useMDXFunction(mdxContents.value);
  return (
    <div className="">
      <Header pageTitle={data.blog.name} />
      <div
        css={
          css`
            width: 90%;
            @media (min-width: 640px) {
              width: 50%;
            }
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
          `
        }
      >
        <h1>{data.blog.name}</h1>
        <img src={data.blog.img} css={css`max-width: 100%;`} alt="Blogs hero" loading="lazy" />
        <MDXContent />
      </div>
    </div>
  );
};
export default BlogPost;

export const query = graphql`
  query ($id: String) {
    blog(id: { eq: $id }) {
      img
      name
      content
    }
  }
`;
