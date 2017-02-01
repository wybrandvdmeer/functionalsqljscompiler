var functions = require("./functions.js");
var chopper = require("./chopper.js");

var FUNCTION_HAS_NO_OPENING_BRACKET = "Function has no opening bracket.";

var statementStack = [];
var functionsArr = new Map();
var tokens = [];

exports.parse = function(statementString) {

 	if(statementString === undefined) {
 		throw new Error('No statement defined.');
 	}

 	functionsArr.set('(', functions.statement);

 	tokens = chopper.chop(statementString);

 	var statement = getFunction('(');

 	parseFunction(statement);
 	statement.execute();

 	return statement.sql;
};

function pop() {
	if(tokens.length === 0) {
		return null;
	}	
	return tokens.pop();
}

function getFunction(token) {
	return functionsArr.get(token);
}

function parseFunction(currentFunction) {
	var token;

	if(currentFunction !== getFunction('(')) {
		if(pop() !== '(') {
			throw new Error(FUNCTION_HAS_NO_OPENING_BRACKET);
		}
	}

	do {
		if((token = pop()) === null) {
			break;
		}

		var processingFunction = getFunction(token);

		if(processingFunction !== undefined) {
			parseFunction(processingFunction);
		} else {
			currentFunction.process(token);	
		}

	} while(token !== ")");
}