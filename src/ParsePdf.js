const { title } = require('process');

const dir = './pdfs/'
const name = 'schedule.pdf'

const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {
    firstPage: 2
};

let [month, date] = new Date().toLocaleDateString("en-US").split("/")
const numDay = new Date().getDay()

const predmets = ['Ин. язык', 'Родн. литерат', 'Физкультура']

let firstPara = ''
let secondPara = ''
let nextPara = ''
let lastPara = ''

const getDate = () => {
    if (numDay === 6) return parseInt(date) + 2
    if (numDay === 7) return parseInt(date) + 1
    return date
}
module.exports.parse = (callback) => {
    pdfExtract.extract(dir + name, options, (err, data) => {
        if (err) return console.log(err);
        const content = data.pages[0].content
        const getPars = (id) => {
            // const title = `${content[id].str}  ${content[id-1].str}  ${content[id-2].str}`
            if (
                (content[id + 12].str !== ' ' || content[id + 12 + 1].str !== ' ') &&
                (content[id + 12 + 1].str !== ' ' || content[id + 12 + 2].str !== ' ') &&
                (content[id + 12 + 3].str !== ' ' || content[id + 12 + 4].str !== ' ') &&
                (content[id + 12 + 5].str !== ' ' || content[id + 12 + 6].str !== ' ')
            ) {
                firstPara = `${content[id + 12].str} ${content[id + 12 + 1].str} ${content[id + 12 + 2].str} ${content[id + 12 + 3].str} ${content[id + 12 + 4].str} ${content[id + 12 + 5].str} ${content[id + 12 + 6].str} ${content[id + 12 + 7].str}`
                    // console.log(content[id + 12].str);
                    //console.log(firstPara);
                    // console.log(content[id + 12 + 1].str, 1);
                    // console.log(content[id + 12 + 2].str, 2);
                    // console.log(content[id + 12 + 3].str, 3);
                    // console.log(content[id + 12 + 4].str, 4);
                    // console.log(content[id + 12 + 5].str, 5);
                    // console.log(content[id + 12 + 6].str, 6);
                    // console.log(content[id + 12 + 7].str, 7);
                if (firstPara) {
                    for (let i = 0; i < predmets.length; i++) {
                        const predmet = predmets[i];
                        if (firstPara.indexOf(predmet) > 0) {
                            firstPara = `Первая пара: ${predmet}`
                            break
                        };
                        if (i === predmets.length - 1) {
                            if (firstPara.indexOf(predmet) > 0) firstPara = `Первая пара: ${predmet}`;
                            else firstPara = ''
                        }

                    }
                }
            }

            if (
                (content[id + 12 + 22].str !== ' ' || content[id + 12 + 22 + 1].str !== ' ') &&
                (content[id + 12 + 22 + 1].str !== ' ' || content[id + 12 + 22 + 2].str !== ' ') &&
                (content[id + 12 + 22 + 3].str !== ' ' || content[id + 12 + 22 + 4].str !== ' ') &&
                (content[id + 12 + 22 + 5].str !== ' ' || content[id + 12 + 22 + 6].str !== ' ')
            ) {
                secondPara = `${content[id + 22+ 12].str} ${content[id + 12 + 22 + 1].str} ${content[id + 12+ 22 + 3].str} ${content[id + 12+ 22 + 4].str} ${content[id + 12+ 22+ 5].str} ${content[id + 12 + 22+ 6].str} ${content[id + 12 + 22 + 7].str}`
                    // console.log(content[id + 12 + 22].str);
                    // console.log(content[id + 12 + 22 + 1].str, 1);
                    // console.log(content[id + 12 + 22 + 2].str, 2);
                    // console.log(content[id + 12 + 22 + 3].str, 3);
                    // console.log(content[id + 12 + 22 + 4].str, 4);
                    // console.log(content[id + 12 + 22 + 5].str, 5);
                    // console.log(content[id + 12 + 22 + 6].str, 6);
                    // console.log(content[id + 12 + 22 + 7].str, 7);
                if (secondPara) {
                    for (let i = 0; i < predmets.length; i++) {
                        const predmet = predmets[i];
                        if (secondPara.indexOf(predmet) > 0) {
                            secondPara = `Вторая пара: ${predmet}`
                            break
                        };
                        if (i === predmets.length - 1) {
                            if (secondPara.indexOf(predmet) > 0) secondPara = `Вторая пара: ${predmet}`;
                            else secondPara = ''
                        }

                    }
                }
            }
            if (
                (content[id + 12 + 22 + 22].str !== ' ' || content[id + 12 + 22 + 22 + 1].str !== ' ') &&
                (content[id + 12 + 22 + 22 + 1].str !== ' ' || content[id + 12 + 22 + 22 + 2].str !== ' ') &&
                (content[id + 12 + 22 + 22 + 3].str !== ' ' || content[id + 12 + 22 + 22 + 4].str !== ' ') &&
                (content[id + 12 + 22 + 22 + 5].str !== ' ' || content[id + 12 + 22 + 22 + 6].str !== ' ')
                // (content[id + 12 + 22 + 22 + 6].str !== ' ' || content[id + 12 + 22 + 22 + 7].str !== ' ')
            ) {
                nextPara = `${content[id + 22+22 + 12].str} ${content[id + 12 + 22 +22 + 1].str} ${content[id + 12 +22 + 22+ 1].str} ${content[id + 12+22 + 22 + 3].str} ${content[id + 12+22 + 22 + 4].str} ${content[id + 12+22 + 22+ 5].str} ${content[id + 12 +22 + 22+ 6].str} ${content[id + 12 +22 + 22 + 7].str}`
                    // console.log(content[id + 12 + 22 + 22].str);
                    // console.log(content[id + 12 + 22 + 22 + 1].str, 1);
                    // console.log(content[id + 12 + 22 + 22 + 2].str, 2);
                    // console.log(content[id + 12 + 22 + 22 + 3].str, 3);
                    // console.log(content[id + 12 + 22 + 22 + 4].str, 4);
                    // console.log(content[id + 12 + 22 + 22 + 5].str, 5);
                    // console.log(content[id + 12 + 22 + 22 + 6].str, 6);
                    // console.log(content[id + 12 + 22 + 22 + 7].str, 7);
                if (nextPara) {
                    for (let i = 0; i < predmets.length; i++) {
                        const predmet = predmets[i];
                        if (nextPara.indexOf(predmet) > 0) {
                            nextPara = `Третья пара: ${predmet}`
                            break
                        };
                        if (i === predmets.length - 1) {
                            if (nextPara.indexOf(predmet) > 0) nextPara = `Третья пара: ${predmet}`;
                            else nextPara = ''
                        }

                    }
                }
            }

            if (
                (content[id + 12 + 22 + 22 + 22].str !== ' ' || content[id + 12 + 22 + 22 + 22 + 1].str !== ' ') &&
                (content[id + 12 + 22 + 22 + 22 + 1].str !== ' ' || content[id + 12 + 22 + 22 + 22 + 2].str !== ' ') &&
                (content[id + 12 + 22 + 22 + 22 + 3].str !== ' ' || content[id + 12 + 22 + 22 + 22 + 4].str !== ' ') &&
                (content[id + 12 + 22 + 22 + 22 + 5].str !== ' ' || content[id + 12 + 22 + 22 + 22 + 6].str !== ' ')

            ) {
                lastPara = `${content[id + 22 + 22 + 22 + 12].str} ${content[id + 22 + 12 + 22 + 22 + 1].str} ${content[id + 22 + 12 + 22 + 22 + 1].str} ${content[id + 12 + 22 + 22 + 22 + 3].str} ${content[id + 12 + 22 + 22 + 22 + 4].str} ${content[id + 12 + 22 + 22 + 22 + 5].str} ${content[id + 12 + 22 + 22 + 22 + 6].str} ${content[id + 12 + 22 +22 + 22 + 7].str}`
                    // console.log(content[id + 12 + 22 + 22 + 22].str);
                    // console.log(content[id + 12 + 22 + 22 + 22 + 1].str, 1);
                    // console.log(content[id + 12 + 22 + 22 + 22 + 2].str, 2);
                    // console.log(content[id + 12 + 22 + 22 + 22 + 3].str, 3);
                    // console.log(content[id + 12 + 22 + 22 + 22 + 4].str, 4);
                    // console.log(content[id + 12 + 22 + 22 + 22 + 5].str, 5);
                    // console.log(content[id + 12 + 22 + 22 + 22 + 6].str, 6);
                    // console.log(content[id + 12 + 22 + 22 + 22 + 7].str, 7);
                if (lastPara) {

                    for (let i = 0; i < predmets.length; i++) {
                        const predmet = predmets[i];
                        if (lastPara.indexOf(predmet) > 0) {
                            lastPara = `Четвёртая пара: ${predmet}`
                            break
                        };
                        if (i === predmets.length - 1) {
                            if (lastPara.indexOf(predmet) > 0) lastPara = `Четвёртая пара: ${predmet}`;
                            else lastPara = ''
                        }

                    }
                }

            }

            const dateTitle = `Расписание на ${getDate(date)}.${month}`
            let result = `${dateTitle}\n\n${firstPara}\n${secondPara}\n${nextPara}\n${lastPara}`
            return callback(null, result)
        }

        for (let i = 0; i < content.length; i++) {
            if (content[i].str === '71 (4 курс)' && content[i - 2].str === 'И') {
                getPars(i)
                break
            }
        }
    });
}