var currentTime = new Date().toJSON().slice(0, 16).replace('T', '/');
var number = 0; //used to create collapse id value
/* XMLHttpRequest Object
/* Request JSon file from server and read object in the file */
/* References: https://www.w3schools.com/xml/xml_http.asp */
/* Reference: https://www.w3schools.com/js/js_json_parse.asp */
function loadBus() {
	ATCO = document.getElementById("mySelect").value;
	api = 'https://transportapi.com/v3/uk/bus/stop/' + ATCO + '/' + currentTime + '/timetable.json?app_id=d56927f5&app_key=e0dcf6205b574a542677a2b57087ca33&group=no';
	var req = new XMLHttpRequest();
	req.open('GET', api, true);
	req.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var myArr = JSON.parse(this.responseText);
			getBus(myArr);
		}
	};
	req.send();
}

/* load bus json,  */
function getBus(data) {
	/** Button for modal **/
	stopName = document.createElement("button");
	/** define class name for button **/
	stopName.className = "btn btn-info btn-lg";
	/** define attributes for button **/
	$(stopName).attr({
		'data-toggle': 'modal',
		'data-target': '#myModal1'
	});
	/** store data and append data to button **/
	stopName.textContent = data.name;
	document.getElementById('businfo2').appendChild(stopName);
	/** read array data in json file **/
	departures = data.departures;
	/** read values in the array */
	var bus = departures['all'];
	for (var i = 0; i < bus.length; i++) {
		/** retrive new json data from json data **/
		var url = bus[i].id; //<-- get more data about the bus, eg. where the bus will stop

		var req = new XMLHttpRequest();
		req.open('GET', url, true); // <-- new url insert in here
		req.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var myArr = JSON.parse(this.responseText);
				busDetail2(myArr); //<-- load bus json detail
			}
		};
		req.send(); // <-- if states is ok, send request
		/** end of retrive json data  **/
	}


}

function busDetail2(data) {
	number++;
	var stop = data['stops']; //<--get array object

	/** create modal element **/
	busNumber = document.createElement("h4");
	busNumber2 = document.createElement("h4");

	busNumber.textContent = "Bus Number: " + data.line + " (" + stop[0].time + ")";
	busNumber2.textContent = "Bus Number: " + data.line + " (" + stop[0].time + ")";
	document.getElementById('businfo2').appendChild(busNumber2);

	/** create modal body**/
	modalBody = document.createElement("div");
	modalBody.className = "modal fade";
	$(modalBody).attr({
		'id': 'myModal1',
		'role': 'dialog'
	});
	/** modal dialog */
	modalDialog = document.createElement("div");
	modalDialog.className = "modal-dialog";
	modalBody.appendChild(modalDialog); //<-- append dialog
	/** main modal content **/
	modalContent = document.createElement("div");
	modalContent.className = "modal-content";
	modalDialog.appendChild(modalContent);//<-- append modal contet to dialog

	/** modal header **/
	modalHeader = document.createElement("div");
	modalHeader.className = "modal-header";

	/** header button */
	headerButton = document.createElement("button");
	headerButton.className = "close";
	$(headerButton).attr({
		'data-dismiss': 'modal'
	});
	headerButton.textContent = "x";

	modalTitle = document.createElement("h2");
	modalTitle.className = "modal-title";
	modalTitle.innerHTML = stop[0].name;//<--display bus number on header
	/** modal body */
	modBody = document.createElement("div");
	modBody.className = "modal-body";

	$(modBody).attr({
		'id': 'info2'
	});

	modalHeader.appendChild(modalTitle);
	modalHeader.appendChild(headerButton);//<--append header button
	modalContent.appendChild(modalHeader);//<--append header to content
	modalContent.appendChild(modBody);
	document.body.appendChild(modalBody);//<-- append modal body to body content
	document.getElementById('info2').appendChild(busNumber);
	//console.log(stop); //<-- test object in console

	/** create collapse */
	/** create panel group make id 'accordion' */
	panelGroup = document.createElement("div");
	panelGroup.className = "panel-group";
	$(panelGroup).attr({
		'id': 'accordion'
	});
	document.getElementById('info2').appendChild(panelGroup);
	/** create panel */
	panel = document.createElement("div");
	panel.className = "panel panel-default";

	panelGroup.appendChild(panel);//<-- append panel to group

	/** create panel head */
	panelHead = document.createElement("div");
	panelHead.className = "panel-heading";
	panel.appendChild(panelHead);//<-append head to panel

	/** create panel title */
	panelTitle = document.createElement("h4");

	panelTitle.className = "panel-title";
	panelHead.appendChild(panelTitle);//<-- append title to head

	/** create a tag in the title */
	atag = document.createElement("a");
	$(atag).attr({
		'data-toggle': 'collapse',
		'data-parent': '#accordion',
		'href': '#collapse' + number,
	});
	atag.textContent = "More Detail";
	panelTitle.appendChild(atag);//<--append a tag to title

	/** create collapses */
	collapse = document.createElement("div");
	collapse.className = "panel-collapse collapse";
	//collapse.textContent = "hello";
	$(collapse).attr({
		'id': 'collapse' + number
	});
	panel.appendChild(collapse);//<-- append collapse to panel

	collapseDetail = document.createElement("div");
	collapseDetail.className = "panel-body";

	collapse.appendChild(collapseDetail);

	for (var i = 0; i < stop.length; i++) {
		/** create new elements for each property**/
		timeDate = document.createElement('p');
		//date = document.createElement('p');
		stop_name = document.createElement('p');
		//locality = document.createElement('p');

		/** store json value**/
		timeDate.textContent = stop[i].time + " " + stop[i].date;
		//date.textContent = stop[i].date;
		stop_name.textContent = "Stop: " + stop[i].stop_name + ", " + stop[i].locality;
		//locality.textContent = stop[i].locality;

		/** append variables in element by using element id**/
		//document.getElementById('info2').appendChild(timeDate);
		//document.getElementById('info').appendChild(date);
		//document.getElementById('info2').appendChild(stop_name);
		//document.getElementById('info').appendChild(locality);

		/** append to collapse */
		collapseDetail.appendChild(timeDate);
		collapseDetail.appendChild(stop_name);
	}
	document.getElementById('info2').appendChild(document.createElement("hr"));
	document.getElementById('info2').appendChild(document.createElement("hr"));
}

/** clear content */
function clearBox() {
	document.getElementById('businfo').innerHTML = "";
	document.getElementById('businfo2').innerHTML = "";
}

function myMap() {

	ATCO = document.getElementById("mySelect").value;
	var lat = 0.0;
	var lon = 0.0;

	if (ATCO == "2900N12240") {
		lat = 52.62667;
		lon = 1.29411;
	}
	if (ATCO == "2900N12150") {
		lat = 52.62649591;
		lon = 1.29428177;
	}
	if (ATCO == "2900C237") {
		lat = 52.61758724;
		lon = 1.219951558;
	}
	if (ATCO == "2900C238") {
		lat = 52.61705137;
		lon = 1.219483695;
	}
	if (ATCO == "2900N12216") {
		lat = 52.62758929;
		lon = 1.306675722;
	}
	if (ATCO == "2900N124") {
		lat = 52.6274013;
		lon = 1.3068895;
	}
	if (ATCO == "2900N12218") {
		lat = 52.62765655;
		lon = 1.306843378;
	}
	if (ATCO == "2900N12286") {
		lat = 52.62278298;
		lon = 1.242116173;
	}
	if (ATCO == "2900N12913") {
		lat = 52.62287599;
		lon = 1.243645209;
	}
	if (ATCO == "2900N12287") {
		lat = 52.62262905;
		lon = 1.243139257;
	}
	console.log(lat + ',' + lon);
	var myCenter = new google.maps.LatLng(lat, lon);
	var mapCanvas = document.getElementById("map");
	var mapOptions = { center: myCenter, zoom: 17 };
	var map = new google.maps.Map(mapCanvas, mapOptions);
	var marker = new google.maps.Marker({ position: myCenter });
	marker.setMap(map);
}


