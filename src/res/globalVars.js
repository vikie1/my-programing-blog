export const globalVars = (name) => {
    const variable = {
        separator: '__separator__'
    }
    return variable[name];
}