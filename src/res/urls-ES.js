const getUrl = (name) => {
    const pbVictor = "https://web-production-2b5d.up.railway.app/api";
    const pbVictorSubUrls = {
      contact: pbVictor + "/contact",
      blogAPI: pbVictor + "/lfv/blogs",
      courseAPI: pbVictor + "/lfv/courses",
      roadMapsAPI: pbVictor + "/lfv/roadmaps"
    };
    return pbVictorSubUrls[name];
};
module.exports.getUrl = getUrl;
