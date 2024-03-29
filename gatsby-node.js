const { getUrl } = require("./src/res/urls-ES");
const fetch = require(`node-fetch`);
const { removeH1Tag } = require("./src/functions/removeTag");

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from API at build time
  const blog = await fetch(getUrl("blogAPI") + "/published");
  const courses = await fetch(getUrl("courseAPI"));
  const roadMaps = await fetch(getUrl("roadMapsAPI"));
  const blogData = await blog.json();
  const coursesData = await courses.json();
  const roadMapsData = await roadMaps.json();
  // create node for build time data
  blogData.blog.map((blog) => {
    const post = removeH1Tag(blog.post);
    createNode({
      name: blog.name,
      id: "b" + blog.id,
      img: blog.imgURL,
      desc: blog.description,
      topics: blog.topic,
      date: blog.postDate,
      content: post,
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
  roadMapsData.roadMaps.map((roadMap) => {
    const explanation = removeH1Tag(roadMap.explanation);
    createNode({
      id: "r" + roadMap.id,
      name: roadMap.name,
      desc: roadMap.description,
      img: roadMap.imgURL,
      date: roadMap.postDate,
      content: explanation,
      topics: roadMap.topics,
      // required fields
      parent: null,
      internal: {
        type: `RoadMaps`,
        contentDigest: createContentDigest(roadMapsData),
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
            img
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
    node.chapters
      .sort((prev, next) => prev.chapter - next.chapter)
      .forEach((chapters, index) => {
        const chapterContent = removeH1Tag(chapters.content);
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
          context: {
            id: "ch" + chapters.id,
            data: {
              course: node.name,
              img: node.img,
              chapter: chapters.name,
              date: chapters.postDate,
              content: chapterContent,
              prev: node.chapters[index - 1]
                ? "ch" + node.chapters[index - 1].id
                : null,
              next: node.chapters[index + 1]
                ? "ch" + node.chapters[index + 1].id
                : null,
            },
          },
        });
      });
  });
};
