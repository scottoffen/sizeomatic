var BYTE_RATIO =
{
	Kilobytes : 1024,
	Megabytes : 1024 * 1024,
	Gigabytes : 1024 * 1024 * 1024
};

var FIX_AT = 3;

module.exports.howManyBytes = function (strSize)
{
	if (typeof strSize === 'number') return strSize;

	var size = (typeof strSize !== 'string') ? strSize.toString().toUpperCase() : strSize.toUpperCase();
	size = size.replace(/B$/, "");
	size = size.replace(/^-/, "");

	if ((/^\d+$/).test(size)) return parseInt(size, 10);

	if ((/^\d+[K|M|G]?$/).test(size))
	{
		var unit = size.slice(-1);
		size = parseInt(size.slice(0,-1), 10);

		if (unit === 'K') return size * BYTE_RATIO.Kilobytes;
		else if (unit === 'M') return size * BYTE_RATIO.Megabytes;
		else if (unit === 'G') return size * BYTE_RATIO.Gigabytes;
	}

	return false;
};

module.exports.getSize = function (object, format)
{
	if ((object === undefined) || (object === null)) return 0;

	var objectList = [];
	var stack = [object];
	var bytes = 0;

	while (stack.length)
	{
		var value = stack.pop();

		if (typeof value === 'boolean')
		{
			bytes += 4;
		}
		else if (typeof value === 'string')
		{
			bytes += value.length * 2;
		}
		else if (typeof value === 'number')
		{
			bytes += 8;
		}
		else if (typeof value === 'object' && objectList.indexOf(value) === -1)
		{
			objectList.push(value);

			if (Object.prototype.toString.call(value) != '[object Array]')
			{
				for (var key in value) bytes += 2 * key.length;
			}

			for (var key in value) stack.push(value[key]);
		}
	}

	return bytes;
};

module.exports.pretty = function (bytes)
{
	if (isNaN(bytes)) return 0;
	if (bytes < 0) bytes = bytes * -1;

	if (bytes < BYTE_RATIO.Kilobytes) return bytes + "B";
    else if(bytes < BYTE_RATIO.Megabytes) return(bytes / BYTE_RATIO.Kilobytes).toFixed(FIX_AT) + "K";
    else if(bytes < BYTE_RATIO.Gigabytes) return(bytes / BYTE_RATIO.Megabytes).toFixed(FIX_AT) + "M";
    else return(bytes / BYTE_RATIO.Gigabytes).toFixed(FIX_AT) + "G";
}