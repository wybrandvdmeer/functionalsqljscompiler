var expect  = require("chai").expect;
var compiler = require("../app/functionalsql.js");
var chopper = require("../app/chopper.js");

/*
describe("Test chopper.", function () {
	it("Test chopper.", function() {
		expect(chopper.chop('abc')).to.deep.equal(['abc']);
		expect(chopper.chop('a b c')).to.deep.equal(['a', 'b', 'c']);
		expect(chopper.chop("a 'b c'")).to.deep.equal(['a', 'b c']);
		expect(chopper.chop("a join( b )")).to.deep.equal(['a', 'join', '(', 'b', ')']);
		expect(chopper.chop("a join(b )")).to.deep.equal(['a', 'join', '(', 'b', ')']);
		expect(chopper.chop("a join(b,id,id)")).to.deep.equal(['a', 'join', '(', 'b', ',', 'id', ',', 'id', ')']);
		expect(chopper.chop("a join(' , a bc')")).to.deep.equal(['a', 'join', '(', ' , a bc', ')']);
		expect(chopper.chop(" a join(b)")).to.deep.equal(['a', 'join', '(', 'b', ')']);
		expect(chopper.chop.bind(chopper, "a 'b c")).to.throw(Error, /Unmatched quot/);
	});
}); 

describe("Test Compiler IO.", function () {
	it("Null statement.", function() {
		expect(compiler.parse.bind(compiler)).to.throw(Error, /No statement defined./);
	});
}); 
*/

/*
describe("Test select.", function() {
	it("Full select.", function() {
		expect(compiler.parse('a')).to.equal('SELECT * FROM a');
	});
});
*/

describe("Test join", function() {
	it("join", function() {
		expect(compiler.parse('a join(b, id, id)')).to.equal('SELECT * FROM a t0, b t1 WHERE t0.id = t1.id');
	});
});





