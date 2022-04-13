import React from "react";
import { css } from "@emotion/react";
import { StaticImage } from "gatsby-plugin-image";
import { Header } from "../../components/header/header";
import { ContactForm } from "../../components/contact-form";
import { Head } from "../../components/headSection";

const AboutPage = () => {
  const socialLinks = css`
    padding-left: 7px;
    font-weight: lighter;
    opacity: 0.5;
  `;
  const linkContainers = css`
    color: white;
    padding: 10px 0;
    display: flex;
    align-items: center;
  `;
  return (
    <div
      css={css`
        padding-bottom: 2rem;
      `}
    >
      <Head pageTitle="About Me" siteLocation={"/about/"}/>
      <Header />
      <main
        css={css`
          width: 90%;
          margin: 0 auto;
          @media (min-width: 1024px) {
            width: 70%;
          }
          font-family: "Dosis", sans-serif;
        `}
      >
        <div>
          <h1>So, Learn from Victor?</h1>
          <p>
            This website was created by{" "}
            <a href="https://victormwangi.netlify.app/about">Victor Mwangi</a>.{" "}
            The main purpose is to share the knowledge gained over the years and
            get an engineer out of you. The content in this website will make
            you a full stack developer! Expect content revolving around the
            following languages:
            <ul>
              <li>The Java programming language</li>
              <li>JavaScript programming language</li>
              <li>SQL</li>
            </ul>
            The development stack that I teach will involve:
            <ul>
              <li>A Spring boot backend</li>
              <li>A React front end</li>
              <li>
                And other items in my stack e.g Thymeleaf, gatsby, TailwindCSS
                etc
              </li>
            </ul>
          </p>
        </div>
        <div
          css={css`
            background-color: #20222d;
          `}
        >
          <div
            css={css`
              width: 65%;
              margin: 0 auto;
              padding: 10px;
            `}
          >
            <h3
              css={css`
                color: whitesmoke;
                font-family: "Cabin Condensed", sans-serif;
                font-weight: bold;
                font-size: x-large;
              `}
            >
              Connect with me on:
            </h3>
            <div
              css={css`
                @media (min-width: 768px) {
                  display: flex;
                  justify-content: space-between;
                }
              `}
            >
              <div>
                <a
                  css={linkContainers}
                  href="https://twitter.com/_victormwangi"
                  rel="noreferrer"
                  target="_blank"
                >
                  <StaticImage
                    src="tl.svg"
                    alt="twitter icon"
                    height={30}
                    width={30}
                  />
                  <span css={socialLinks}>Twitter: @_victormwangi</span>
                </a>
                <a css={linkContainers} href="mailto:mwangivictor52@gmail.com">
                  <StaticImage
                    src="gmail.svg"
                    alt="gmail icon"
                    height={30}
                    width={30}
                  />
                  <span css={socialLinks}>Email: mwangivictor52@gmail.com</span>
                </a>
              </div>
              <div>
                <a
                  css={linkContainers}
                  href="https://www.polywork.com/vmwangi"
                  rel="noreferrer"
                  target="_blank"
                >
                  <StaticImage
                    src="polywork.svg"
                    alt="polywork icon"
                    height={30}
                    width={30}
                  />
                  <span css={socialLinks}>Polywork: @vmwangi</span>
                </a>
                <a
                  css={linkContainers}
                  href="https://www.linkedin.com/in/victormwangi1"
                  rel="noreferrer"
                  target="_blank"
                >
                  <StaticImage
                    src="Linkedin.svg"
                    alt="Linkedin icon"
                    height={30}
                    width={30}
                  />
                  <span css={socialLinks}>Linkedin: @victormwangi1</span>
                </a>
              </div>
            </div>
            <div>
              <h3
                css={css`
                  color: whitesmoke;
                  font-family: "Cabin Condensed", sans-serif;
                  font-weight: bold;
                  font-size: x-large;
                  text-align: center;
                `}
              >
                Contact me directly
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
        <div>
          <h2>Who's Victor Mwangi?</h2>
          <div>
            <h3>My story</h3>
            <div>
              <p>
                Victor Mwangi Wairimu is a tech enthusiast from Kenya. I never
                was a nerd in highschool - or so I thought - but managed to
                qualify for an engineering course at{" "}
                <a href="https://www.mku.ac.ke/">Mount Kenya University</a>. I
                completed a Bachelor of Technology in Computer and Electronics
                Systems on Dec 17, 2021. I should probably include lessons on 
                electronics here but I don't want to scare anyone with mathematics 😗,
                'yet'.
              </p>
            </div>
          </div>
          <div>
            <h3>My development story</h3>
            <div>
              <p>
                With the most of my coursework focusing on hardware and systems
                programming, I had to teach myself the higher level aspects of
                programming. After all, however focused/hardworking I think I
                was, there was no way I was going to build websites with VHDL,
                assembly language, C, or C++. Selecting what language to study
                at the time was a hectic endeavour, where I studied python, C#,
                Java and JavaScript in that order. Of course Java clicked and
                JavaScript ... well, JavaScript is JavaScript. I forgot the rest
                btw.
              </p>
              <p>
                As a full stack developer, I studied HTML shortly after Java and
                later added JavaScript to my arsenal. My first website had a Java
                servlets backend and JSPs at the front end but after tasting Spring
                Boot magic, I didn't look back.
              </p>
              <p>
                I started this website so you or someone else wouldn't have to
                struggle to be a developer. Also it's worth noting that my mum
                is a teacher but unlike me, she is lucky enough to see and
                interact with her students.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default AboutPage;
