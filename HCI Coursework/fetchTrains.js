var currentTime = new Date().toJSON().slice(0, 16).replace('T', '/');// get current time

/* XMLHttpRequest Object
/* Request JSon file from server and read object in the file */
/* Reference: https://www.w3schools.com/xml/xml_http.asp */
/** Reference: https://www.w3schools.com/js/js_json_parse.asp */
function loadTrain() {
    apitrain = 'https://transportapi.com/v3/uk/train/station/nrw/live.json?app_id=d56927f5&app_key=e0dcf6205b574a542677a2b57087ca33&darwin=false&train_status=passenger';
    var req = new XMLHttpRequest();
    req.open('GET', apitrain, true);
    
    req.onreadystatechange = function () {
        // if state is ok, read json file
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);            
            getTrain(myArr);
        }
    };
    //send request to api server
    req.send();
}

/* load trains json,  */
function getTrain(data) {
    /** Create html element **/
    stopName = document.createElement("h1");
    /** store file data in the element **/
    stopName.textContent = data.station_name+" Railway Station";
    /** create html element **/
    address = document.createElement("p");
    /** store file data in the element **/
    address.textContent = "Address: Station Approach, Norwich NR11EF";
    date = document.createElement("p");
    date.textContent = "Date: "+data.date;
    /** append elements to webpage **/


    document.getElementById('businfo2').appendChild(stopName);
    document.getElementById('businfo2').appendChild(address);
    document.getElementById('businfo2').appendChild(date);
    document.getElementById('businfo2').appendChild(document.createElement("br"));

    /** read json array element **/
    departures = data.departures;
    
    var trains = departures['all'];
    /** for loop used to read all data in the array
     * create elements for each data
     * store data in elements
     * append created elements into webpage **/
    for (var i = 0; i < trains.length; i++) {
        destination = document.createElement("h4");
        stationPlatform = document.createElement("p");
        stationPlatform.textContent = "Platform: "+trains[i].platform;
        destination.textContent = trains[i].destination_name + " ("+trains[i].aimed_departure_time +")";
        document.getElementById('businfo2').appendChild(destination);
        document.getElementById('businfo2').appendChild(stationPlatform);
        document.getElementById('businfo2').appendChild(document.createElement("hr"));
    }
}

/** clear content */
function clearBox() {
    document.getElementById('businfo').innerHTML = "";
    document.getElementById('businfo2').innerHTML = "";
}

function getTrain2(){
    var dateTime = new Date(document.getElementById("time").value).toJSON().slice(0, 16).replace('T', '/');
    apitrain2 = 'https://transportapi.com/v3/uk/train/station/nrw/'+dateTime+'/timetable.json?app_id=d56927f5&app_key=e0dcf6205b574a542677a2b57087ca33&train_status=passenger';
    console.log(apitrain2);
   
    var req = new XMLHttpRequest();
    req.open('GET', apitrain2, true);
    
    req.onreadystatechange = function () {
        // if state is ok, read json file
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);            
            getDetail(myArr);
        }
    };
    //send request to api server
    req.send();
}

/* load trains json,  */
function getDetail(data) {
    /** Create html element **/
    stopName = document.createElement("h1");
    /** store file data in the element **/
    stopName.textContent = data.station_name+" Railway Station";

    /** create html element **/
    address = document.createElement("p");
    /** store file data in the element **/
    address.textContent = "Address: Station Approach, Norwich NR11EF";
    date = document.createElement("p");
    date.textContent = "Date: "+data.date;
    /** append elements to webpage **/
    document.getElementById('businfo2').appendChild(stopName);
    document.getElementById('businfo2').appendChild(address);
    document.getElementById('businfo2').appendChild(date);    
    document.getElementById('businfo2').appendChild(document.createElement("br"));

    /** read json array element **/
    departures = data.departures;
    
    var trains = departures['all'];
    /** for loop used to read all data in the array
     * create elements for each data
     * store data in elements
     * append created elements into webpage **/
    for (var i = 0; i < trains.length; i++) {
        destination = document.createElement("h4");
        stationPlatform = document.createElement("p");
        stationPlatform.textContent = "Platform: "+trains[i].platform;
        destination.textContent = trains[i].destination_name + " ("+trains[i].aimed_departure_time +")";
        document.getElementById('businfo2').appendChild(destination);
        document.getElementById('businfo2').appendChild(stationPlatform);
        document.getElementById('businfo2').appendChild(document.createElement("hr"));
    }
}