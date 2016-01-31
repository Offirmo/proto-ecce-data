/** ...
 */
define([
	'lodash',
	'jsen',
	'./parish.schema.json'
],
function(_, jsen, schema) {
	'use strict';
	var MODEL_NAME = 'Parish';

	/////// Validation ///////
	var is_schema_valid = jsen({'$ref': 'http://json-schema.org/draft-04/schema#'})(schema);
	if (! is_schema_valid) throw new Error(MODEL_NAME + ' internal schema is invalid !');
	var _validate = jsen(schema, {
		greedy: true,
		formats: {}
	});

	var build = _validate.build;

	function validate(data) {
		var err = new Error(MODEL_NAME + ' model : provided data are invalid !');
		err.bad_data = _.cloneDeep(data);
		err.validation_errors = [];

		if (!_validate(data)) {
			err.validation_errors = _.cloneDeep(_validate.errors);
			console.error(MODEL_NAME + ' model : validation error !', err.bad_data, err.validation_errors);
			throw err;
		}
	}


	/////// Methods ///////
	function Parish(data) {
		data = build(data || {}, { additionalProperties: false });
		validate(data);

		_.defaults(this, data);
	}

	Parish.create = function(data) {
		return new Parish(data);
	};

	return Parish;
});
