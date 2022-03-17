import { css } from "@emotion/react";
import { graphql, Link } from "gatsby";
import React from "react";
import { Header } from "../../../components/header/header";

const Course = ({ data }) => {
  const getBlogUrl = (id) => {
    console.log(id)
    const blogUrl = data.allSitePage.nodes.find((blog) => {
      if (blog.pageContext.id) {
        return blog.pageContext.id === "" + id;
      }
    });
    return blogUrl.path;
  };
    return (
       <div className="-view">
         <Header pageTitle={data.course.name} />
         <div>
         <h1>{data.course.name}</h1>
         <p>{data.course.desc}</p>
         </div>
         {data.course.chapters.map(course => (
           <Link to={getBlogUrl("ch" + course.id)} key={course.id}>
           <ul>
             <li>{course.chapter}</li>
           </ul>
           </Link>
         ))}
       </div>
    );
}
export default Course;
export const query = graphql`
  query ($id: String) {
    course(id: { eq: $id }) {
      desc
      name
      chapters {
        chapter
        id
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

/* 
notes: 
 - we need a chapter name(or something like that)
 - Need topics to move up to course or add topic to course
*/