import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

export const Header = ({ pageTitle, children}) => {
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
            gatsbyImageData
          }
        }
      }
    `
  );
  const logo = getImage(getMetadata.file)
  return (
    <div className="">
      <title>
        {pageTitle} | {getMetadata.site.siteMetadata.title}
      </title>
      <header>
        <div>
          <Link to="/">
            <GatsbyImage image={logo} alt="The website logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/articles">Articles</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
