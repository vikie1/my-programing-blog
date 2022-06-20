import { ContentState, convertFromHTML, EditorState, Modifier } from "draft-js";
import * as React from "react";

export const HtmlSnippet = ({ editorState, onChange }) => {
  const [showInput, setShowInput] = React.useState(false);
  const [snippet, setSnippet] = React.useState("");

  const handleCaptureInput = (e) => {
    console.log(snippet);
    console.log(snippet.length);
    console.log(snippet ? true : false);
    console.log(!snippet === "");
    console.log(snippet && !(snippet.length === 0));
    if (snippet && !(snippet.length === 0)) {
      console.log(snippet + "me");

      const blocksFromHTML = convertFromHTML(snippet);
      const { contentBlocks, entityMap } = blocksFromHTML;

      console.log(JSON.stringify(blocksFromHTML));

      let contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );

      contentState = Modifier.replaceWithFragment(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        contentState.getBlockMap()
      );
      onChange(
        EditorState.push(editorState, contentState, "insert-characters")
      );
    }
    console.log("hi");
  };

  return (
    <>
      <div
        className="rdw-option-wrapper"
        aria-selected="false"
        title="HTML Snippet"
        onClick={(e) => setShowInput(true)}
        style={{ position: "relative" }}
      >
        &lt;/&gt;
        {showInput && (
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 0,
              zIndex: 99,
              backgroundColor: "white",
            }}
          >
            <textarea
              name="HTML Snippet"
              id="snippet"
              cols="20"
              rows="5"
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)}
            ></textarea>
            <div style={{ display: "flex" }}>
              <div
                title="Ok button"
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  backgroundColor: "GrayText",
                }}
                onClick={handleCaptureInput}
              >
                Ok
              </div>
              <div title="cancel button" onClick={(e) => setShowInput(false)}>
                Cancel
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
