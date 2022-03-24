module.exports.oneroom = (req, res, next) => {
    console.log('ONEROOM called');

    const html = path.join('C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Rooms.js')
    res.sendFile(html)
    console.log('ONEROOM finished');
}