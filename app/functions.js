function FSFunction() {
	this.functionArguments = [];
}

FSFunction.prototype.process = function(token) {
	this.functionArguments.push(token);
};


FSFunction.prototype.toString = function() {
	return 'FSFunction';
};

/* Statement.
*/
exports.Statement = function() {
	FSFunction.call(this);
};
exports.Statement.prototype = Object.create(FSFunction.prototype);
exports.Statement.prototype.toString = function() {
	return 'statement';
};

/* Join. 
*/
exports.Join = function() {
	FSFunction.call(this);
};
exports.Join.prototype = Object.create(FSFunction.prototype);
exports.Join.prototype.toString = function() {
	return 'join';
};