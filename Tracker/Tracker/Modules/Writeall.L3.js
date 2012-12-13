/**

* @authors richard r. fernandez and Leo Linbeck III


*/

// utility routines

function getGlobalCounter() {
	var gc = ds.GlobalConstant.all();
	if (gc) {
		return parseInt(gc.lastDataFileLoaded);
	}
	
	return 0;
}

function setGlobalCounter(num) {
	var gc = ds.GlobalConstant.all();
	if (!gc) {
		gc = ds.GlobalConstant.createEntity();
	}
	gc.lastDataFileLoaded = num;
}

// export routines

function processAndSaveOneDataclass(dsClass, filePath, num) {
	var c = ds[dsClass];
	var ec = c.all();
	if (ec.length > 0) {
		var p = c.attributes;
		var attr = [];
		for (var i in p) {
			if (p[i].kind == 'storage') {
				attr.push(p[i].name);
			}
			else if (p[i].kind == 'relatedEntity') {
				attr.push(p[i].name + '.ID');
			}
		}
		var attrString = attr.join(',');
		var a = ec.toArray(attrString,'',true);
		
		t = JSON.stringify(a);
		
		var ts = TextStream(filePath + num + '_' + dsClass + '.json', "write");
		ts.rewind();
		ts.write(t);
		ts.close();
	}
}

function exportEverythingExceptForDataclassesInTheArgumentArray(a) {
	var filePath = ds.getModelFolder().path + 'Import/datafiles/';
	var fileArray = Folder(filePath).files.sort();
	var dsClasses = ds.dataClasses;
	
	var maxNum = 0
	for (var i = 0; i < fileArray.length; i++)  {
		var f = fileArray[i].name;
		var num = parseInt(f.split('_')[0]);
		if (num > maxNum) {
			maxNum = num;
		}
	}
	maxNum++;
	
	for (var c in dsClasses) {
		if (a.indexOf(c) == -1) {
			processAndSaveOneDataclass(c, filePath, maxNum);
		}
	}
}

// import routines

function readAndProcessOneFile(f, dsClass) {
	//load up the right files
	var ts = TextStream(f, "read");
	var stream = ts.read();
	ts.close();

	var eArray = stream.split('<ENTITY>');
	
	var c = ds[dsClass];
	for (var i = 0; i < eArray.length; i++) {
		var e = eArray[i];
		if (e == '') {
			continue;
		}
		var a = JSON.parse(e);
		
		c.fromArray(a);
	}
}

function importEverythingExceptForDataclassesInTheArgumentArray(a) {
	debugger;
	var startNum = getGlobalCounter() + 1;
	var filePath = ds.getModelFolder().path + 'Import/datafiles/';
	var fileArray = Folder(filePath).files;
	var maxNum = 0;
	var obj = {};
	for (var i = 0; i < fileArray.length; i++)  {
		var f = fileArray[i].name;
		var num = parseInt(f.split('_')[0]);
		if (obj[num] === undefined) {
			obj[num] = [];
		}
		obj[num].push(f);
		
		if (num > maxNum) {
			maxNum = num;
		}
	}
	
	for (var i = startNum; i <= maxNum; i++)  {
		var fa = obj[i];
		for (var j = 0; j < fa.length; j++) {
			var fileName = fa[j];
			var re = /(\d+)_(\w+)\.json/.exec(fileName);
			if (re != null && parseInt(re[1]) >= startNum && a.indexOf(re[2]) == -1) {
				readAndProcessOneFile(filePath + fileName, re[2]);
			}
		}
	}
	
	setGlobalCounter(maxNum);
}


//exportEverythingExceptForDataclassesInTheArgumentArray([]);
importEverythingExceptForDataclassesInTheArgumentArray(['GlobalConstant']);