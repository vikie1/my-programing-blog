import { css } from "@emotion/react";
import { graphql } from "gatsby";
import React from "react";
import { BlogList } from "../../components/blog-list";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { Seo } from "../../components/headSection";

const RoadMapPage = ({ data }) => {
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
        >
          <h1>{data.roadMaps.name}</h1>
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
              Last Edit: {new Date(data.roadMaps.date).toDateString()}
            </span>
          </div>
          <img
            src={data.roadMaps.img + "?fm=webp"}
            css={css`
              max-width: 100%;
            `}
            alt="Roadmap pictorial representation"
            loading="lazy"
          />
          <div
            css={css`
              h1 {
                display: none;
              }
            `}
          >
            <div
              dangerouslySetInnerHTML={{ __html: data.roadMaps.content }}
            ></div>
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
          {data.allBlog.nodes.slice(0, 5).map((blog) => (
            <div
              css={css`
                margin-top: 1rem;
                margin-right: 2rem;
              `}
            >
              <BlogList blog={blog} data={data} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default RoadMapPage;

export const query = graphql`
  query ($id: String) {
    roadMaps(id: { eq: $id }) {
      id
      img
      name
      content
      date
      desc
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
  return (
    <Seo
      pageTitle={data.roadMaps.name}
      siteLocation={location.pathname}
      siteImage={data.roadMaps.img + "?w=348&h=200&fm=webp"}
      description={data.roadMaps.desc}
      pageType={"article"}
    />
  );
};
