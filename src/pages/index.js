import { css } from "@emotion/react";
import * as React from "react";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
import { LandingPage } from "../components/landing/landing_page";

import blog from "../images/programming-svgrepo-com2.svg";
import roadmap from "../images/student-struggle-svgrepo-com.svg";
import courses from "../images/teacher-svgrepo-com.svg";

const IndexPage = () => {
  return (
    <main
      css={css`
        margin: 0;
        padding: 0;
      `}
    >
      <Header pageTitle="Home Page" />
      <LandingPage>
        <div
          css={css`
            min-height: 50vh;
            background-color: white;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            opacity: 0.9;
            @media (max-width: 400px) {
              display: block;
            }
            @media (max-width: 558px) {
              display: block;
              padding: 0 4rem;
            }
          `}
        >
          <div
            css={css`
              padding: 0 4rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              @media (max-width:768px) {
                padding: 0 1rem;
              }
            `}
          >
            <img src={courses} alt="" width={80} height={80} />
            <p
              css={css`
                text-align: center;
              `}
            >
              Equip yourself with skills that will definitely land you a job in
              tech. The explanation is clear, concise and beginner friendly.
            </p>
          </div>
          <div
            css={css`
              padding: 0 4rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              @media (max-width: 768px) {
                padding: 0 1rem;
              }
            `}
          >
            <img src={roadmap} alt="" width={80} height={80} />
            <p
              css={css`
                text-align: center;
              `}
            >
              Don't know where to start? Feeling overwhelmed? Worry not, there
              are roadmaps in place that will guide you on the learning path.
            </p>
          </div>
          <div
            css={css`
              padding: 0 4rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              @media (max-width: 768px) {
                padding: 0 1rem;
              }
            `}
          >
            <img src={blog} alt="" width={80} height={80} />
            <p
              css={css`
                text-align: center;
              `}
            >
              Access blogs discussing important aspects of tech that will help
              you bolster your knowledge and cultivate best practices.
            </p>
          </div>
        </div>
      </LandingPage>
      <Footer />
    </main>
  );
};

export default IndexPage;
