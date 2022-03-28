import { css } from "@emotion/react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import React, { useState } from "react";

export const Header = ({ pageTitle }) => {
  /** required variables */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const getMetadata = useStaticQuery(
    graphql`
      query MetaDataQuery {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
        file(relativePath: { eq: "gatsby-icon.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 70, height: 70)
          }
        }
      }
    `
  );
  const logo = getImage(getMetadata.file);

  /** css styles */
  const hamburgerMenu = css`
    cursor: pointer;
    @media (min-width: 640px) {
      display: none;
    }
  `;

  /** JavaScript functions */
  const handleHumburgerToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div className="">
      <title>
        {pageTitle} | {getMetadata.site.siteMetadata.title}
      </title>
      <header
        css={css`
          display: flex;
          justify-content: space-between;
          @media (min-width: 640px) {
            background-color: whitesmoke;
          }
        `}
      >
        <div>
          <Link to="/">
            <GatsbyImage image={logo} alt="The website logo" />
          </Link>
        </div>
        <nav
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-right: 2rem;
            justify-content: center;
            @media (min-width: 640px) {
              width: 45%;
              flex-direction: row;
              justify-content: flex-end;
              padding-right: 0;
            }
          `}
        >
          <div
            role="button"
            onClick={handleHumburgerToggle}
            css={hamburgerMenu}
          >
            {isMenuOpen ? (
              <StaticImage src="menu-close.svg" alt="close menu" />
            ) : (
              <StaticImage src="menu.svg" alt="open menu" />
            )}
          </div>
          {isMenuOpen ? (
            <MenuItems display="none" displaySM="block" />
          ) : (
            <MenuItems display="none" />
          )}
          <MenuItems displaySM="none" />
        </nav>
      </header>
    </div>
  );
};

export const MenuItems = ({ display, displaySM }) => {
  const hoverUnderline = css`
    text-decoration: none;
    color: grey;
    :hover {
      text-decoration: underline;
    }
  `;
  return (
    <ul
      css={css`
        list-style: none;
        width: 100%;
        display: ${display ? display : "flex"};
        justify-content: space-around;
        @media (max-width: 640px) {
          display: ${displaySM ? displaySM : "none"};
          align-self: flex-end;
        }
      `}
    >
      <li>
        <Link to="/" css={hoverUnderline}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/courses/" css={hoverUnderline}>
          Courses
        </Link>
      </li>
      <li>
        <Link to="/blog/" css={hoverUnderline}>
          Blog
        </Link>
      </li>
      <li>
        <Link to="/about/" css={hoverUnderline}>
          About
        </Link>
      </li>
    </ul>
  );
};
