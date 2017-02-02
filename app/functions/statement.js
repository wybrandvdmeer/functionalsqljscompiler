var functions = require("./functions.js");

exports.statement = Object.create(functions.FSFunction);
exports.statement.sql = '';
exports.fromClauses = [];
exports.statement.consumers[0] = Object.create(functions.Consumer,
{
  singleValue : {
    value:  true
  },
  mandatory : {
    value:  true
  }
});

exports.statement.consumers[1] = Object.create(functions.Consumer,
{
  onlyFunctions : {
    value:  true
  }
});

exports.statement.aliases = new Map();

exports.statement.getAlias = function(table) {
	if(this.aliases.contains(table)) {
		return aliases.get(table);
	}
	this.aliases.put(table, 't' + this.aliases.size());
};

exports.statement.execute = function() {
	this.sql = 'SELECT * FROM ' + this.consumers[0].values[0];
};

exports.statement.addFromClauses = function(fromClause) {
  if(fromClauses.indexOf(fromClause) < 0) {
    fromClauses.add(fromClause);
  }
};