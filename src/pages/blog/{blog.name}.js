import { css } from "@emotion/react";
import { graphql } from "gatsby";
import React, { useRef, useState, useLayoutEffect } from "react";
import { BlogList } from "../../components/blog-list";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { globalVars } from "../../res/globalVars";
import { Seo } from "../../components/headSection";

const BlogPost = ({ data }) => {
  const separator = globalVars("separator");
  const imgAndCredits = data.blog.img.split(separator);
  const image = imgAndCredits[0];
  const credits = imgAndCredits[1];

  const ref = useRef(null);
  const [heroImage, setHeroImage] = useState(null);

  useLayoutEffect(() => {
    setHeroImage(image + "?w=" + ref.current.offsetWidth + "&fm=webp");
  });

  const relatedBlogs = () => {
    const related = [];
    for (const item in data.blog.topics) {
      for (let key = 0; key < data.allBlog.nodes.length; key++) {
        const blogOther = data.allBlog.nodes[key];
        for (let index = 0; index < blogOther.topics.length; index++) {
          if (blogOther.topics[index].id === data.blog.topics[item].id) {
            related.push(blogOther);
          }
        }
      }
    }
    return related.filter(
      (item, index) =>
        related.indexOf(item) === index && item.id !== data.blog.id
    );
  };

  return (
    <div>
      <Header />
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
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen,
              Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", "Nunito", Roboto,
              sans-serif;
          `}
          ref={ref}
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
            src={heroImage}
            css={css`
              max-width: 100%;
            `}
            alt="Blog's hero"
            loading="lazy"
          />
          {credits && (
            <div
              css={css`
                opacity: 0.5;
                text-decoration: underline;
                font-family: "Dosis", sans-serif;
                font-style: italic;
              `}
            >
              Image Credits: {credits}
            </div>
          )}
          <div
            css={css`
              h1 {
                display: none;
              }
            `}
          >
            <div dangerouslySetInnerHTML={{ __html: data.blog.content }}></div>
            {/* <MDXContent /> --This didn't work during gatsby build, using the above div before I figure out how to work with it. I am also not sure of its advantages to the above to spend somuch time on it */}
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
          {
            <>
              {relatedBlogs().map((related) => (
                <div
                  css={css`
                    margin-top: 1rem;
                    margin-right: 2rem;
                  `}
                >
                  <BlogList blog={related} data={data} />
                </div>
              ))}
            </>
          }
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
      desc
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

export const Head = ({ location, data }) => {
  const separator = globalVars("separator");
  const imgAndCredits = data.blog.img.split(separator);
  const image = imgAndCredits[0];
  return (
    <Seo
      pageTitle={data.blog.name}
      description={data.blog.desc}
      pageType={"article"}
      siteImage={image + "?w=348&h=200&fm=webp"}
      siteLocation={location.pathname}
    />
  );
};
