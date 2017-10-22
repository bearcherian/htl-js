const sly = require('../lib/sly');

let assert = require('chai').assert;

const data = {
    "model": {
        "imagePath": "/content/dam/my-app/image.jpg"
    },
    properties: {
        "title": "Lorem Ipsum",
        "description": "Donec ac metus fermentum, iaculis mi eu, blandit leo. Fusce eros tortor, aliquet vel est non, bibendum condimentum leo.",
        'isTrue': true
    }
};

describe("sly tests", function(){
    describe("sly.stripBrackets()", function() {
        it("stripBrackets simple", function() {
            assert.equal(sly.stripBrackets('${properties.description}'), 'properties.description');
        });

        it("stripBrackets with format", function() {
            assert.equal(sly.stripBrackets('${properties.description @ extension=\'html\'}'), 'properties.description @ extension=\'html\'');
        });

    });

    describe("sly.test()", function(){

        it("expression no test attr", function() {
            assert.equal(sly.test('<div><p>Hello World</p></div>',data), true);
        });

        //TODO Verify this with AEM
        it("expression empty test attr", function() {
            assert.equal(sly.test('<div data-sly-test=""><p>Hello World</p></div>',data), true);
        });

        it("expression test simple property", function() {
            assert.equal(sly.test('<div data-sly-test="${properties.isTrue}"><p>Hello World</p></div>',data), true);
        });

        it("expression test simple property negation", function() {
            assert.equal(sly.test('<div data-sly-test="${!properties.isTrue}"><p>Hello World</p></div>',data), false);
        });

        it("expression test bool '=='", function() {
            assert.equal(sly.test('<div data-sly-test="${properties.isTrue == true}"><p>Hello World</p></div>',data), true);
        });

        it("expression test bool '!='", function() {
            assert.equal(sly.test('<div data-sly-test="${properties.isTrue != true}"><p>Hello World</p></div>',data), false);
        });


        it("expression test string '=='", function() {
            assert.equal(sly.test('<div data-sly-test="${properties.title == \'Lorem Ipsum\'}"><p>Hello World</p></div>',data), true);
        });

        it("expression test string '!='", function() {
            assert.equal(sly.test('<div data-sly-test="${properties.title != \'Lorem Ipsum\'}"><p>Hello World</p></div>',data), false);
        });

        it("expression test different string '=='", function() {
            assert.equal(sly.test('<div data-sly-test="${properties.title == \'Dolor Sit\'}"><p>Hello World</p></div>',data), false);
        });

        it("expression test different string '!='", function() {
            assert.equal(sly.test('<div data-sly-test="${properties.title != \'Dolor Sit\'}"><p>Hello World</p></div>',data), true);
        });
    })
});
;

