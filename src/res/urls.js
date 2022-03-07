export const useUrl = (name) => {
  const { getUrl } = require("./urls-ES");
  return getUrl(name);
};
