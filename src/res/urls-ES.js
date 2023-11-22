const getUrl = (name) => {
    const pbVictor = "http://localhost:8080/api";
    const pbVictorSubUrls = {
      contact: pbVictor + "/contact",
      blogAPI: pbVictor + "/lfv/blogs",
      courseAPI: pbVictor + "/lfv/courses",
      roadMapsAPI: pbVictor + "/lfv/roadmaps"
    };
    return pbVictorSubUrls[name];
};
module.exports.getUrl = getUrl;
