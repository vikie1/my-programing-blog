export const useUrl = (name) => {
  //   const pbVictor = "https://pbvictor.herokuapp.com/api";
  //   const pbVictorSubUrls = {
  //     contact: "/contact",
  //     blog: "/blog",
  //   };
  //   const response = pbVictor + pbVictorSubUrls[name];
  const { getUrl } = require("./urls-ES");
  return getUrl(name);
};
