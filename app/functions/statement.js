var functions = require("./functions.js");

exports.statement = Object.create(functions.FSFunction);
exports.statement.aliases = new Map();
exports.statement.sql = '';
exports.statement.fromClauses = [];
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


exports.statement.getAlias = function(table) {
	if(this.aliases.has(table)) {
		return aliases.get(table);
	}

  var alias = 't' + this.aliases.size;
  this.aliases.set(table, alias);
  return alias;
};

exports.statement.execute = function() {
	this.sql = 'SELECT * FROM ' + this.consumers[0].values[0];
};

exports.statement.addFromClause = function(fromClause) {
  if(this.fromClauses.indexOf(fromClause) < 0) {
    this.fromClauses.push(fromClause);
  }
};