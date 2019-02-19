var RangeCollection = require('../RangeCollection.js');
var assert = require('assert');
var test = {};
exports.test = test;
const rc = new RangeCollection();

test.add_method_should_add_the_range_into_range_collection = function(){
	rc.add([1, 5]);
	assert.equal(rc.getResult(), '[1, 5)')
	rc.add([10, 20]);
	assert.equal(rc.getResult(), '[1, 5) [10, 20)');
};

test.add_method_skip_already_added_range = function(){
	rc.add([20, 20]);
	assert.equal(rc.getResult(), '[1, 5) [10, 20)');
};

test.add_method_increase_the_range_if_start_number_present_between_any_range = function(){
	rc.add([20, 21]);
	assert.equal(rc.getResult(), '[1, 5) [10, 21)');
};

test.add_method_skip_already_added_range_2 = function(){
	rc.add([2, 4]);
	assert.equal(rc.getResult(), '[1, 5) [10, 21)');
};

test.add_method_increase_the_range_if_start_number_present_between_any_range_2 = function(){
	rc.add([3, 8]);
	assert.equal(rc.getResult(), '[1, 8) [10, 21)');
};

test.remove_method_should_only_remove_the_range_from_start_to_end_exclusive = function(){
	rc.remove([10, 10]);
	assert.equal(rc.getResult(), '[1, 8) [10, 21)')
	rc.remove([10, 11]);
	assert.equal(rc.getResult(), '[1, 8) [11, 21)');
};

test.remove_method_should_remove_the_range_from_range_collection = function(){
	rc.remove([15, 17]);
	assert.equal(rc.getResult(), '[1, 8) [11, 15) [17, 21)')
};

test.remove_method_should_remove_the_range_from_range_collection_2 = function(){
	rc.remove([3, 19]);
	assert.equal(rc.getResult(), '[1, 3) [19, 21)')
};