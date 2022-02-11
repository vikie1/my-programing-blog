import { css } from "@emotion/react";
import React from "react";
import background from "./software-development.jpg";

export const LandingPage = () => {
  return (
    <div
      css={css`
        background-image: url(${background});
        background-attachment: fixed;
        background-size: cover;
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
              padding-left: 15%;
              padding-right: 15%;
              text-align: center;
              font-family: "Cabin Condensed", sans-serif;
              font-size: 4ch;
              font-weight: bolder;
              color: white;
            `}
          >
            Improve your coding skills
          </h1>
        </div>
        <div
          css={css`
            padding-left: 25%;
            padding-right: 25%;
            text-align: center;
            margin-top: -3rem;
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
    </div>
  );
};
