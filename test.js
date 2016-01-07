'using strict;'

var sizeomatic = require('./index.js');
var chai = require('chai');
chai.should();

describe('sizeomatic', function ()
{
	describe('howManyBytes', function ()
	{
		describe('when given number or numbers ending in -b (any case)', function ()
		{
			it('should convert numbers to bytes', function ()
			{
				sizeomatic.howManyBytes(125).should.equal(125);
			});

			it('should convert b to bytes', function ()
			{
				sizeomatic.howManyBytes('125b').should.equal(125);
			});

			it('should convert B to bytes', function ()
			{
				sizeomatic.howManyBytes('125B').should.equal(125);
			});
		});

		describe('when given number suffixed with k or kb (any case)', function ()
		{
			it('should convert k to bytes', function ()
			{
				sizeomatic.howManyBytes('125k').should.equal(128000);
			});

			it('should convert K to bytes', function ()
			{
				sizeomatic.howManyBytes('125K').should.equal(128000);
			});

			it('should convert kb to bytes', function ()
			{
				sizeomatic.howManyBytes('125kb').should.equal(128000);
			});

			it('should convert KB to bytes', function ()
			{
				sizeomatic.howManyBytes('125KB').should.equal(128000);
			});

			it('should convert Kb to bytes', function ()
			{
				sizeomatic.howManyBytes('125Kb').should.equal(128000);
			});

			it('should convert kB to bytes', function ()
			{
				sizeomatic.howManyBytes('125Kb').should.equal(128000);
			});
		});

		describe('when given number suffixed with m or mb (any case)', function ()
		{
			it('should convert m to bytes', function ()
			{
				sizeomatic.howManyBytes('125m').should.equal(131072000);
			});

			it('should convert M to bytes', function ()
			{
				sizeomatic.howManyBytes('125M').should.equal(131072000);
			});

			it('should convert mb to bytes', function ()
			{
				sizeomatic.howManyBytes('125mb').should.equal(131072000);
			});

			it('should convert MB to bytes', function ()
			{
				sizeomatic.howManyBytes('125MB').should.equal(131072000);
			});

			it('should convert Mb to bytes', function ()
			{
				sizeomatic.howManyBytes('125Mb').should.equal(131072000);
			});

			it('should convert mB to bytes', function ()
			{
				sizeomatic.howManyBytes('125mB').should.equal(131072000);
			});
		});

		describe('when given number suffixed with g or gb (any case)', function ()
		{
			it('should convert g to bytes', function ()
			{
				sizeomatic.howManyBytes('125g').should.equal(134217728000);
			});

			it('should convert G to bytes', function ()
			{
				sizeomatic.howManyBytes('125G').should.equal(134217728000);
			});

			it('should convert gb to bytes', function ()
			{
				sizeomatic.howManyBytes('125gb').should.equal(134217728000);
			});

			it('should convert GB to bytes', function ()
			{
				sizeomatic.howManyBytes('125GB').should.equal(134217728000);
			});

			it('should convert Gb to bytes', function ()
			{
				sizeomatic.howManyBytes('125Gb').should.equal(134217728000);
			});

			it('should convert gB to bytes', function ()
			{
				sizeomatic.howManyBytes('125gB').should.equal(134217728000);
			});
		});

		it('should treat negative numbers by their absolute values', function ()
		{
			sizeomatic.howManyBytes('-1k').should.equal(1024);
		});

		it('should return false if value passed is not a number with an optional suffix of [b|k|m|g]b?' , function ()
		{
			sizeomatic.howManyBytes('f1k').should.be.false;
		});
	});

	describe('getSize', function ()
	{
		it('should return 0 when given undefined', function ()
		{
			sizeomatic.getSize().should.equal(0);
		});

		it('should return 0 when given null', function ()
		{
			sizeomatic.getSize(null).should.equal(0);
		});

		it('should return 4 when given true', function ()
		{
			sizeomatic.getSize(true).should.equal(4);
		});

		it('should return 4 when given false', function ()
		{
			sizeomatic.getSize(false).should.equal(4);
		});

		it('should return 8 for any number passed (0)', function ()
		{
			sizeomatic.getSize(0).should.equal(8);
		});

		it('should return 8 for any number passed (1)', function ()
		{
			sizeomatic.getSize(1).should.equal(8);
		});

		it('should return 8 for any number passed (-2561)', function ()
		{
			sizeomatic.getSize(-2561).should.equal(8);
		});

		it('should return 8 for any number passed (68796546489)', function ()
		{
			sizeomatic.getSize(68796546489).should.equal(8);
		});

		it('should return 2 * length of string for all strings (B)', function ()
		{
			sizeomatic.getSize('B').should.equal(2);
		});

		it('should return 2 * length of string for all strings (bAnaAa5)', function ()
		{
			sizeomatic.getSize('bAnaAa5').should.equal(14);
		});

		it('should return 2 * length of string for all strings (bAnaAa5)', function ()
		{
			sizeomatic.getSize('bAnaAa5').should.equal(14);
		});

		it('should return 2 * length of string for all strings (bAnaAa5 are eloquent^$)', function ()
		{
			sizeomatic.getSize('bAnaAa5 are eloquent^$').should.equal(44);
		});

		it('should return the sum of all values for an array', function ()
		{
			sizeomatic.getSize([ true, 5501, "this is a test string" ]).should.equal(54);
		});

		it('should return the sum of all keys and values for a simple object', function ()
		{
			sizeomatic.getSize({ b : false, n: 65, s: "holy cow batman" }).should.equal(48);
		});

		it('should return the sum of all keys and values for a complex object with nested arrays and objects', function ()
		{
			sizeomatic.getSize({ b : false, n: 65, s: "holy cow batman", a : [ true, 5501, "this is a test string" ], o: { k1 : true, k2 : -100, k3: "nested" } }).should.equal(142);
		});
	});

	describe('pretty', function ()
	{
		var bytes = 1024;
		var kbytes = bytes * 1024;
		var mbytes = kbytes * 1024;
		var gbytes = mbytes * 1024;

		it('should format numbers less than ' + bytes + ' as bytes', function ()
		{
			sizeomatic.pretty(900).should.equal('900B');
		});

		it('should format numbers between ' + bytes + ' and ' + kbytes + ' as kilobytes', function ()
		{
			sizeomatic.pretty(900000).should.equal('878.906K');
		});

		it('should format numbers between ' + kbytes + ' and ' + mbytes + ' as megabytes', function ()
		{
			sizeomatic.pretty(900000000).should.equal('858.307M');
		});

		it('should format numbers between ' + mbytes + ' and ' + gbytes + ' as gigabytes', function ()
		{
			sizeomatic.pretty(90000000000).should.equal('83.819G');
		});

		it('should treat negative numbers by their absolute values', function ()
		{
			sizeomatic.pretty(-1).should.equal('1B');
		});

		it('should return 0 when value passed is NaN', function ()
		{
			sizeomatic.pretty('1b').should.equal(0);
		});
	});
});