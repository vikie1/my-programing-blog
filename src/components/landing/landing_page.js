import { css } from "@emotion/react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import background from "./software-development.jpg";

export const LandingPage = ({children}) => {
  const getSiteUtils = useStaticQuery(
    graphql`
      query Images {
        java: file(relativePath: { eq: "java-transparent.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 100, height: 200)
          }
        }
        javaScript: file(relativePath: { eq: "javascript-transparent.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 200, height: 200)
          }
        }
        spring: file(relativePath: { eq: "spring-transparent.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 280, height: 200)
          }
        }
        react: file(relativePath: { eq: "react-transparent.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 207, height: 200)
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
          height: 85vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        `}
      >
        <div>
          <h1
            css={css`
              padding-top: 0%;
              margin-top: -7rem;
              padding-left: 30%;
              padding-right: 30%;
              text-align: center;
              font-family: "Cabin Condensed", sans-serif;
              font-size: 4ch;
              font-weight: bolder;
              color: white;
            `}
          >
            Improve your coding skills with our courses and articles
          </h1>
        </div>
        <div
          css={css`
            padding-left: 25%;
            padding-right: 25%;
            text-align: center;
          `}
        >
          <p
            css={css`
              color: white;
              padding-bottom: 2rem;
            `}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            doloremque facilis voluptate voluptates quas, ipsum quia et,
            deserunt laboriosam in corporis beatae nulla totam aliquam
            repudiandae, amet minus obcaecati recusandae.
          </p>
          <a
            href=""
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
          </a>
        </div>
      </div>
      <div
        css={css`
          background-color: blue;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px 0;
        `}
      >
        <GatsbyImage
          image={getImage(getSiteUtils.java)}
          alt="A transparent java logo"
        />
        <GatsbyImage
          image={getImage(getSiteUtils.javaScript)}
          alt="A transparent javascript logo"
        />
        <GatsbyImage
          image={getImage(getSiteUtils.spring)}
          alt="A transparent spring logo"
        />
        <GatsbyImage
          image={getImage(getSiteUtils.react)}
          alt="A transparent react logo"
        />
      </div>
      <div>{children}</div>
    </div>
  );
};
