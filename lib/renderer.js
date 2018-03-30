const cheerio  = require('cheerio');
const sly = require('../lib/sly');
const winston = require('winston');
const DATA_SLY_TEST_VAL_EXPR = /data-sly-test\.([a-zA-Z0-9]*?)="(.*?)"/g;

module.exports = {

    _renderTests: function(htl, data) {

        //TODO break tests out as a separate step
        let $ = cheerio.load(htl);
        let renderedElement = '';
        $('body').contents().each(function(i,element){
            let elementHtml = $.html(element);
            if (sly.test(elementHtml)) {
                // if true, add to element and remove innerHTML
                renderedElement = $(element).clone();
                $(renderedElement).removeAttr("data-sly-test");

                if ($(element).contents().length > 0) {
                    $(renderedElement).html( module.exports._renderTests($(element).html()) );
                }
            } else {
                $(element).remove();
            }
        });

        return renderedElement === '' ? renderedElement : $.html(renderedElement);
    },

    _evaluateExpressions: function(htl, data){
        return htl.replace(/(\${.*?})/,function(match, capture) {
            let value = sly.eval(capture, data);
            return value;
        });
    },

    render: function(htl, data) {

        let evaluatedHtl = this._evaluateStoredTests(htl,data);
        let renderedHtml = this._renderTests(this._evaluateExpressions(evaluatedHtl,data));

        return renderedHtml;
    },

    _evaluateStoredTests: function(htl, data){
        return htl.replace(DATA_SLY_TEST_VAL_EXPR, function(match, property, expr){
            let value = expr.replace(/(\${.*?})/, function (match, capture) {
                return sly.eval(capture, data);
            });
            data[property] = value;

            return "data-sly-test=\"" + value + "\"";
        });
    }
};