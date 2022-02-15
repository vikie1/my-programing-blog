const getUrl = (name) => {
    const pbVictor = "https://pbvictor.herokuapp.com/api";
    const pbVictorSubUrls = {
      contact: "/contact",
      blog: "/blog",
    };
    const response = pbVictor + pbVictorSubUrls[name];
    return response;
};
module.exports.getUrl = getUrl;