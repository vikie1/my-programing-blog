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
