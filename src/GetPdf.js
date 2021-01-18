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

module.exports.getNewLink = (callback) => {
const date = new Date();
const year = date.getFullYear()
const month = date.getMonth();
const day = date.getDate();
const maxDay = 32 - new Date(year, month, 32).getDate()

    JSDOM.fromURL(url, {}
        ).then(dom => {
          const text = dom.window.document.querySelector(`.facts`).childNodes[1].children[6].text
          const date = text[14]+text[15] 
        //   const mon = text[17]+text[18] 
        if ((day===maxDay)&&(parseInt(date)>1||parseInt(date)<4)) return callback(null, true)
        if (day<parseInt(date)) return callback(null, true)
        return callback(null, false)
      });
}

module.exports.GetPdf = (l, callback) => {


    JSDOM.fromURL(url, {}
      ).then(dom => {
        const pdf = dom.window.document.querySelector(`.facts`).childNodes[1].children[6].href
        const text = dom.window.document.querySelector(`.facts`).childNodes[1].children[6].text
        // console.log(day);
        if (l) return callback(null, pdf)
        if (pdf) {
            download(pdf, options, function(err) {
                if (err) throw err
                console.log("meow")
                if (!l) {
                    ParsePdf.parse(title = text, function(err, response) {
                        if (err) return console.log(err);
                        if (response) return callback(null, response)
                    })
                }
            })
        }
    });
}