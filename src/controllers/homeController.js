let getHomePage = (req, res) => {
    return res.render('homePage.ejs');
}
let getaboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

module.exports = {
    getHomePage: getHomePage,
    getaboutPage: getaboutPage
}
