describe('SubtleHeartBeat', function(){
	
	beforeEach(function(){
		SubtleHeartBeat.reset();
	});
	
	describe('Startup',function(){
		
		it('should be true', function(){
			expect(true).toEqual(true);
		});
		it('should exist', function(){
			expect( SubtleHeartBeat ).toBeDefined();
		});
		
	});
	
	describe('Resetting',function(){
		
		it('should reset one',function(){
			expect( SubtleHeartBeat.getContext().id ).toEqual( 'default' );
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(0);
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
			expect( SubtleHeartBeat.getContext().id ).toEqual( 'default' );
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(3);
			SubtleHeartBeat.getContext().reset();
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(0);
			
			SubtleHeartBeat.setContext(1);
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(3);
			SubtleHeartBeat.getContext().reset();
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(0);
			
			SubtleHeartBeat.setContext(2);
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(3);
			SubtleHeartBeat.getContext().reset();
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(0);
		});
		
		it('should reset all',function(){
			expect( SubtleHeartBeat.getContext().id ).toEqual( 'default' );
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(0);
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
			expect( SubtleHeartBeat.getContext().id ).toEqual( 'default' );
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(3);
			SubtleHeartBeat.reset();
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(0);
			
			SubtleHeartBeat.setContext(1);
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(0);
			
			SubtleHeartBeat.setContext(2);
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(0);
		});
		
	});
	
	describe('Adding and Running',function(){
		
		it('should add function on "delay"', function(){
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(0);
			
			var result = 0;
			var fn = function(){ result++; };
			
			SubtleHeartBeat.getContext().delay(fn, 1000);
			expect( SubtleHeartBeat.getContext()._rhythm[0].delay ).toEqual(1000);
			expect( SubtleHeartBeat.getContext()._rhythm[0].fn ).toEqual(fn);
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(1);
		});
		
		it('should run function on beat', function(){
			SubtleHeartBeat.reset();
			SubtleHeartBeat.getContext().reset();
			console.log(SubtleHeartBeat.getContext()._rhythm);
			expect( SubtleHeartBeat.getContext()._rhythm.length ).toEqual(0);
			
			var result = 0;
			var fn = function(){ result++; };
			
			expect( result ).toEqual( 0 );
			fn();
			expect( result ).toEqual( 1 );
			
			SubtleHeartBeat.getContext().delay(fn, 1000);
			SubtleHeartBeat.getContext().beat();
			
			var self = SubtleHeartBeat.getContext();
			console.log(self._rhythm);
			var beater = self._rhythm.shift();
			console.log(beater);
			if (beater) beater.fn.apply(beater.object, beater.args);
			
			
			expect( result ).toEqual( 2 );
		});
		
		it('should throw when delaying not a function but not when beating', function(){
			var errored;
			
			errored = false;
			try { SubtleHeartBeat.delay('foo'); }
			catch(e){ errored = true; };
			expect( errored ).toEqual(true);
			
			SubtleHeartBeat.getContext().beat();
		});
		
	});
	
	it('should support contexts', function(){
		var result1 = 0;
		var result2 = 0;
		
		SubtleHeartBeat.setContext(1);
		SubtleHeartBeat.delay(function(){ result1++; }, 1000);
		
		SubtleHeartBeat.setContext(2);
		SubtleHeartBeat.delay(function(){ result2++; }, 1000);
		
		expect( result1 ).toEqual( 0 );
		expect( result2 ).toEqual( 0 );
		
		SubtleHeartBeat.setContext(1);
		SubtleHeartBeat.beat();
		
		expect( result1 ).toEqual( 1 );
		expect( result2 ).toEqual( 0 );
		
		SubtleHeartBeat.setContext(2);
		SubtleHeartBeat.beat();
		
		expect( result1 ).toEqual( 1 );
		expect( result2 ).toEqual( 1 );
	});
	
});
