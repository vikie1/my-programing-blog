const getUrl = (name) => {
    const pbVictor = "https://pbvictor.herokuapp.com/api";
    const pbVictorSubUrls = {
      contact: pbVictor + "/contact",
      blogAPI: pbVictor + "/lfv/blogs",
      courseAPI: pbVictor + "/lfv/courses",
      roadMapsAPI: pbVictor + "/lfv/roadmaps"
    };
    return pbVictorSubUrls[name];
};
module.exports.getUrl = getUrl;
