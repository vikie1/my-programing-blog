import { css } from "@emotion/react";
import { convertToRaw, EditorState } from "draft-js";
import React, { useState } from "react";
import { compileMDXFunction, useMDXFunction } from "../../lib/mdx";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as styles from "./index.module.css";
import { useUrl } from "../../res/urls";
import { protectedVars } from "../../res/protectedVars";

const EditorPage = (props) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const [topics, setTopics] = useState(null);
  const [isloading, setIsloading] = useState(null);
  const [description, setDescription] = useState(null);
  const url = useUrl("blogAPI");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const MDXContent = useMDXFunction(
    compileMDXFunction(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    ).value
  );
  const handleFileChange = (e) => {
    const cloudinaryUploadAPI = protectedVars("cloudinary");
    const preset = protectedVars("preset");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("folder", "blog");
    formData.append("upload_preset", preset);
    setIsLoading(true);
    fetch(cloudinaryUploadAPI, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw Error("There was a problem with the upload request");
      })
      .then((data) => {
        const result = JSON.parse(data);
        setIsLoading(false);
        setImgUrl(result.secure_url);
        e.target.value = null;
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          setError(error.message);
        }
      });
  };

  const button = css`
    text-decoration: none;
    /* width: 10%; */
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
    <body
      css={css`
        margin: 0;
        padding: 0;
        background-color: #20222d;
        color: white;
      `}
    >
      <div
        css={css`
          min-height: 100%;
          width: 80vw;
          margin: 0 auto;
        `}
      >
        <header>
          <h1>Convert great ideas to writings</h1>
        </header>
        <div
          css={css`
            min-height: 65vh;
          `}
        >
          <Editor
            wrapperClassName={styles.wrapperClass}
            editorClassName={styles.editorClass}
            toolbarClassName={styles.toolbarClass}
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
        </div>
        <div
          css={css`
            display: flex;
            width: 50%;
          `}
        >
          <input
            type="text"
            value={name}
            css={[inputs]}
            placeholder="Name *"
            onChange={(e) => setName((prevName) => e.target.value)}
          />
          <input
            type="email"
            value={topics}
            css={[
              inputs,
              css`
                margin-left: 5px;
              `,
            ]}
            placeholder="Topics *"
            required
            onChange={(e) => setTopics((prevTopics) => e.target.value)}
          />
          <div css={css`background-color: blue;`}>
            <label htmlFor="fileInput">Blog preview image</label>
            <input
              onChange={(e) => handleFileChange(e)}
              type="file"
              accept="image/*"
              id="fileInput"
            />
            {isLoading ? <div>Uploading File</div> : null}
            {error ? <div>{error}</div> : null}
          </div>
        </div>
        <div
          css={css`
            padding-right: 11px;
            width: 50%;
          `}
        >
          <textarea
            name="description"
            placeholder="Description *"
            id=""
            required
            css={inputs}
            cols="20"
            rows="5"
            value={description}
            onChange={(e) =>
              setDescription((prevDescription) => e.target.value)
            }
          ></textarea>
        </div>
        <div
          css={css`
            bottom: 10%;
          `}
        >
          {isloading ? (
            <button disabled css={button}>
              Sending ...
            </button>
          ) : (
            <button css={button}>Submit</button>
          )}
        </div>
      </div>
    </body>
  );
};
export default EditorPage;
