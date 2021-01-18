const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {
    firstPage: 2
};

const dir = './pdfs/'
const name = 'schedule.pdf'

module.exports.parse = (title, callback) => {
    pdfExtract.extract(dir + name, options, (err, data) => {
        if (err) return console.log(err);
        const content = data.pages[0].content
        const getCoords = (id) => {
            let x = content[id].x - 60
            let minX = x - 10
            let maxX = x + 10
            let minY = 0
            let maxY = 0
            let aiae = 0;
            let ai = 0;
            let aiai = 0;
            for (let i = 0; i < content.length; i++) {
                if (i > id && i < id + 120) {

                    if (content[i].str === '0' && aiae < 3) {
                        minY = content[i].y - 10;
                        aiae += 1
                    }
                    if (content[i].str === '1' && ai < 3 && aiae === 0) {
                        minY = content[i].y - 10;
                        ai += 1
                    }
                    if (content[i].str === '4' && aiai < 3) {
                        maxY = content[i].y + 20;
                        aiai += 1
                    }
                    if (content[i].str === '3' && aiai === 0) {
                        maxY = content[i].y + 20;
                        aiai += 1
                    }
                }
            }
            getPars(maxX, minX, maxY, minY);
        }

        const getPars = (maxX, minX, maxY, minY) => {
            // console.log('mX', maxX, 'miX', minX, 'mY', maxY, 'miY', minY);
            const res = []
            for (let i = 0; i < content.length; i++) {
                const x = content[i].x
                const y = content[i].y
                if (x > minX && y > minY && x < maxX && y < maxY) {
                    res.push(content[i].str)
                }
            }
            if (res) {
                let result = `${title} \n \n1. ${res[0]} \n2. ${res[1]} \n3. ${res[2]} \n4. ${res[3]?res[3]:''}\n5. ${res[4]?res[4]:''}\n  `
                return callback(null, result)
            }
        }
        for (let i = 0; i < content.length; i++) {
            // console.log(content[i].str, i);
            if ((content[i].str === '71 (4 курс)' || (content[i].str === '71 (4 ' && content[i + 1].str === 'курс)')) && content[i - 2].str === 'И') {
                getCoords(i)

                break
            }
        }
    });
}