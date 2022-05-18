import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import { Adsense } from "./googleAd";

export const Head = ({
  pageTitle,
  description,
  siteLocation,
  pageType,
  siteImage,
}) => {
  const siteMetadata = useStaticQuery(graphql`
    query siteMetadata {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `);
  const logo = "https://res.cloudinary.com/victor-portfolio/image/upload/v1649851633/gatsby-icon_afracv.png"
  return (
    <>
      <Helmet>
        <title>
          {pageTitle} | {siteMetadata.site.siteMetadata.title}
        </title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={
            description
              ? description
              : "This is a website built by Victor Mwangi focusing on software development"
          }
        />
        <link
          rel="canonical"
          href={siteMetadata.site.siteMetadata.siteUrl + siteLocation}
        />
        <meta property="og:type" content={pageType ? pageType : "website"} />
        <meta
          property="og:url"
          content={siteMetadata.site.siteMetadata.siteUrl}
        />
        <meta
          property="og:title"
          content={pageTitle + " | " + siteMetadata.site.siteMetadata.title}
        />
        <meta
          property="og:description"
          content={
            description
              ? description
              : "This is a website built by Victor Mwangi Focus on software development"
          }
        />
        <meta property="og:image" content={siteImage ? siteImage : logo} />
        <meta
          property="og:site_name"
          content={
            siteMetadata.site.siteMetadata.title +
            " - Equip yourself with skills that will definitely land you a job in tech"
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@_victormwangi" />
        <meta
          name="twitter:title"
          content={pageTitle + " | " + siteMetadata.site.siteMetadata.title}
        />
        <meta
          name="twitter:description"
          content={
            description
              ? description
              : "This is a website built by Victor Mwangi Focus on software development"
          }
        />
        <meta name="twitter:image" content={siteImage ? siteImage : logo} />
        <meta name="twitter:site" content="@_victormwangi" />
        <meta
          name="twitter:url"
          content={siteMetadata.site.siteMetadata.siteUrl + siteLocation}
        />
        {/* <Adsense /> */}
      </Helmet>
    </>
  );
};
