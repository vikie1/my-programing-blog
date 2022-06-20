import { css } from "@emotion/react";
import { convertToRaw, EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
// import { Editor } from "react-draft-wysiwyg"; //didn't work during gatsby build
import loadable from "@loadable/component";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as styles from "./index.module.css";
import { useUrl } from "../../../res/urls";
import { protectedVars } from "../../../res/protectedVars";
import { globalVars } from "../../../res/globalVars";
import { HtmlSnippet } from "../../../components/editor/customHtml";

const EditorPage = (props) => {
  const Editor = loadable(() =>
    import("react-draft-wysiwyg").then((mod) => mod.Editor)
  ); //fix for gatsby build

  const [imgUrl, setImgUrl] = useState(null);
  const [imgCredits, setImgCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const [topics, setTopics] = useState(null);
  const [isloading, setIsloading] = useState(null);
  const [description, setDescription] = useState(null);
  const [restore, setRestore] = useState(false);
  const url = useUrl("blogAPI");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleFileChange = (e) => {
    const cloudinaryUploadAPI = protectedVars("cloudinaryImage");
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

  const pageResults = () => {
    const date = new Date(Date.now()).toISOString().split("T")[0];
    let topicsArray;
    if (topics) {
      topicsArray = topics.split(/\s*,\s*/);
    }
    const separator = globalVars("separator");
    const imgURL = imgCredits ? imgUrl + separator + imgCredits : imgUrl;
    return {
      name,
      imgURL,
      description,
      publishDate: date,
      topics: topicsArray,
      post: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = pageResults();
    console.log(JSON.stringify(data));
    setIsloading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) return;
        throw new Error("There was a problem saving the blog");
      })
      .then((res) => {
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          alert(error.message);
        }
      });
  };

  const button = css`
    text-decoration: none;
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

  const bkpToLocalStorage = async () => {
    const data = pageResults();

    const nameEncoded = await crypto.subtle.digest(
      "SHA-1",
      new TextEncoder("utf-8").encode(name)
    );
    const localDataName = Array.prototype.map
      .call(new Uint8Array(nameEncoded), (x) =>
        ("00" + x.toString(16)).slice(-2)
      )
      .join("");

    console.log(localDataName, data);
    localStorage.setItem(localDataName, JSON.stringify(data));
  };

  useEffect(() => {
    bkpToLocalStorage();
  }, [pageResults().post]);

  
  return (
    <body
      css={css`
        margin: 0;
        padding: 0;
        background-color: #20222d;
        color: white;
      `}
    >
      <main
        css={css`
          min-height: 100%;
          width: 80vw;
          margin: 0 auto;
        `}
      >
        <header>
          <h1>Convert great ideas to writings</h1>
        </header>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div
            css={css`
              min-height: 65vh;
              color: black;
              margin-bottom: 0.5rem;
            `}
          >
            <Editor
              wrapperClassName={styles.wrapperClass}
              editorClassName={styles.editorClass}
              toolbarClassName={styles.toolbarClass}
              // toolbarCustomButtons={[<HtmlSnippet />]}
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
          </div>
          <div
            css={css`
              display: flex;
            `}
          >
            <input
              type="text"
              value={name}
              css={[inputs]}
              placeholder="Name * (Use blog title here)"
              onChange={(e) => setName((prevName) => e.target.value)}
            />
            <input
              type="text"
              value={topics}
              css={[
                inputs,
                css`
                  margin-left: 5px;
                `,
              ]}
              placeholder="Topics *(Separate with comma e.g java, threads, React)"
              required
              onChange={(e) => setTopics((prevTopics) => e.target.value)}
            />
          </div>
          <div
            css={css`
              display: flex;
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
            <div
              css={css`
                background-color: blue;
              `}
            >
              <label htmlFor="fileInput">Blog preview image</label>
              <input
                onChange={(e) => handleFileChange(e)}
                type="file"
                accept="image/*"
                id="fileInput"
              />
              {isLoading ? <div>Uploading File</div> : null}
              {error ? <div>{error}</div> : null}
              <input
                type="text"
                value={imgUrl}
                css={[inputs]}
                placeholder="Enter the imgUrl here"
                onChange={(e) => setImgUrl((prevName) => e.target.value)}
              />
              <input
                type="text"
                value={imgCredits}
                css={[inputs]}
                placeholder="Enter the img credits here"
                onChange={(e) => setImgCredits((prevName) => e.target.value)}
              />
            </div>
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
        </form>
      </main>
      <aside>
        
      </aside>
    </body>
  );
};

export default EditorPage;