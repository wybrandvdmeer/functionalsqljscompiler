var statementLib = require("./functions/statement.js");
var joinLib = require("./functions/join.js");
var chopper = require("./chopper.js");

var ERR_FUNCTION_HAS_NO_OPENING_BRACKET = "Function has no opening bracket.";
var ERR_UNEXPECTED_END_OF_FUNCTION = "Unexpected end of function.";

var statementStack = [];
var functionsArr = new Map();
var tokens = [];

exports.parse = function(statementString) {

 	if(statementString === undefined) {
 		throw new Error('No statement defined.');
 	}

 	var statement = Object.create(statementLib.statement);
 	functionsArr.set('(', statement);
 	functionsArr.set('join', Object.create(joinLib.join));

 	tokens = chopper.chop(statementString);

 	parseFunction(statement);
 	statement.execute();

 	return statement.sql;
};

function pop() {
	if(tokens.length === 0) {
		return null;
	}	
	return tokens.shift();
}

function getFunction(token) {
	return functionsArr.get(token);
}

function parseFunction(currentFunction) {
	var token;

	if(Object.getPrototypeOf(currentFunction) !== statementLib.statement) {
		if(pop() !== '(') {
			throw new Error(ERR_FUNCTION_HAS_NO_OPENING_BRACKET);
		}
	} else {
		statementStack.push(currentFunction);	
	}

	do {
		if((token = pop()) === null) {
			break;
		}

		var processingFunction = getFunction(token);

		if(processingFunction !== undefined) {
			processingFunction = Object.create(processingFunction);
			processingFunction.compiler = this;

			parseFunction(processingFunction);

			processingFunction.execute();
		} else {
			currentFunction.process(token);	
		}

		if(Object.getPrototypeOf(currentFunction) === statementLib.statement) {
			continue;
		}

		/* After processing argument of function, expect ',' or ')'. 
		*/
		token = pop();

		switch(token !== null ? token : "" ) {
			case ',':
			case ')':
			break;
			default: throw new Error(ERR_UNEXPECTED_END_OF_FUNCTION);
		}
	} while(token !== ")");

	if(Object.getPrototypeOf(currentFunction) === statementLib.statement) {
		statementStack.pop(currentFunction);	
	}
}

var getStatement = function() {
	return statementStack[statementStack.length];
};