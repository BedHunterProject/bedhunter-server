module.exports = (req, res, next) => {
    console.log('ERROR MSG called');

    const html = path.join('C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Contact.js')
    res.sendFile(html)
    console.log('ERROR MSG finished');
}