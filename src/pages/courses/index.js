import { css } from "@emotion/react";
import React, { useState } from "react";
import { Header } from "../components/header/header";
import { ListCourses } from "../components/list-courses";
import { ListRoadMaps } from "../components/list-roadmaps";

const CoursesPage = () => {
  // switch between roadMaps and Courses
  const [allCourses, setAllCourses] = useState(true);
  const [roadMaps, setRoadMaps] = useState(false);
  const handleCollectionSwitch = (props) => {
    if (props === "allCourses") {
      setAllCourses(true);
      setRoadMaps(false);
    } else if (props === "roadMaps") {
      setAllCourses(false);
      setRoadMaps(true);
    }
  };

  // styles
  const colorActive = "darkcyan";
  const colorInactive = "transparent";
  const collections = css`
    color: darkcyan;
    padding: 5px 0;
    :hover {
      border-bottom: 1px solid black;
      cursor: pointer;
    }
  `;
  return (
    <main>
      <Header pageTitle="Availabe Courses" />
      <div
        css={css`
          width: 85%;
          margin-left: auto;
          margin-right: auto;
          height: 99vh;
        `}
      >
        <h1
          css={css`
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 500;
            font-size: 3.05733em;
            line-height: 1;
          `}
        >
          Start Learning
        </h1>
        <div>
          <span
            css={[
              collections,
              css`
                border-bottom: 1px solid
                  ${allCourses ? colorActive : colorInactive};
              `,
            ]}
            onClick={() => handleCollectionSwitch("allCourses")}
          >
            All Courses
          </span>
          <span
            css={[
              collections,
              css`
                border-bottom: 1px solid
                  ${roadMaps ? colorActive : colorInactive};
                margin-left: 10px;
              `,
            ]}
            onClick={() => handleCollectionSwitch("roadMaps")}
          >
            See RoadMaps
          </span>
        </div>
        <div
          css={css`
            padding-top: 3rem;
          `}
        >
          {allCourses && <ListCourses />}
          {roadMaps && <ListRoadMaps />}
        </div>
      </div>
    </main>
  );
};
export default CoursesPage;
