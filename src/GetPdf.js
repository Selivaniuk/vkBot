const { JSDOM } = require("jsdom");
const download = require('download-pdf');
const ParsePdf = require('./ParsePdf')

const url = 'http://xn--d1abafrgaft.xn--p1ai//student/'

const dir = './pdfs/';
const name = 'schedule.pdf';
const options = {
    directory: dir,
    filename: name
}

let fetchData = 0;
let newww = true;

module.exports.getNewLink = (callback) => {
    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth();
    const numDay = date.getDay();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const maxDay = 32 - new Date(year, month, 32).getDate()
    if (numDay === 6 && numDay === 0) return
    const getNewHref = () => {
        if (day === maxDay) {
            if (numDay === 5) {
                fetchData = 3
                return `[href*='/student/Расписание ${fetchData}']`
            }
            fetchData = 1
            return `[href*='/student/Расписание ${fetchData}']`
        }
        if (numDay === 5) {
            fetchData = day + 3
            return `[href*='/student/Расписание ${fetchData}']`
        }
        fetchData = day + 1
        return `[href*='/student/Расписание ${fetchData}']`
    }
    const qwe = (callback) => {
        JSDOM.fromURL(url, {}).then(dom => {
            const document = dom.window.document;
            return document.querySelector(getNewHref()).href
        }).then(() => {
            callback(null, true)
        }).catch(() => {
            callback(null, false)
        })
    }
    if (newww) {
        qwe(function(err, response) {
            if (err) return console.log(err);
            if (response) {
                newww = false
                return callback(null, true)
            }
            if (!response) {
                newww = true
                return callback(null, false)
            }
        })
    }
    if (hour < 14) newww = true;
}
module.exports.GetPdf = (l, callback) => {
    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth();
    const numDay = date.getDay();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const maxDay = 32 - new Date(year, month, 32).getDate()

    const getHref = () => {
        // console.log('h ', hour);
        // console.log('m ', minute);
        // console.log('num', numDay);
        if (day === maxDay) {
            if (numDay === 5 && !newww) {
                fetchData = 3
                return `[href*='/student/Расписание ${fetchData}']`
            }
            if (numDay === 6) {
                fetchData = 2
                return `[href*='/student/Расписание ${fetchData}']`
            }
            if (numDay === 0) {
                fetchData = 1
                return `[href*='/student/Расписание ${fetchData}']`
            }
            if (!newww) {
                fetchData = 1
                return `[href*='/student/Расписание ${fetchData}']`
            }
            fetchData = 1
            return `[href*='/student/Расписание ${fetchData}']`
        }
        if (numDay === 5 && !newww) {
            fetchData = day + 3
            return `[href*='/student/Расписание ${fetchData}']`
        }
        if (numDay === 6) {
            fetchData = day + 2
            console.log('after', fetchData);
            return `[href*='/student/Расписание ${fetchData}']`
        }
        if (numDay === 0) {
            fetchData = day + 1
            return `[href*='/student/Расписание ${fetchData}']`
        }
        if (!newww) {
            fetchData = day + 1
            return `[href*='/student/Расписание ${fetchData}']`
        }
        fetchData = day
        return `[href*='/student/Расписание ${fetchData}']`
    }
    JSDOM.fromURL(url, {}).then(dom => {
        const document = dom.window.document;
        const pdf = document.querySelector(getHref()).href
        if (l) return callback(null, pdf)
        if (pdf) {
            download(pdf, options, function(err) {
                if (err) throw err
                console.log("meow")
                if (!l) {
                    ParsePdf.parse(d = fetchData, function(err, response) {
                        if (err) return console.log(err);
                        if (response) return callback(null, response)
                    })
                }
            })
        }
    });
}