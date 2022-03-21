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
      id: "b" + blog.id,
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
  coursesData.courses.map((course) => {
    createNode({
      id: "c" + course.courseId,
      name: course.name,
      desc: course.description,
      img: course.imgURL,
      chapters: course.courses,
      topics: course.topic,
      // required fields
      parent: null,
      internal: {
        type: `Course`,
        contentDigest: createContentDigest(coursesData),
      },
    });
  });
};
// create pages for the Blogs
const path = require("path");
exports.createPagesStatefully = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allCourse {
        edges {
          node {
            name
            chapters {
              chapter
              content
              id
              name
              postDate
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  // Create blog post pages.
  const posts = result.data.allCourse.edges;
  // you'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
    node.chapters.forEach((chapters, index) => {
      createPage({
        // The slug generated by gatsby-plugin-mdx doesn't contain a slash at the beginning
        // You can prepend it with any prefix you want
        path: `/courses/${node.name
          .toLowerCase()
          .trim()
          .replace(/ /g, "-")
          .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")}/${chapters.chapter}`,
        // This component will wrap our MDX content
        component: path.resolve(`./src/components/chapter.js`),
        // You can use the values in this context in
        // our page layout component
        context: { id: "ch" + chapters.id, data: {
          course: node.name,
          chapter: chapters.name,
          date: chapters.postDate,
          content: chapters.content
        } },
      });
    });
  });
};
