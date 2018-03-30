const sly = require('../lib/sly');

let assert = require('chai').assert;
let should = require('chai').should();

let data = {
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
    
    describe("sly.eval()", function(){

        it("empty expression", function() {
            assert.equal(sly.eval('',data), false);
        });

        it("expression: simple property", function() {
            assert.equal(sly.eval('properties.isTrue',data), true);
        });

        it("expression: simple property negation", function() {
            assert.equal(sly.eval('!properties.isTrue',data), false);
        });

        it("expression: bool '=='", function() {
            assert.equal(sly.eval('properties.isTrue == true',data), true);
        });

        it("expression: bool '!='", function() {
            assert.equal(sly.eval('properties.isTrue != true',data), false);
        });


        it("expression: string '=='", function() {
            assert.equal(sly.eval('properties.title == \'Lorem Ipsum\'',data), true);
        });

        it("expression: string '!='", function() {
            assert.equal(sly.eval('properties.title != \'Lorem Ipsum\'',data), false);
        });

        it("expression: different string '=='", function() {
            assert.equal(sly.eval('properties.title == \'Dolor Sit\'',data), false);
        });

        it("expression: different string '!='", function() {
            assert.equal(sly.eval('properties.title != \'Dolor Sit\'',data), true);
        });

    })
});
;

