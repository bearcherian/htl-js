const renderer = require('../lib/renderer');
const assert = require('chai').assert;

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

describe("Render", function(){
    it ("render with true data-sly-test", function(){
        assert.equal(renderer.render('<div data-sly-test="${properties.isTrue}"><p>Hello World</p></div>', data), '<div><p>Hello World</p></div>');
    });

    it ("render with false data-sly-test", function(){
        assert.equal(renderer.render('<div data-sly-test="${!properties.isTrue}"><p>Hello World</p></div>', data), '');
    });

    it ("render with true and false data-sly-tests", function(){
        assert.equal(renderer.render('<div class="wraper"><div data-sly-test="${properties.isTrue}"><p>Hello World</p></div><div data-sly-test="${!properties.isTrue}"><p>Hello Earth</p></div></div>', data), '<div class="wraper"><div><p>Hello World</p></div></div>');
    });

    it ("render with nested data-sly-test", function(){
        assert.equal(renderer.render('<div data-sly-test="${properties.isTrue}"><p>Hello World<span data-sly-test="${!properties.isTrue}">and friends</span></p></div>', data), '<div><p>Hello World</p></div>');
    });
});