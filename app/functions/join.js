var functions = require("./functions.js");

exports.join = Object.create(functions.FSFunction);

exports.join.joinTable = undefined;
exports.join.joinFieldDriveTable = undefined;
exports.join.joinFieldJoinTable = undefined;

exports.join.consumers = [];
exports.join.consumers[0] = Object.create(functions.Consumer,
{
  singleValue: {
    value:  true  
  },
  mandatory: {
    value:  true
  },
  processor: {
    value: (token) => {
      exports.join.joinTable = token;
    }
  }
});
exports.join.consumers[1] = Object.create(functions.Consumer,
{
  singleValue: {
    value:  true
  },
  processor: {
    value: (token) => {
      exports.join.joinFieldDriveTable = token;
    }
  }
});
exports.join.consumers[2] = Object.create(functions.Consumer,
{
  singleValue: {
    value:  true
  },
  processor: {
    value: (token) => {
      exports.join.joinFieldJoinTable = token;
    }
  }
});
exports.join.consumers[3] = Object.create(functions.Consumer,
{
  onlyFunctions: {
    value:  true
  }
});
exports.join.execute = function() {
  var alias = this.getStatement().getAlias(exports.join.joinTable);
  this.getStatement().addFromClause(exports.join.joinTable + ' ' + alias);
};