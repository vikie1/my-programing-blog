export const useUrl = (name) => {
    const pbVictor = "https://pbvictor.herokuapp.com/api"
    const pbVictorSubUrls = {
        contact: "/contact",
    }
    const response = pbVictor + pbVictorSubUrls[name];
    return response;
}