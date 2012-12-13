/**

* @author richard r fernandez

*/



function deleteAllModels () {
	
	var counter;
	for (var vName in ds.dataClasses)  // put each datastore class of ds
	{
		counter=ds.dataClasses[vName];
		counter.remove();
	};	
	return true;
	};
	
function countAllTables() {
	
	var counter;
	var out ="";
	for (var vName in ds.dataClasses)  // put each datastore class of ds
	{
		counter=ds.dataClasses[vName];
		out += "Length of " + vName + " is " + counter.length + "\r";
	};	
	return out;
	};
	
function setAutoSequence () {
	
	var counter;
	for (var vName in ds.dataClasses)  // put each datastore class of ds
	{
		counter=ds.dataClasses[vName];
		counter.setAutoSequenceNumber(1);
	};	
	return true;
	};
	
function importAllFixedData()
{
	
	var fixedFolderPath = ds.getModelFolder().path + "Fixed_import_data";
	var fixedFolder=Folder(fixedFolderPath);
	var fixedfiles= fixedFolder.files;
	
	for(var i=0; i<fixedfiles.length; i++)
        {chooseFilesAndExecute(fixedfiles[i]);}
    
	return true;
};

function importAllZipData()
{
	
	var zipFolderPath = ds.getModelFolder().path + "ZipData";
	var zipFolder=Folder(zipFolderPath);
	var zipSubFolders =zipFolder.folders;
	for (var i=0;i<zipSubFolders.length; i++)
		{
			var zipfiles= zipSubFolders[i].files;
	
			for(var j=0; j<zipfiles.length; j++)
        	{executeZipImport(zipfiles[j]);}
       	}
	return true;
};

function chooseFilesAndExecute(importfileName)
{
	switch(importfileName.name)
	{
	case "1_State.txt":
		State_Import(importfileName.path)
		break;
	case "2_District.txt":
		District_Import(importfileName.path)
		break;
	case "3_HouseDistrict.txt":
		HouseDistrict_Import(importfileName.path)
		break;
	case "4_StateUpperDistrict.txt":
		StateUpperDistrict_Import(importfileName.path)
		break;
	case "5_StateLowerDistrict.txt":
		StateLowerDistrict_Import(importfileName.path)
		break;
	case "6_Party.txt":
		Party_Import(importfileName.path)
		break;
	case "7_Politician.txt":
		Politician_Import(importfileName.path)
		break;
	case "8_Election.txt":
		Election_Import(importfileName.path)
		break;
	case "9_Campaign.txt":
		Campaign_Import(importfileName.path)
		break;
	case "10_Zip9.txt":
		//Zip9_Import(importfileName.path)
		break;
	case "Voter.txt":
		//Voter_Import(importfileName.path)
		break;		
	default:
		var x="error";
	}
};

function Voter_Import(importfile)
{
	var lines = loadText(importfile).split("\n");
	var columns = [];
	lines.forEach(function(oneLine) { 
	columns = oneLine.split("\t");
	theVoter = ds.Voter.find('ID= :1', columns[0]);
	if (theVoter == null) {
	        theVoter = new ds.Voter({
			ID:columns[0],
			zipCode:columns[1],
			houseDistrict:columns[2],
			stateUpperDistrict:columns[3],
			stateLowerDistrict:columns[4]
         	});}
    else {
			theVoter.ID=columns[0],
			theVoter.zipCode=columns[1],
			theVoter.houseDistrict=columns[2],
			theVoter.stateUpperDistrict=columns[3],
			theVoter.stateLowerDistrict=columns[4]    	
    	}
    theVoter.save();
	})
	
		return true;
};

/*function Zip9_Import(importfile)
{
	var lines = loadText(importfile).split("\n");
	var columns = [];
	lines.forEach(function(oneLine) { 
	columns = oneLine.split("\t");
	        theZip9 = new ds.Zip9({
			ID:columns[0],
			zipCode:columns[1],
			houseDistrict:columns[2],
			stateUpperDistrict:columns[3],
			stateLowerDistrict:columns[4]
         	});
    theZip9.save();
	})
	
		return true;
};*/

function Campaign_Import(importfile)
{
	var lines = loadText(importfile).split("\n");
	var columns = [];
	lines.forEach(function(oneLine) { 
	columns = oneLine.split("\t");
	theCampaign = ds.Campaign.find('ID=:1', columns[0]);
	if (theCampaign == null) {
	        theCampaign = new ds.Campaign({
			ID:columns[0],
			politician:columns[1],
			election:columns[2],
			incumbent:columns[3]
         	});}
     else {
			theCampaign.ID=columns[0],
			theCampaign.politician=columns[1],
			theCampaign.election=columns[2],
			theCampaignincumbent=columns[3]     	
     	}
    theCampaign.save();
	})
	
		return true;
};

function Election_Import(importfile)
{
	var lines = loadText(importfile).split("\n");
	var columns = [];
	lines.forEach(function(oneLine) { 
	columns = oneLine.split("\t");
	theElection = ds.Election.find('ID= :1', columns[0])
	if (theElection == null){
	        theElection = new ds.Election({
			ID:columns[0],
			year:columns[1],
			district:columns[2],
			day:columns[3],
			//general:columns[4],
			general:true,
			runoff:columns[5]
         	});}
    else {
			theElection.ID=columns[0],
			theElection.year=columns[1],
			theElection.district=columns[2],
			theElection.day=columns[3],
			//general:columns[4],
			theElection.general=true,
			theElection.runoff=columns[5]    
    	}
    theElection.save();
	})
	
		return true;
};

function Politician_Import(importfile)
{
	var lines = loadText(importfile).split("\n");
	var columns = [];
	lines.forEach(function(oneLine) { 
	columns = oneLine.split("\t");
	thePolitician = ds.Politician.find('ID=:1', columns[0]);
	if (thePolitician == null){
	        thePolitician = new ds.Politician({
			ID:columns[0],
			lastName:columns[1],
			firstName:columns[2],
			middleName:columns[3],
			suffix:columns[4],
			fullName:columns[5],
			party:columns[6],
			firstElected:columns[7],
			url:columns[8]
         	});}
      else {
			thePolitician.ID =columns[0],
			thePolitician.lastName=columns[1],
			thePolitician.firstName=columns[2],
			thePolitician.middleName=columns[3],
			thePolitician.suffix=columns[4],
			thePolitician.fullName=columns[5],
			thePolitician.party=columns[6],
			thePolitician.firstElected=columns[7],
			thePolitician.url=columns[8]      	
      	}
    thePolitician.save();
	})
	
	return true;
};

function Party_Import(importfile)
{
	var lines = loadText(importfile).split("\n");
	var columns = [];
	lines.forEach(function(oneLine) { 
	columns = oneLine.split("\t");
			theParty=ds.Party.find('ID=:1', columns[0])
			if(theParty == null ){
	        theParty = new ds.Party({
			ID:columns[0],
			name:columns[1],
			abbreviation:columns[2]
         	});}
     else{
			theParty.ID = columns[0],
			theParty.name = columns[1],
			theParty.abbreviation = columns[2]     	
     	}
    theParty.save();
	})
	
	return true;
};

function StateLowerDistrict_Import(importfile)
{
	var lines = loadText(importfile).split("\n");
	var columns = [];
	lines.forEach(function(oneLine) { 
	columns = oneLine.split("\t");
	theStateLowerDistrict = ds.StateLowerDistrict.find('ID= :1', columns[0])
	if (theStateLowerDistrict == null) {
	        theStateLowerDistrict = new ds.StateLowerDistrict({
			ID:columns[0],
			name:columns[1],
			code:zeroPad(columns[2],3),
			state:columns[3],
			type:"State Lower Chamber",
			typeCode:columns[5],
			numberOfReps:columns[6]
         	});}
    else {
			theStateLowerDistrict.ID=columns[0],
			theStateLowerDistrict.name=columns[1],
			theStateLowerDistrict.code=zeroPad(columns[2],3),
			theStateLowerDistrict.state=columns[3],
			theStateLowerDistrict.type="State Lower Chamber",
			theStateLowerDistrict.typeCode=columns[5],
			theStateLowerDistrict.numberOfReps=columns[6]    	
    	}
    theStateLowerDistrict.save();
	})
	
	return true;
};

function StateUpperDistrict_Import(importfile)
{
	var lines = loadText(importfile).split("\n");
	var columns = [];
	lines.forEach(function(oneLine) { 
	columns = oneLine.split("\t");
	theStateUpperDistrict = ds.StateUpperDistrict.find('ID= :1', columns[0]);
	if (theStateUpperDistrict == null){
	        theStateUpperDistrict = new ds.StateUpperDistrict({
			ID:columns[0],
			name:columns[1],
			code:zeroPad(columns[2],3),
			state:columns[3],
			type:"State Upper Chamber",
			typeCode:columns[5],
			numberOfReps:columns[6]
         	});}
    else {
			theStateUpperDistrict.ID=columns[0],
			theStateUpperDistrict.name=columns[1],
			theStateUpperDistrict.code=zeroPad(columns[2],3),
			theStateUpperDistrict.state=columns[3],
			theStateUpperDistrict.type="State Upper Chamber",
			theStateUpperDistrict.typeCode=columns[5],
			theStateUpperDistrict.numberOfReps=columns[6]    	
    	}
    theStateUpperDistrict.save();
	})
	
	return true;
};


function HouseDistrict_Import(importfile)
{
	var lines = loadText(importfile).split("\n");
	var columns = [];
	lines.forEach(function(oneLine) { 
	columns = oneLine.split("\t");
	theHouseDistrict = ds.HouseDistrict.find('ID= :1', columns[0]);
	if (theHouseDistrict == null) {
	        theHouseDistrict = new ds.HouseDistrict({
			ID:columns[0],
			name:columns[1],
			code:columns[2],
			state:columns[3],
			type:columns[4],
			typeCode:columns[5],
			numberOfReps:columns[6]
         	});}
    else {
			theHouseDistrict.ID=columns[0],
			theHouseDistrict.name=columns[1],
			theHouseDistrict.code=columns[2],
			theHouseDistrict.state=columns[3],
			theHouseDistrict.type=columns[4],
			theHouseDistrict.typeCode=columns[5],
			theHouseDistrict.numberOfReps=columns[6]    	
    	}
    theHouseDistrict.save();
	})
	
	return true;
};

function District_Import(importfile)
{
	var lines = loadText(importfile).split("\n");
	var columns = [];
	lines.forEach(function(oneLine) { 
	columns = oneLine.split("\t");
	theDistrict = ds.District.find('ID= :1', columns[0]);
	if (theDistrict == null) {
	        theDistrict = new ds.District({
			ID:columns[0],
			name:columns[1],
			code:columns[2],
			state:columns[3],
			type:columns[4],
			typeCode:columns[5],
			numberOfReps:columns[6]
         	});}
    else {
			theDistrict.ID=columns[0],
			theDistrict.name=columns[1],
			theDistrict.code=columns[2],
			theDistrict.state=columns[3],
			theDistrict.type=columns[4],
			theDistrict.typeCode=columns[5],
			theDistrict.numberOfReps=columns[6]    	
    	}
    theDistrict.save();
	})
	
	return true;
};


function State_Import(importfile)
{
	var lines = loadText(importfile).split("\n");
	var columns = [];
	lines.forEach(function(oneLine) { 
	columns = oneLine.split("\t");
	theState = ds.State.find('ID= :1', columns[0]);
	if (theState == null) {
	        theState = new ds.State({
			ID:columns[0],
			name:columns[1],
			abbreviation:columns[2],
			censusCode:columns[3]
         	});}
    else {
			theState.ID=columns[0],
			theState.name=columns[1],
			theState.abbreviation=columns[2],
			theState.censusCode=columns[3]    	
    	}
    theState.save();
	})
	
	return true;
};

function executeZipImport(importfile)
{
	var lines = loadText(importfile).split("\n");
	var columns = [];
	lines.forEach(function(oneLine) { 
	columns = oneLine.split("\t");
	        theZip9 = new ds.Zip9({
            zipcode: columns[0]+ columns[1],
            countyCode : columns[6],
            recordType : columns[8]
         	});
    theZip9.save();
	})
	
	return true;
};

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
	
//deleteAllModels();
//setAutoSequence();
//importAllFixedData();
//countAllTables();
var importfileName = File('C:/scrap/SPWidget/Fixed_import_data/6_Party.txt')
chooseFilesAndExecute(importfileName)


