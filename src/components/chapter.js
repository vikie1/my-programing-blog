import { css } from "@emotion/react";
import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { Head } from "./headSection";

const Chapters = (props, { location }) => {
  const data = props.pageContext.data;
  const pages = useStaticQuery(graphql`
    query {
      allSitePage {
        nodes {
          pageContext
          path
        }
      }
    }
  `);
  const navigate = (id) => {
    const resource = pages.allSitePage.nodes.find((page) => {
      if (page.pageContext.id) {
        return page.pageContext.id === "" + id;
      }
    });
    return resource.path;
  };
  return (
    <div>
      <Head
        pageTitle={data.chapter}
        description={data.chapter}
        siteLocation={location}
        pageType={"article"}
        siteImage={data.img}
      />
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
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
          `}
        >
          <h1>{data.course}</h1>
          <h2>{data.chapter}</h2>
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
              Last Edit: {new Date(data.date).toDateString()}
            </span>
          </div>
          <div
            css={css`
              h1 {
                display: none;
              }
            `}
          >
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </div>
          <div>
            {data.prev && (
              <Link
                to={navigate(data.prev)}
                css={css`
                  margin-right: 5px;
                `}
              >
                Previous
              </Link>
            )}
            {data.next && <Link to={navigate(data.next)}>Next</Link>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Chapters;
