const { getUrl } = require("./src/res/urls-ES");
const fetch = require(`node-fetch`);

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from API at build time
  const blog = await fetch(getUrl("blogAPI"));
  const courses = await fetch(getUrl("courseAPI"));
  const blogData = await blog.json();
  const coursesData = await courses.json();
  // create node for build time data
  blogData.blog.map((blog) => {
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
        contentDigest: createContentDigest(blogData),
      },
    });
  });
  coursesData.courses.map(course => {
    createNode({
      id: "" + course.id,
      name: course.name,
      desc: course.description,
      img: course.imgURL,
      content: course.courses,
      // required fields
      parent: null,
      internal: {
        type: `Courses`,
        contentDigest: createContentDigest(coursesData),
      },
    })
  })
};

//create pages for the Blogs
// const path = require("path")
// exports.createPages = async ({ graphql, actions, reporter }) => {
//   // Destructure the createPage function from the actions object
//   const { createPage } = actions
//   const result = await graphql(`
//     query {
//       allBlog {
//         edges {
//           node {
//             id
//             name
//           }
//         }
//       }
//     }
//   `)
//   if (result.errors) {
//     reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
//   }
//   // Create blog post pages.
//   const posts = result.data.allBlog.edges
//   // you'll call `createPage` for each result
//   posts.forEach(({ node }, index) => {
//     createPage({
//       // The slug generated by gatsby-plugin-mdx doesn't contain a slash at the beginning
//       // You can prepend it with any prefix you want
//       path: `/blog/${node.name}`,
//       // This component will wrap our MDX content
//       component: path.resolve(`./src/pages/blog/{blog.name}.js`),
//       // You can use the values in this context in
//       // our page layout component
//       context: { id: node.id },
//     })
//   })
// }