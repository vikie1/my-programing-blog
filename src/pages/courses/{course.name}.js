import { graphql } from "gatsby";
import React from "react";

export const Course = ({data}) => {
    return (
       <div className="-view">

       </div>
    );
}
export const query = graphql`
  query ($id: String) {
    course(id: { eq: $id }) {
      id
      img
      name
      chapters {
          content
      }
    }
    allCourse {
      nodes {
        desc
        img
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
