import { css } from "@emotion/react";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { ContactForm } from "../contact-form";

export const Footer = () => {
  const socialLinks = css`
    padding-left: 7px;
    font-weight: lighter;
    opacity: 0.5;
  `;
  const linkContainers = css`
    color: white;
    padding: 10px 0;
    display: flex;
    align-items: center;
  `;
  return (
    <div
      css={css`
        background-color: #20222d;
      `}
    >
      <div
        css={css`
          padding-bottom: 3rem;
          display: grid;
          @media (min-width: 640px) {
            padding-bottom: 0;
            grid-template-columns: 1.5fr 2fr;
            min-height: 300px;
          }
        `}
      >
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Cabin+Condensed:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </head>
        <div
          css={css`
            padding-left: 25%;
            @media (max-width: 640px) {
              padding-left: 0;
              place-self: center;
            }
          `}
        >
          <p
            css={css`
              color: whitesmoke;
              font-family: "Cabin Condensed", sans-serif;
              font-weight: bold;
              font-size: x-large;
            `}
          >
            Lets connect
          </p>
          <a
            css={linkContainers}
            href="https://twitter.com/_victormwangi"
            rel="noreferrer"
            target="_blank"
          >
            <StaticImage
              src="tl.svg"
              alt="twitter icon"
              height={30}
              width={30}
            />
            <span css={socialLinks}>Twitter: @_victormwangi</span>
          </a>
          <a
            css={linkContainers}
            href="https://www.polywork.com/vmwangi"
            rel="noreferrer"
            target="_blank"
          >
            <StaticImage
              src="polywork.svg"
              alt="polywork icon"
              height={30}
              width={30}
            />
            <span css={socialLinks}>Polywork: @vmwangi</span>
          </a>
          <a css={linkContainers} href="mailto:mwangivictor52@gmail.com">
            <StaticImage
              src="gmail.svg"
              alt="gmail icon"
              height={30}
              width={30}
            />
            <span css={socialLinks}>Email: mwangivictor52@gmail.com</span>
          </a>
        </div>
        <div
          css={css`
            padding: 0 20%;
            @media (max-width: 640px) {
              padding: 0;
              place-self: center;
            }
          `}
        >
          <p
            css={css`
              color: whitesmoke;
              font-family: "Cabin Condensed", sans-serif;
              font-weight: bold;
              font-size: x-large;
            `}
          >
            Contact form
          </p>
          <ContactForm />
        </div>
      </div>
      <div
        css={css`
          color: wheat;
          opacity: 50%;
          font-size: small;
          text-align: center;
        `}
      >
        Copyright © 2022{" "}
        <a
          href="/"
          css={css`
            color: blue;
          `}
        >
          Learn From Victor
        </a>{" "}
        | Created By{" "}
        <a
          href="https://victormwangi.netlify.app/"
          css={css`
            color: blue;
          `}
          target="_blank"
          rel="noreferrer"
        >
          Victor Mwangi
        </a>
      </div>
    </div>
  );
};
