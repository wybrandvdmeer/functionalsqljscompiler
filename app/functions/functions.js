var ERR_FUNCTION_HAS_TOO_MANY_ARGUMENTS = 'Function has too many arguments.';
var ERR_EXPECTING_A_FUNCTION_INSTEAD_OF = 'Expecting a function instead of ';

exports.Consumer = {
	values: [],
	mandatory: false,
	singleValue: false,
	consumed: false,
	onlyFunctions: false,
	isFunction: function(token) {
		while(token.prototype !== null) {
			if(Object.getPrototypeOf(token) === exports.FSFunction) {
				return true;	
			}
			token = token.prototype;
		}
		return false;
	},
	processor: undefined,
	consume: function(token) {
		if(this.onlyFunctions && !this.isFunction(token)) {
			throw new Error(ERR_EXPECTING_A_FUNCTION_INSTEAD_OF + 'token');
		}
		if(this.processor !== undefined) {
			this.processor(token);
		}
	},
	execute: function() {
	}
};

exports.FSFunction = {
	argument: 0,
	consumers: [],
	getStatement: undefined,
	process: function(token) {
		if(this.consumers[this.argument] === undefined) {
			throw new Error(ERR_FUNCTION_HAS_TOO_MANY_ARGUMENTS);
		}

		var consumer = this.consumers[this.argument];

		consumer.consume(token);

		if(consumer.singleValue) {
			this.argument++;
		} 
	}
};



