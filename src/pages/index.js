import { css } from "@emotion/react";
import * as React from "react";
import { Header } from "../components/header/header";
import { LandingPage } from "../components/landing/landing_page";

const IndexPage = () => {
  return (
    <main css={css`
    margin: 0;
    padding: 0;
    `}>
      <Header pageTitle="Home Page"/>
      <LandingPage></LandingPage>
    </main>
  );
};

export default IndexPage;
