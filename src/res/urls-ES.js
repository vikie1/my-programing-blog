const getUrl = (name) => {
    const pbVictor = "https://pbvictor.herokuapp.com/api";
    const pbVictorSubUrls = {
      contact: pbVictor + "/contact",
      blog: pbVictor + "/blog",
      blogAPI: pbVictor + "/api/lfv/blog"
    };
    return pbVictorSubUrls[name];
};
module.exports.getUrl = getUrl;