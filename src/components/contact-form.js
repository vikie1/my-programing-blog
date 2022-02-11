import { css } from "@emotion/react";
import React from "react";
import { useState } from "react";
import { useUrl } from "../res/urls";

export const ContactForm = () => {
  const [isloading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);

  const [reply, setReply] = useState(null);
  const [error, setError] = useState(null);

  const url = useUrl("contact");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, email, message };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Did not get data from server");
        }
        return res.json();
      })
      .then((data) => {
        setReply((prevReply) => data);
        setLoading((prevLoading) => false);
        setError((prevError) => null);
        setEmail((prevEmail) => null);
        setMessage((prevMessage) => null);
        setName((prevName) => null);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          setLoading((prevLoading) => false);
          setError((prevError) => error.message);
        }
      });
  };

  const button = css`
    text-decoration: none;
    width: 100%;
    color: white;
    background-color: #204dcc;
    padding: 10px;
    border-radius: 3px;
    transition: 0.17s ease;
    border: none;
    :hover {
      background-color: #222222;
    }
  `;
  const inputs = css`
    background: transparent;
    outline: none;
    border: 1px solid;
    border-color: darkslategray;
    color: wheat;
    resize: none;
    width: 100%;
    border-radius: 3px;
    margin-bottom: 5px;
    padding: 5px;
  `;
  return (
    <div className="-view">
      <form onSubmit={handleSubmit}>
        <div
          css={css`
            display: flex;
          `}
        >
          <input
            type="text"
            value={name}
            css={[inputs]}
            placeholder="Name"
            onChange={(e) => setName((prevName) => e.target.value)}
          />
          <input
            type="email"
            value={email}
            css={[
              inputs,
              css`
                margin-left: 5px;
              `,
            ]}
            placeholder="Email *"
            required
            onChange={(e) => setEmail((prevEmail) => e.target.value)}
          />
        </div>
        <div
          css={css`
            padding-right: 11px;
          `}
        >
          <textarea
            name="message"
            placeholder="Message *"
            id=""
            required
            css={inputs}
            cols="20"
            rows="5"
            value={message}
            onChange={(e) => setMessage((prevMessage) => e.target.value)}
          ></textarea>
        </div>

        <div>
          {!isloading && !error && !reply && (
            <button css={button}>Submit</button>
          )}
          {isloading && (
            <button disabled css={button}>
              Sending ...
            </button>
          )}
          {!isloading && !error && reply && (
            <button disabled css={button}>
              {reply}
            </button>
          )}
          {!isloading && error && !reply && (
            <button css={button}>{error}</button>
          )}
        </div>
      </form>
    </div>
  );
};
