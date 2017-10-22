const cheerio = require('cheerio');
const winston = require('winston');
const vm = require('vm');

module.exports = {
    test: function (htl, data) {
        let $ = cheerio.load(htl);
        let testAttr = $('body').children().first().attr('data-sly-test');
        // if no test attr, return true
        if (typeof testAttr === 'undefined' || testAttr === ""){
            return true;
        }
        let strippedAttr = this.stripBrackets(testAttr);
        let vmScript = vm.createScript(strippedAttr);
        return vmScript.runInNewContext(data);
    },

    stripBrackets: function(htlExpression) {
        // remove the firs tone
        return htlExpression.replace('${','').replace('}','');
    }
};