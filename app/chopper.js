exports.chop = function(statement) {
	var result = [];
	var argument=-1;
	var quoted = false;
	var nextArgument=true;
			
	for(var idx2 in statement) {

		var c = statement[idx2];

		if(c === '\'') {
			quoted = !quoted;
			continue;
		}

		if(!quoted) {

			if(isWhiteSpace(c)) {
				nextArgument = true;
				continue;
			}

			if(isSpecialChar(c)) {
				nextArgument = true;
			}
		}

		if(nextArgument) {
			argument++;
		}
			
		nextArgument = false;

		if(result[argument] === undefined) {
			result[argument] = '';
		}

		result[argument] += c;

		if(!quoted && isSpecialChar(c)) {
			nextArgument = true;
		}
	}
		
	if(quoted) {
		throw new Error('Unmatched quot.');
	}

	return result;
};

function isWhiteSpace(c) {
	return c === '\t' || c === '\n' || c === ' ' || c === '\n';
}

function isSpecialChar(c) {
	return c === '(' || c === ')' || c === ',';
}