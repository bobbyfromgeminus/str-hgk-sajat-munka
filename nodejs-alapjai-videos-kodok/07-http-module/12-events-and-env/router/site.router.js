const siteController = require("../controller/site.controller");

const siteRouter = {
    '/': res => siteController.index(res),
    '/about': res => siteController.about(res),
    '/contact': res => siteController.contact(res),
    '/404': res => siteController.error404(res)
}

module.exports = Object.freeze(siteRouter);