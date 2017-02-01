var expect  = require("chai").expect;
var compiler = require("../app/functionalsql.js");
var chopper = require("../app/chopper.js");

/*

describe("Test chopper.", function () {
	it("Test chopper.", function() {
		expect(chopper.chop('abc')).to.deep.equal(['abc']);
		expect(chopper.chop('a b c')).to.deep.equal(['a', 'b', 'c']);
		expect(chopper.chop("a 'b c'")).to.deep.equal(['a', 'b c']);
		expect(chopper.chop.bind(chopper, "a 'b c")).to.throw(Error, /Unmatched quot/);
	});
}); 

describe("Test Compiler IO.", function () {
	it("Null statement.", function() {
		expect(compiler.parse.bind(compiler)).to.throw(Error, /No statement defined./);
	});
}); 
*/

describe("Test select.", function() {
	it("Full select.", function() {
		var statement = compiler.parse('a');
		expect(statement).to.equal('SELECT * FROM a');
	});
});