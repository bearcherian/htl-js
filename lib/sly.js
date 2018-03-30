const cheerio = require('cheerio');
const winston = require('winston');
const vm = require('vm');


module.exports = {

    eval: function(expr, data) {
        let strippedExpr = this.stripBrackets(expr);
        if (typeof strippedExpr === 'undefined'){
            return true;
        }
        if (strippedExpr === '') {
            return false;
        }
        let vmScript = vm.createScript(strippedExpr);
        return vmScript.runInNewContext(data);
    },

    test: function (htl) {

        let $ = cheerio.load(htl);
        let testAttr = $('body').children().first().attr('data-sly-test');
        // if no test attr, return true
        if (typeof testAttr === 'undefined' || testAttr === ""){
            return true;
        }

        winston.log('debug','test is ' + testAttr);
        return testAttr === 'true';

    },

    stripBrackets: function(htlExpression) {
        // remove the firs tone
        return htlExpression.replace('${','').replace('}','');
    }
};