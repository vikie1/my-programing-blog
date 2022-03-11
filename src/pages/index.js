import { css } from "@emotion/react";
import * as React from "react";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
import { LandingPage } from "../components/landing/landing_page";

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
            height: 50vh;
            background-color: white;
          `}
        >
          *This website is still under active development <br/>          
            //ToDo: Fill this area
        </div>
      </LandingPage>
      <Footer/>
    </main>
  );
};

export default IndexPage;
