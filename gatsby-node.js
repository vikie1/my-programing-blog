const { getUrl } = require("./src/res/urls-ES");
const fetch = require(`node-fetch`)

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from GitHub API at build time
  const result = await fetch(getUrl("blog"))
  const resultData = await result.json()
  // create node for build time data example in the docs
  createNode({
    // nameWithOwner and url are arbitrary fields from the data
    content: resultData.blog,
    // required fields
    id: `test-blog-data`,
    parent: null,
    children: [],
    internal: {
      type: `Blog`,
      contentDigest: createContentDigest(resultData),
    },
  })
}