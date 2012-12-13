﻿	var STATE_LIST = {
	'AL': [1, 'Alabama'],
	'AK': [2, 'Alaska'],
	'AZ': [4, 'Arizona'],
	'AR': [5, 'Arkansas'],
	'CA': [6, 'California'],
	'CO': [8, 'Colorado'],
	'CT': [9, 'Connecticut'],
	'DE': [10, 'Delaware'],
	'FL': [12, 'Florida'],
	'GA': [13, 'Georgia'],
	'HI': [15, 'Hawaii'],
	'ID': [16, 'Idaho'],
	'IL': [17, 'Illinois'],
	'IN': [18, 'Indiana'],
	'IA': [19, 'Iowa'],
	'KS': [20, 'Kansas'],
	'KY': [21, 'Kentucky'],
	'LA': [22, 'Louisiana'],
	'ME': [23, 'Maine'],
	'MD': [24, 'Maryland'],
	'MA': [25, 'Massachusetts'],
	'MI': [26, 'Michigan'],
	'MN': [27, 'Minnesota'],
	'MS': [28, 'Mississippi'],
	'MO': [29, 'Missouri'],
	'MT': [30, 'Montana'],
	'NE': [31, 'Nebraska'],
	'NV': [32, 'Nevada'],
	'NH': [33, 'New Hampshire'],
	'NJ': [34, 'New Jersey'],
	'NM': [35, 'New Mexico'],
	'NY': [36, 'New York'],
	'NC': [37, 'North Carolina'],
	'ND': [38, 'North Dakota'],
	'OH': [39, 'Ohio'],
	'OK': [40, 'Oklahoma'],
	'OR': [41, 'Oregon'],
	'PA': [42, 'Pennsylvania'],
	'RI': [44, 'Rhode Island'],
	'SC': [45, 'South Carolina'],
	'SD': [46, 'South Dakota'],
	'TN': [47, 'Tennessee'],
	'TX': [48, 'Texas'],
	'UT': [49, 'Utah'],
	'VT': [50, 'Vermont'],
	'VA': [51, 'Virginia'],
	'WA': [53, 'Washington'],
	'WV': [54, 'West Virginia'],
	'WI': [55, 'Wisconsin'],
	'WY': [56, 'Wyoming'],
	'DC': [11, 'District of Columbia'],
	'PR': [72, 'Puerto Rico']
};

var BILL_SEARCH ={'q': ['state', 'search_window', 
	'chamber', 'bill_id__in', 'updated_since', 'subject',
	'sponsor_id']
	}
	
var LEGISLATOR_SEARCH ={'?': ['state', 'first_name',
	'last_name', 'chamber', 'active', 'term', 'district',
	'party']
	}
	
var LEGISLATOR_GEOSEARCH ={
	}

var API_TYPES = {
	'Metadata':STATE_LIST,
	'Bill':BILL_SEARCH,
	'Legislator':[],
	'Committee':[],
	'Event':[],
	'District':[]
	}

function RetrieveData(URLJson) {
	


//debugger;
 var xhr, headers, result, resultObj, URLText, URLJson;
 var proxy = { // define a proxy only if necessary
     host: 'proxy.myserver.com', // use any valid proxy address
     port: 80
 }
   
 var headersObj = {};
   
 //xhr = new XMLHttpRequest(proxy); // instanciate the xhr object
 xhr = new XMLHttpRequest(); // instanciate the xhr object
    // the proxy parameter may not be necessary
   
 xhr.onreadystatechange = function() { // event handler
     var state = this.readyState;
     if (state !== 4) { // while the status event is not Done we continue
         return;
     }
     var headers = this.getAllResponseHeaders(); //get the headers of the response
     var result = this.responseText;  //get the contents of the response
     var headersArray = headers.split('\n'); // split and format the headers string in an array
     headersArray.forEach(function(header, index, headersArray) {
         var name, indexSeparator, value;
 
        if (header.indexOf('HTTP/1.1') === 0) { // this is not a header but a status          
             return; // filter it
         }
  
        indexSeparator = header.indexOf(':'); 
        name = header.substr(0,indexSeparator);
        if (name === "") {
            return;
        }
        value = header.substr(indexSeparator + 1).trim(); // clean up the header attribute
        headersObj[name] = value; // fills an object with the headers
     });
     if (headersObj['Content-Type'] && headersObj['Content-Type'].indexOf('json') !== -1) {  
             // JSON response, parse it as objects
         resultObj = JSON.parse(result);
     } else { // not JSON, return text
         resultTxt = result;
     }
 };
  
 xhr.open('GET', URLJson);  
 //xhr.open('GET', URLText); // to connect to a Web site
   // or xhr.open('GET', URLJson) to send a REST query to a Wakanda server
   
 xhr.send(); // send the request
statusLine = xhr.status + ' ' + xhr.statusText; // get the status
 
 // we build the following object to display the responses in the code editor
 var jObj = ({
     statusLine: statusLine,
     headers: headersObj,
     result: resultObj || resultTxt
 });
 
//var jStr = JSON.stringify(jObj);
return jObj;
}


function SaveStateMeta(varURL) {
	
	var result=RetrieveData(varURL).result;
	var StateMeta= ds.StateMetadata.createEntity();
	var RelID=StateMeta.ID;
	StateMeta.name=result.name;
	StateMeta.abbreviation=result.abbreviation;
	StateMeta.legislature_name=result.legislature_name;
	StateMeta.upper_chamber_name=result.upper_chamber_name;
	StateMeta.lower_chamber_name=result.lower_chamber_name;
	StateMeta.upper_chamber_term=result.upper_chamber_term;
	StateMeta.lower_chamber_term= result.lower_chamber_term;
	StateMeta.upper_chamber_title=result.upper_chamber_title;
	StateMeta.lower_chamber_title=result.lower_chamber_title;
	StateMeta.latest_dump_url=result.latest_json_url;
	StateMeta.latest_dump_date=result.latest_json_date;
	StateMeta.save();		
	
	//Term related records
	/*for (var t in result.terms) 
	{
		Term(result.terms[t], RelID, StateMeta)
	}
	
	//OGTerm related records
	for (var t in result.session_details) 
	{
		Session(result.session_details[t], RelID, StateMeta)
	}
	
	//OGFeatureFlag related records
	for (var t in result.feature_flags) 
	{
		OGFlag(result.feature_flags[t], RelID, StateMeta)
	}*/
	

}

function Term(r, RelID, StateMeta) {
		StateTerm = new ds.Term({
			start_year:r.start_year,
			end_year:r.end_year,
			name:r.name})
		StateTerm.StateMetaData=StateMeta;
		StateTerm.save();
}

function Session(r, RelID, StateMeta) {
		StateSession = new ds.Session({
			type:r.type,
			display_name:r.display_name
			})
		StateSession.oGStateMetaData=StateMeta;
		StateSession.save();
}

function Flag(r, RelID, StateMeta) {
		StateFlag = new ds.FeatureFlag({
			item:r
			})
		StateFlag.StateMetaData=StateMeta;
		StateFlag.save();
}

function ClearOpenStateData() {
	var Table_List = ['Action', 'Bill', 'BillDocument', 'Committee',
	'District', 'Event', 'Feature_flag', 'Legislator', 'Participant',
	'Role', 'Session_detail', 'Source', 'Sponsor', 'StateMetadata',
	'Term', 'Version', 'Vote'	]
	
	for (t in Table_List)
	{
		var vName= Table_List[t];
		counter=ds.dataClasses[vName];
		counter.remove();
	}
}

function StringMaker() {
	var result = SystemWorker.exec('cmd /u /c "dir C:\\"');
	return result.output.toString("ucs2");
}

function GetKeys(obj) {
	var keys=[];
	for (var key in obj){
		keys.push(key);
		}
	return keys;
}





//StringMaker()
var v="http://openstates.org/api/v1/metadata/ma/?apikey=";
var w= v + require('openstates.api_key').openstates_api_key();
SaveStateMeta(w);
//var x = RetrieveData(w).result;
//var y = GetKeys(x[0]);
//y;

//ClearOpenStateData()
//RetrieveData("http://openstates.org/api/v1/bills/?q=agriculture&state=ca&chamber=upper&apikey=a7b283f866e94ff0a572ec269c76a32e");
//RetrieveData("http://openstates.org/api/v1/bills/?q=agriculture&state=ca&chamber=upper&apikey=a7b283f866e94ff0a572ec269c76a32e");