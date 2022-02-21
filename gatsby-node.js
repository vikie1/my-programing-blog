const { getUrl } = require("./src/res/urls-ES");
const fetch = require(`node-fetch`);

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from GitHub API at build time
  const result = await fetch(getUrl("blog"));
  const resultData = await result.json();
  // create node for build time data example in the docs
  // createNode({
  //   // nameWithOwner and url are arbitrary fields from the data
  //   content: resultData.blog,
  //   // required fields
  //   id: `test-blog-data`,
  //   parent: null,
  //   internal: {
  //     type: `Blog`,
  //     contentDigest: createContentDigest(resultData),
  //   },
  // })
  resultData.blog.map((blog) => {
    createNode({
      // nameWithOwner and url are arbitrary fields from the data
      //content: resultData.blog,
      name: blog.name,
      id: "" + blog.id,
      img: blog.imgURL,
      desc: blog.description,
      topics: blog.topic,
      content: blog.fullArticle,
      // required fields
      //id: `test-blog-data`,
      parent: null,
      internal: {
        type: `Blog`,
        contentDigest: createContentDigest(resultData),
      },
    });
  });
};
