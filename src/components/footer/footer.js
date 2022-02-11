import { css } from "@emotion/react";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { ContactForm } from "../contact-form";

export const Footer = () => {
    const socialLinks = css`
    text-decoration: none;
    color: white;
    padding-left: 7px;
    font-weight: lighter;
    opacity: 0.5;
    `;
    const linkContainers = css`
    padding: 10px 0;
    display: flex;
    align-items: center;
    `;
  return (
    <div
      css={css`
        background-color: #20222d;
        height: 300px;
        display: grid;
        grid-template-columns: 1.5fr 2fr;
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
        <div css={linkContainers}>
          <StaticImage src="tl.svg" alt="twitter icon" height={30} width={30} />
          <a css={socialLinks} href="https://twitter.com/_victormwangi">
            Twitter: @_victormwangi
          </a>
        </div>
        <div css={linkContainers}>
          <StaticImage
            src="polywork.svg"
            alt="polywork icon"
            height={30}
            width={30}
          />
          <a css={socialLinks} href="https://www.polywork.com/vmwangi">Polywork: @vmwangi</a>
        </div>
        <div css={linkContainers}>
          <StaticImage
            src="gmail.svg"
            alt="gmail icon"
            height={30}
            width={30}
          />
          <a css={socialLinks} href="mailto:mwangivictor52@gmail.com">
            Email: mwangivictor52@gmail.com
          </a>
        </div>
      </div>
      <div
        css={css`
          padding: 0 20%;
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
  );
};
