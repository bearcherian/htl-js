const cheerio  = require('cheerio');
const sly = require('../lib/sly');
const winston = require('winston');
module.exports = {
    _renderTests: function(htl, data) {

        //TODO break tests out as a separate step
        let $ = cheerio.load(htl);
        let renderedElement = '';
        $('body').contents().each(function(i,element){
            let elementHtml = $.html(element);
            if (sly.test(elementHtml,data)) {
                // if true, add to element and remove innerHTML
                renderedElement = $(element).clone();
                $(renderedElement).removeAttr("data-sly-test");

                if ($(element).contents().length > 0) {
                    $(renderedElement).html( module.exports.render($(element).html(),data) );
                }
            } else {
                $(element).remove();
            }
        });

        return renderedElement === '' ? renderedElement : $.html(renderedElement);
    },

    render: function(htl, data) {

        let renderedHtml = this._renderTests(htl, data);

        return renderedHtml;
    }
};