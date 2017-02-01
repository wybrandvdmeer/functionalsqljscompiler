exports.chop = function(statement) {
	var result = [];
	var idx1=0;
	var quotedArea = false;
			
	
	for(var idx2 in statement) {

		var c = statement[idx2];

		if(c === '\'') {
			quotedArea = !quotedArea;
			continue;
		}
	
		if((c === '\t' || c === ' ' || c === '\n') && !quotedArea ) {
			idx1++;	
		} else {
			if(result[idx1] === undefined) {
				result[idx1] = '';
			}
			result[idx1] += c;
		}
	}
		
	if(quotedArea) {
		throw new Error('Unmatched quot.');
	}

	return result;
};