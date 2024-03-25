import { css } from "@emotion/react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import background from "./software-development.jpg";

export const LandingPage = ({ children }) => {
  const getSiteUtils = useStaticQuery(
    graphql`
      query Images {
        java: file(relativePath: { eq: "java-alt.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 80, height: 100)
          }
        }
        javaScript: file(relativePath: { eq: "javascript-transparent.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 100, height: 100)
          }
        }
        spring: file(relativePath: { eq: "spring-transparent.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 140, height: 100)
          }
        }
        react: file(relativePath: { eq: "react-transparent.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 103, height: 100)
          }
        }
      }
    `
  );
  return (
    <div
      css={css`
        background-color: grey;
        background-image: url(${background});
        background-attachment: fixed;
        background-size: cover;
        background-blend-mode: color-burn;
        padding: 0%;
      `}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Cabin+Condensed:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <div
        css={css`
          @media (min-width: 640px) {
            height: 85vh;
            flex-direction: column;
            display: flex;
            justify-content: center;
          }
        `}
      >
        <div>
          <h1
            css={css`
              padding-top: 0%;
              margin-top: 0rem;
              text-align: center;
              font-size: 3.7ch;
              font-family: "Cabin Condensed", sans-serif;
              font-weight: bolder;
              color: white;
              @media (min-width: 640px) {
                margin-top: -7rem;
                padding-left: 30%;
                padding-right: 30%;
                font-size: 4ch;
              }
            `}
          >
            Improve your coding skills with our courses and articles
          </h1>
        </div>
        <div
          css={css`
            text-align: center;
            padding: 0 5%;
            @media (min-width: 640px) {
              padding-left: 25%;
              padding-right: 25%;
            }
            @media (max-width: 640px) {
              padding-bottom: 2rem;
            }
          `}
        >
          <p
            css={css`
              color: white;
              padding-bottom: 2rem;
            `}
          >
            This website contains courses that will get you from zero to a full
            stack developer. There are also great blogs that explains concepts ,
            keeps you up to date and broadens your knowledge as a full stack web
            developer.
          </p>
          <Link
            to="/blog"
            css={css`
              text-decoration: none;
              color: white;
              background-color: #204dcc;
              padding: 10px;
              border-radius: 3px;
              transition: 0.17s ease;
              :hover {
                background-color: #222222;
              }
            `}
          >
            Get Started
          </Link>
        </div>
      </div>
      <div
        css={css`
          background-color: darkcyan;
          padding: 40px 0;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            @media (min-width: 640px) {
              margin: 0 20%;
            }
          `}
        >
          <GatsbyImage
            image={getImage(getSiteUtils.java)}
            alt="A transparent java logo"
          />
          <GatsbyImage
            image={getImage(getSiteUtils.javaScript)}
            alt="A transparent javascript logo"
            css={css`
              @media (max-width: 440px) {
                display: none;
              }
            `}
          />
          <GatsbyImage
            image={getImage(getSiteUtils.react)}
            alt="A transparent react logo"
          />
          <GatsbyImage
            image={getImage(getSiteUtils.spring)}
            alt="A transparent spring logo"
          />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
