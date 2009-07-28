/* @require "jsspec" */
/* @require "subtleheartbeat.js" */

var should = this.should || {};
should.before = should.after = function(){
	SubtleHeartBeat.reset();
};


should['be true'] = function(){
	value_of(true).should_be_true();
};

should['exist'] = function(){
	value_of( SubtleHeartBeat ).should_not_be_undefined();
};

should['reset one'] = function(){
	value_of( SubtleHeartBeat.getContext().id ).should_be( 'default' );
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(0);
	var fn = function(){};
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	
	SubtleHeartBeat.setContext(1);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	
	SubtleHeartBeat.setContext(2);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	
	SubtleHeartBeat.setContext();
	value_of( SubtleHeartBeat.getContext().id ).should_be( 'default' );
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(3);
	SubtleHeartBeat.getContext().reset();
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(0);
	
	SubtleHeartBeat.setContext(1);
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(3);
	SubtleHeartBeat.getContext().reset();
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(0);
	
	SubtleHeartBeat.setContext(2);
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(3);
	SubtleHeartBeat.getContext().reset();
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(0);
};

should['reset all'] = function(){
	value_of( SubtleHeartBeat.getContext().id ).should_be( 'default' );
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(0);
	var fn = function(){};
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	
	SubtleHeartBeat.setContext(1);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	
	SubtleHeartBeat.setContext(2);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().delay(fn, 1000);
	
	SubtleHeartBeat.setContext();
	value_of( SubtleHeartBeat.getContext().id ).should_be( 'default' );
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(3);
	SubtleHeartBeat.reset();
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(0);
	
	SubtleHeartBeat.setContext(1);
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(0);
	
	SubtleHeartBeat.setContext(2);
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(0);
};

should['add function on "delay"'] = function(){
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(0);
	
	var result = 0;
	var fn = function(){ result++; };
	
	SubtleHeartBeat.getContext().delay(fn, 1000);
	value_of( SubtleHeartBeat.getContext()._rhythm[0].delay ).should_be(1000);
	value_of( SubtleHeartBeat.getContext()._rhythm[0].fn ).should_be(fn);
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(1);
};

should['run function on beat'] = function(){
	SubtleHeartBeat.reset();
	SubtleHeartBeat.getContext().reset();
	console.log(SubtleHeartBeat.getContext()._rhythm);
	value_of( SubtleHeartBeat.getContext()._rhythm.length ).should_be(0);
	
	var result = 0;
	var fn = function(){ result++; };

	value_of( result ).should_be( 0 );
	fn();
	value_of( result ).should_be( 1 );
	
	SubtleHeartBeat.getContext().delay(fn, 1000);
	SubtleHeartBeat.getContext().beat();
	
	var self = SubtleHeartBeat.getContext();
	console.log(self._rhythm);
	var beater = self._rhythm.shift();
	console.log(beater);
	if (beater) beater.fn.apply(beater.object, beater.args);
	
	
	value_of( result ).should_be( 2 );
};

should['throw when delaying not a function but not when beating'] = function(){
	var errored;
	
	errored = false;
	try { SubtleHeartBeat.delay('foo'); }
	catch(e){ errored = true; };
	value_of( errored ).should_be_true();
	
	SubtleHeartBeat.getContext().beat();
};

should['support contexts'] = function(){
	var result1 = 0;
	var result2 = 0;
	
	SubtleHeartBeat.setContext(1);
	SubtleHeartBeat.delay(function(){ result1++; }, 1000);
	
	SubtleHeartBeat.setContext(2);
	SubtleHeartBeat.delay(function(){ result2++; }, 1000);
	
	value_of( result1 ).should_be( 0 );
	value_of( result2 ).should_be( 0 );
	
	SubtleHeartBeat.setContext(1);
	SubtleHeartBeat.beat();
	
	value_of( result1 ).should_be( 1 );
	value_of( result2 ).should_be( 0 );
	
	SubtleHeartBeat.setContext(2);
	SubtleHeartBeat.beat();
	
	value_of( result1 ).should_be( 1 );
	value_of( result2 ).should_be( 1 );
};


describe('SubtleHeartBeat', should);
