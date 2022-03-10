module.exports.homepage = (req, res, next) => {
    const html = path.join('C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Home.js')
    res.sendFile(html)
}