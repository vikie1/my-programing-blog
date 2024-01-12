import { css } from "@emotion/react";
import { graphql, Link } from "gatsby";
import React from "react";
import { Header } from "../../../components/header/header";
import { Head } from "../../../components/headSection";
import { globalVars } from "../../../res/globalVars";

const Course = ({ location, data }) => {
  const getBlogUrl = (id) => {
    const blogUrl = data.allSitePage.nodes.find((blog) => {
      if (blog.pageContext.id) {
        return blog.pageContext.id === "" + id;
      }
    });
    return blogUrl.path;
  };

  const separator = globalVars("separator");
  const imgAndCredits = data.course.img.split(separator);
  const image = imgAndCredits[0];
  return (
    <div>
      <Head
        pageTitle={data.course.name}
        description={data.course.desc}
        siteImage={image + "?w=348&h=200&fm=webp"}
        siteLocation={location.pathname}
        pageType={"article"}
      />
      <Header />
      <main
        css={css`
          padding-bottom: 2rem;
          width: 90%;
          margin: 0 auto;
          @media (min-width: 1024px) {
            width: 70%;
          }
          font-family: "Nunito", sans-serif;
        `}
      >
        <div>
          <h1>{data.course.name}</h1>
          <p>{data.course.desc}</p>
        </div>
        {data.course.chapters
          .sort((prev, next) => prev.chapter - next.chapter)
          .map((course) => (
            <Link to={getBlogUrl("ch" + course.id)} key={course.id}>
              <ul>
                <li>
                  {course.chapter} - {course.name}
                </li>
              </ul>
            </Link>
          ))}
      </main>
    </div>
  );
};
export default Course;
export const query = graphql`
  query ($id: String) {
    course(id: { eq: $id }) {
      desc
      name
      img
      chapters {
        chapter
        id
        name
      }
    }
    allSitePage {
      nodes {
        pageContext
        path
      }
    }
  }
`;
