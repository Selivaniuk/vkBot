const { JSDOM } = require("jsdom");
const download = require('download-pdf');
const ParsePdf = require('./ParsePdf')

const url = 'http://xn--d1abafrgaft.xn--p1ai//student/'
const date = new Date();
const numDay = date.getDay()
const day = date.getDate();
const dir = './pdfs/'
const name = 'schedule.pdf'
const options = {
    directory: dir,
    filename: name
}
module.exports.GetPdf = (l, callback) => {
    const getHref = () => {
        if (numDay === 6) return `[href*='/student/Расписание ${day + 2}']`
        if (numDay === 0) return `[href*='/student/Расписание ${day + 1}']`
        return `[href*='/student/Расписание ${day}']`
    }
    JSDOM.fromURL(url, {}).then(dom => {
        const document = dom.window.document;
        const pdfs = document.querySelector(getHref()).href
        if (l) return callback(null, pdfs)
        if (pdfs) {
            download(pdfs, options, function(err) {
                if (err) throw err
                console.log("meow")
                if (!l) {
                    ParsePdf.parse(function(err, response) {
                        if (err) return console.log(err);
                        if (response) return callback(null, response)
                    })
                }
            })
        }
    });
}