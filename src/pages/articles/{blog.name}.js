import { graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
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
      <img src={data.blog.img} alt="Blogs hero image" srcset="" loading="lazy" />
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
