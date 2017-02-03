var functions = require("./functions.js");

exports.join = Object.create(functions.FSFunction);
exports.join.consumers[0] = Object.create(functions.Consumer,
{
  singleValue: {
    value:  true  
  },
  mandatory: {
    value:  true
  }
});
exports.join.consumers[1] = Object.create(functions.Consumer,
{
  singleValue: {
    value:  true
  }
});
exports.join.consumers[2] = Object.create(functions.Consumer,
{
  singleValue: {
    value:  true
  }
});
exports.join.consumers[3] = Object.create(functions.Consumer,
{
  onlyFunctions: {
    value:  true
  }
});
exports.join.execute = function() {
  var joinTable = this.consumers[0].values[0];
  var joinFieldDriveTable = this.consumers[1].values[0];
  var joinFieldJoinTable = this.consumers[2].values[0];
  var alias = this.getStatement().getAlias(joinTable);

  this.getStatement().addFromClause(joinTable + ' ' + alias);
};