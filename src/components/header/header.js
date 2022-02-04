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
        file(relativePath: { eq: "logo.png" }) {
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
            @media (min-width: 640px) {
              width: 45%;
              flex-direction: row;
              align-items: center;
              justify-content: flex-end;
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
  const styles = {
    link: {
      textDecoration: "none",
      color: "grey",
    },
  };
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
        <Link to="/" style={styles.link}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/courses" style={styles.link}>
          Courses
        </Link>
      </li>
      <li>
        <Link to="/articles" style={styles.link}>
          Articles
        </Link>
      </li>
      <li>
        <Link to="/about" style={styles.link}>
          About
        </Link>
      </li>
    </ul>
  );
};