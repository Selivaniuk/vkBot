const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {
    firstPage: 2
};

const dir = './pdfs/'
const name = 'schedule.pdf'

let [month, date] = new Date().toLocaleDateString("en-US").split("/")
const numDay = new Date().getDay()

const getDate = () => {
    if (numDay === 6) return parseInt(date) + 2
    if (numDay === 0) return parseInt(date) + 1
    return date
}

module.exports.parse = (callback) => {
    pdfExtract.extract(dir + name, options, (err, data) => {
        if (err) return console.log(err);
        const content = data.pages[0].content

        const getCoords = (id) => {
            let x = content[id].x - 60
            let minX = x - 10
            let maxX = x + 10
            let minY = 0
            let maxY = 0

            for (let i = 0; i < content.length; i++) {
                if (i > id && i < id + 100) {
                    if (content[i].str === '1') minY = content[i].y - 10;
                    if (content[i].str === '4') maxY = content[i].y + 10;
                }
            }
            getPars(maxX, minX, maxY, minY);
        }

        const getPars = (maxX, minX, maxY, minY) => {
            const res = []
            for (let i = 0; i < content.length; i++) {
                const x = content[i].x
                const y = content[i].y
                if (x > minX && x < maxX && y > minY && y < maxY) {
                    res.push(content[i].str)
                }
            }
            if (res) {
                const dateTitle = `Расписание на ${getDate(date)}.${month}`
                let result = `${dateTitle} \n \n 1. ${res[0]} \n 2. ${res[1]} \n 3. ${res[2]} \n 4. ${res[3]}`
                return callback(null, result)
            }
        }
        for (let i = 0; i < content.length; i++) {
            // console.log(content[i]);
            if (content[i].str === '71 (4 курс)' && content[i - 2].str === 'И') {
                getCoords(i)
                break
            }
        }
    });
}