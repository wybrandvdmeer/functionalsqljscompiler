var functions = require("./functions.js");

exports.statement = Object.create(functions.FSFunction);

exports.statement.table = undefined;
exports.statement.aliases = new Map();
exports.statement.sql = '';
exports.statement.fromClauses = [];

exports.statement.consumers = [];
exports.statement.consumers[0] = Object.create(functions.Consumer,
{
  singleValue : {
    value:  true
  },
  mandatory : {
    value:  true
  },
  processor: {
    value: (table) => { 
      exports.statement.addFromClause(table + ' ' + exports.statement.getAlias(table));
    }
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

exports.statement.addFromClause = function(fromClause) {
  if(this.fromClauses.indexOf(fromClause) < 0) {
    this.fromClauses.push(fromClause);
  }
};

exports.statement.execute = function() {
  exports.statement.sql = 'SELECT * ';

  this.fromClauses.forEach(function(fromClause, index, array) {
      if(index === 0) {
        exports.statement.sql += ('FROM ' + fromClause);
      } else {
        exports.statement.sql += (fromClause + ' '); 
      }
        
      if(index < array.length - 1) {
        exports.statement.sql += ', ';  
      }
  });
};


