/*
	SubtleHeartBeat
	Global timing handler
	Copyright 2009 Thomas Aylott SubtleGradient.com
	MIT License
*/

var SubtleHeartBeat = (function(){
	function Heart(){
		if (this instanceof Heart)
			return this.initialize.call(this, Array.prototype.slice.call(arguments));
		throw new Error('Must be called with `new`');
	};
	
	
	// Instances
	Heart.prototype = {
		
		initialize: function(id, setContext){
			this.id = id;
			if (setContext == null) setContext = true;
			if (setContext) Heart.setContext(id, this);
			this.reset();
		},
		
		reset: function(){
			this._rhythm = [];
			return this;
		},
		
		beat: function(){
			console.log(this._rhythm);
			var beater = this._rhythm.shift();
			console.log(beater);
			if (beater) beater.fn.apply(beater.object, beater.args);
			return this;
		},
		
		delay: function(fn, delay, object, args){
			if (typeof fn != 'function')
				throw new Error('Argument Error: arguments[0] "fn" must be a function; got '+typeof fn+':"'+String(fn)+'"');
			this._rhythm.push({fn:fn, object:object||window, args:args||[], delay:delay||0});
			return this;
		}
	};
	
	
	// Generic
	Heart.delay = function(fn, delay, object, args){ return Heart._context.delay(fn, delay, object, args); };
	Heart.beat = function(){ return Heart._context.beat(); };
	
	
	// Contexts
	Heart.setContext = function(id, context){
		id = String(id || 'default');
		Heart._context = Heart._contexts[id] = (context || Heart._contexts[id] || new Heart(id));
		return Heart;
	};
	
	Heart.getContext = function(id){
		if (id == null) return Heart._context;
		return Heart._contexts[id];
	};
	
	Heart.reset = function(){
		if (Heart._contexts) for (var id in Heart._contexts) {
			Heart._contexts[id].reset();
			delete Heart._contexts[id];
		}
		Heart._contexts = {};
		delete Heart._context;
		Heart.setContext('default');
		return Heart;
	};
	
	
	// Implementation
	Heart.reset();
	return Heart;
})();
