import { css } from "@emotion/react";
import * as React from "react";
import { Header } from "../components/header/header";

const IndexPage = () => {
  return (
    <main css={css`
    margin: 0;
    padding: 0;
    `}>
      <Header pageTitle="Home Page"/>
    </main>
  );
};

export default IndexPage;
