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
	consume: function(token) {
		if(this.onlyFunctions && !this.isFunction(token)) {
			throw new Error(ERR_EXPECTING_A_FUNCTION_INSTEAD_OF + 'token');
		}
		this.values.push(token);
	},
	execute: function() {
	}
};

exports.FSFunction = {
	argument: 0,
	consumers: [],
	process: function(token) {
		if(this.consumers[this.argument] === undefined) {
			throw new Error(ERR_FUNCTION_HAS_TOO_MANY_ARGUMENTS);
		}

		var consumer = this.consumers[this.argument];

		consumer.consume(token);

		if(consumer.singleValue) {
			this.argument++;
		} 
	},
	compiler: undefined
};



