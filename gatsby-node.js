const { getUrl } = require("./src/res/urls-ES");
const fetch = require(`node-fetch`);
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from API at build time
  const result = await fetch(getUrl("blogAPI"));
  const resultData = await result.json();
  // create node for build time data example in the docs
  resultData.blog.map((blog) => {
    createNode({
      name: blog.name,
      id: "" + blog.id,
      img: blog.imgURL,
      desc: blog.description,
      topics: blog.topic,
      date: blog.postDate,
      content: blog.post,
      // required fields
      parent: null,
      internal: {
        type: `Blog`,
        contentDigest: createContentDigest(resultData),
      },
    });
  });
};
