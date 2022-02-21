import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { Header } from "../../components/header/header";
import { compileMDXFunction, useMDXFunction } from "../../lib/mdx";

const BlogPost = ({ data }) => {
  const mdxContents = compileMDXFunction(data.blog.content);
  const MDXContent = useMDXFunction(mdxContents.value);
  return (
    <div className="">
      <Header pageTitle={data.blog.name}/>
      <h1>{data.blog.name}</h1>
      <GatsbyImage image={data.blog.img} alt="Hero image" />
      <MDXContent />
    </div>
  );
};
export default BlogPost;

export const query = graphql`
  query ($id: String) {
    blog(id: { eq: $id }) {
      img
      name
      topics
      content
    }
  }
`;
