var ERR_FUNCTION_HAS_TOO_MANY_ARGUMENTS = 'Function has too many arguments.';

var Consumer = {
	values: [],
	mandatory: false,
	singleValue: false,
	consumed: false,
	consume: function(token) {
		this.values.push(token);
	}
};

var fsFunction = {
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
	}
};

/* Statement. 
*/
exports.statement = Object.create(fsFunction);
exports.statement.sql = '';
exports.statement.consumers[0] = Object.create(Consumer,
{
  singleValue : {
    value:  true
  },
  mandatory : {
    value:  true
  }
});

exports.statement.consumers[1] = Object.create(Consumer);
exports.statement.execute = function() {
	this.sql = 'SELECT * FROM ' + this.consumers[0].values[0];
};

exports.join = Object.create(fsFunction);
