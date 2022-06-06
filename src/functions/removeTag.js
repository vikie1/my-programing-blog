const removeH1Tag = (htmlSnippet) => {
    return htmlSnippet.replace(/<h1 .*?>.*?<\/h1>/g, '').replace(/<h1>.*?<\/h1>/g, '');
}

module.exports.removeH1Tag = removeH1Tag;