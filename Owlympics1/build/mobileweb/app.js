/*
* Code developed by Rajoshi Biswas
* Starting 4th February 2014 for ELEC 419 OWLympics project
* Rice University
* Go OWLympics!
* Single Window Application Template:
* A basic starting point for your application.  Mostly a blank canvas.
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*
*/

//bootstrap and check dependencies
if (Ti.version < 1.8) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
Titanium.UI.setBackgroundColor('#000');
// This is a single context application with multiple windows in a stack
(function() {
	//render appropriate components based on the platform and form factor
	var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

	/*windows */
	var homeWin = Titanium.UI.createWindow({
		title : 'OWLympics',
		backgroundColor : '#000000',
		orientationModes : [Titanium.UI.PORTRAIT],
	});

	homeWin.addEventListener('android:back', function() {
		return false;
	});

	var homeView = Ti.UI.createView({
		title : 'OWLympics',
		backgroundColor : '#000000',
		height : "100%",
		width : "100%",
		top : 0,
		left : 0,
		zIndex : 4,
	});

	homeWin.add(homeView);

	var whenView = Ti.UI.createView({
		title : 'OWlympics : When?',
		backgroundColor : '#000000',
		height : "100%",
		width : "100%",
		top : 0,
		left : 0,
		zIndex : 3,
	});
	homeWin.add(whenView);

	var whatView = Ti.UI.createView({
		title : 'OWlympics : What Activity?',
		backgroundColor : '#000000',
		height : "100%",
		width : "100%",
		top : 0,
		left : 0,
		zIndex : 2,
	});

	homeWin.add(whatView);

	var timeView = Ti.UI.createView({
		title : 'OWlympics : How Long?',
		backgroundColor : '#000000',
		height : "100%",
		width : "100%",
		top : 0,
		left : 0,
		zIndex : 1,
	});

	homeWin.add(timeView);

	/*buttons*/
	var backbtn = Ti.UI.createButton({
		top : '2%',
		left : '4%',
		width : 60,
		height : 60,
		backgroundImage : './images/backbuttonblue.png',
		backgroundSelectedImage : './images/backbuttongray.png',
	});
	var nextbtn = Ti.UI.createButton({
		bottom : '2%',
		right : '4%',
		width : 60,
		height : 60,
		backgroundImage : './images/nextbuttonblue.png',
		backgroundSelectedImage : './images/nextbuttongray.png',

	});

	var newactivitybtn = Ti.UI.createButton({
		title : 'NEW',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '30%',
		left : '40%',
		width : 130,
		height : 130,
		backgroundImage : './images/orange600.png',
		backgroundSelectedImage : './images/red600.png',
	});
	newactivitybtn.addEventListener('click', function(e) {
		homeView.add(nextbtn);
		whenView.show();
		whenView.add(backbtn);
		whichview = 1;
		homeView.hide();
	});

	homeView.add(newactivitybtn);

	var viewactivitybtn = Ti.UI.createButton({
		title : 'VIEW',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '50%',
		left : '40%',
		width : 130,
		height : 130,
		backgroundImage : './images/orange600.png',
		backgroundSelectedImage : './images/red600.png',
	});
	viewactivitybtn.addEventListener('click', function(e) {
		profileWin.open({
			activityEnterAnimation : Ti.Android.R.anim.none,
			activityExitAnimation : Ti.Android.R.anim.none
		});
		whichview = 0;
	});

	homeView.add(viewactivitybtn);
	var dateofactivity;
	var todaybtn = Ti.UI.createButton({
		title : 'Today',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '30%',
		left : '35%',
		width : 160,
		height : 80,
		backgroundImage : './images/CTS-green.png',
		backgroundSelectedImage : './images/red.jpg',
	});
	todaybtn.addEventListener('click', function(e) {
		homeView.remove(nextbtn);
		whenView.add(nextbtn);
		whatView.show();
		whenView.remove(backbtn);
		whatView.add(backbtn);
		whichview = 2;
		whenView.hide();
	});

	whenView.add(todaybtn);

	var yestbtn = Ti.UI.createButton({
		title : 'Yesterday',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '40%',
		left : '35%',
		width : 160,
		height : 80,
		backgroundImage : './images/CTS-green.png',
		backgroundSelectedImage : './images/red.jpg',
	});
	yestbtn.addEventListener('click', function(e) {
		homeView.remove(nextbtn);
		whenView.add(nextbtn);
		whatView.show();
		whenView.remove(backbtn);
		whatView.add(backbtn);
		whichview = 2;
		whenView.hide();
	});

	whenView.add(yestbtn);

	var choosebtn = Ti.UI.createButton({
		title : 'Choose',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '50%',
		left : '35%',
		width : 160,
		height : 80,
		backgroundImage : './images/CTS-green.png',
		backgroundSelectedImage : './images/red.jpg',
	});
	var pickdate = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE,
		minDate : new Date,
		top : '60%',
		left : '30%',
	});
	var datepick;
	pickdate.addEventListener('change', function(e) {
		datepicked = e.row.custom_item;
	});

	choosebtn.addEventListener('click', function(e) {
		homeView.remove(nextbtn);
		whenView.add(nextbtn);
		whatView.show();
		whenView.remove(backbtn);
		whatView.add(backbtn);
		whichview = 2;
		whenView.hide();
	});

	whenView.add(choosebtn);
	whenView.add(pickdate);
	var useractivity;

	var activitybtn1 = Ti.UI.createButton({
		title : 'RUN',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '15%',
		left : '15%',
		width : 130,
		height : 130,
		backgroundImage : './images/green600.png',
		backgroundSelectedImage : './images/red600.png',
	});

	activitybtn1.addEventListener('click', function(e) {
		useractivity = "Running";
		whenView.remove(nextbtn);
		whatView.add(nextbtn);
		timeView.show();
		whatView.remove(backbtn);
		timeView.add(backbtn);
		whichview = 3;
		whatView.hide();
	});

	whatView.add(activitybtn1);
	var activitybtn2 = Ti.UI.createButton({
		title : 'WALK',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '15%',
		left : '40%',
		width : 130,
		height : 130,
		backgroundImage : './images/green600.png',
		backgroundSelectedImage : './images/red600.png',
	});

	activitybtn2.addEventListener('click', function(e) {
		useractivity = "Walking";
		whenView.remove(nextbtn);
		whatView.add(nextbtn);
		timeView.show();
		whatView.remove(backbtn);
		timeView.add(backbtn);
		whichview = 3;
		whatView.hide();
	});

	whatView.add(activitybtn2);

	var activitybtn3 = Ti.UI.createButton({
		title : 'SWIM',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '15%',
		left : '70%',
		width : 130,
		height : 130,
		backgroundImage : './images/green600.png',
		backgroundSelectedImage : './images/red600.png',
	});

	activitybtn3.addEventListener('click', function(e) {
		useractivity = "Swimming";
		whenView.remove(nextbtn);
		whatView.add(nextbtn);
		timeView.show();
		whatView.remove(backbtn);
		timeView.add(backbtn);
		whichview = 3;
		whatView.hide();
	});

	whatView.add(activitybtn3);

	var activitybtn4 = Ti.UI.createButton({
		title : 'CYCLE',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '35%',
		left : '25%',
		width : 130,
		height : 130,
		backgroundImage : './images/green600.png',
		backgroundSelectedImage : './images/red600.png',
	});

	activitybtn4.addEventListener('click', function(e) {
		useractivity = "Cycling";
		whenView.remove(nextbtn);
		whatView.add(nextbtn);
		timeView.show();
		whatView.remove(backbtn);
		timeView.add(backbtn);
		whichview = 3;
		whatView.hide();
	});

	whatView.add(activitybtn4);

	var activitybtn5 = Ti.UI.createButton({
		title : 'WEIGHT',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '35%',
		left : '55%',
		width : 130,
		height : 130,
		backgroundImage : './images/green600.png',
		backgroundSelectedImage : './images/red600.png',
	});

	activitybtn5.addEventListener('click', function(e) {
		useractivity = "Weight";
		whenView.remove(nextbtn);
		whatView.add(nextbtn);
		timeView.show();
		whatView.remove(backbtn);
		timeView.add(backbtn);
		whichview = 3;
		whatView.hide();
	});

	whatView.add(activitybtn5);

	var activitybtn6 = Ti.UI.createButton({
		title : 'OTHER',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '55%',
		left : '60%',
		width : 130,
		height : 130,
		backgroundImage : './images/green600.png',
		backgroundSelectedImage : './images/red600.png',
	});

	var othertxt = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : 'black',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '55%',
		left : '15%',
		width : 250,
		height : 100,
		backgroundColor : 'white',
	});

	whatView.add(othertxt);

	activitybtn6.addEventListener('click', function(e) {
		useractivity = othertxt.value;
		othertxt.blur();
		whenView.remove(nextbtn);
		whatView.add(nextbtn);
		timeView.show();
		whatView.remove(backbtn);
		timeView.add(backbtn);
		whichview = 3;
		whatView.hide();
	});

	othertxt.addEventListener('focus', function(e) {
		Ti.UI.Android.hideSoftKeyboard();
	});

	whatView.add(activitybtn6);

	var lowbtn = Ti.UI.createButton({
		title : 'LOW',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '15%',
		left : '15%',
		width : 130,
		height : 130,
		backgroundImage : './images/green600.png',
		backgroundSelectedImage : './images/red600.png',
	});

	lowbtn.addEventListener('click', function(e) {

	});

	timeView.add(lowbtn);

	var medbtn = Ti.UI.createButton({
		title : 'MED',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '15%',
		left : '40%',
		width : 130,
		height : 130,
		backgroundImage : './images/green600.png',
		backgroundSelectedImage : './images/red600.png',
	});

	medbtn.addEventListener('click', function(e) {

	});

	timeView.add(medbtn);

	var highbtn = Ti.UI.createButton({
		title : 'HIGH',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		top : '15%',
		left : '65%',
		width : 130,
		height : 130,
		backgroundImage : './images/green600.png',
		backgroundSelectedImage : './images/red600.png',
	});

	highbtn.addEventListener('click', function(e) {

	});

	timeView.add(highbtn);

	var mycol = new Array();
	var i = 0;
	for ( i = 0; i < 50; i++) {
		var a = i * 5;
		mycol[i] = Titanium.UI.createPickerRow({
			title : a.toString()
		});
	}

	var lowpick = Titanium.UI.createPicker({
		top : '40%',
		left : '20%',
		height : 100,
		width : 100,
		selectionIndicator : true,
		type : Titanium.UI.PICKER_TYPE_PLAIN,

	});
	var medpick = Titanium.UI.createPicker({
		top : '40%',
		left : '45%',
		height : 100,
		width : 100,
		selectionIndicator : true,
		type : Titanium.UI.PICKER_TYPE_PLAIN,

	});
	var highpick = Titanium.UI.createPicker({
		top : '40%',
		left : '70%',
		height : 100,
		width : 100,
		selectionIndicator : true,
		type : Titanium.UI.PICKER_TYPE_PLAIN,

	});
	lowpick.add(mycol);
	medpick.add(mycol);
	highpick.add(mycol);
	var lowpicked, medpicked, highpicked;
	lowpick.addEventListener('change', function(e) {
		lowpicked = e.row.custom_item;
	});

	medpick.addEventListener('change', function(e) {
		medpicked = e.row.custom_item;
	});
	highpick.addEventListener('change', function(e) {
		highpicked = e.row.custom_item;
	});

	timeView.add(lowpick);
	timeView.add(medpick);
	timeView.add(highpick);

	backbtn.addEventListener('click', function(e) {
		switch(whichview) {
			case 1:
				homeView.show();
				whenView.hide();
				whichview = 0;
				whenView.remove(nextbtn);
				homeView.add(nextbtn);
				break;
			case 2:
				whenView.show();
				whatView.hide();
				whichview = 1;
				whatView.remove(nextbtn);
				whenView.add(nextbtn);
				whatView.remove(backbtn);
				whenView.add(backbtn);
				break;
			case 3:
				whatView.show();
				timeView.hide();
				whichview = 2;
				timeView.remove(nextbtn);
				whatView.add(nextbtn);
				timeView.remove(backbtn);
				whatView.add(backbtn);
				break;

			default:

		}
	});
	nextbtn.addEventListener('click', function(e) {
		switch(whichview) {
			case 0:
				homeView.hide();
				whenView.show();
				whichview = 1;
				homeView.remove(nextbtn);
				whenView.add(nextbtn);
				break;
			case 1:
				whenView.hide();
				whatView.show();
				whichview = 2;
				whenView.remove(nextbtn);
				whatView.add(nextbtn);
				whenView.remove(backbtn);
				whatView.add(backbtn);
				break;
			case 2:
				whatView.hide();
				timeView.show();
				whichview = 3;
				whatView.remove(nextbtn);
				timeView.add(nextbtn);
				whatView.remove(backbtn);
				timeView.add(backbtn);
				break;

			default:

		}
	});

	//Get information for profile

	var activity1 = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 17
		},
		text : 'Exercise',
		top : '170dp',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var activity2 = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 17
		},
		text : 'Exercise',
		top : '200dp',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var levelLabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 25
		},
		text : 'Current Level:',
		top : '25dp',
		left : '125dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var pb2 = Titanium.UI.createProgressBar({
		top : '50dp',
		left : '125dp',
		width : '175dp',
		height : 'auto',
		min : 0,
		max : 400,
		value : 25,
		color : '#fff',
		font : {
			fontSize : 20,
			color : 'white,'
		},
	});

	var profileReq = Titanium.Network.createHTTPClient();

	profileReq.onload = function() {
		//Parse JSON file
		var profileJSON = JSON.parse(this.responseText);
		//Use values to generate progress bar and labels for current level and recent activities
		userPoints = profileJSON[0].points;
		pb2.setValue(userPoints);
		userLevel = 'Current Level: ';
		userLevel = userLevel + profileJSON[0].level;
		var activity1string = '';
		activity1string = activity1string + profileJSON[0].acts[0].name + ' for ' + profileJSON[0].acts[0].newpoints + ' points on ' + profileJSON[0].acts[0].month + '/' + profileJSON[0].acts[0].day + '/' + profileJSON[0].acts[0].year;
		var activity2string = '';
		activity2string = activity2string + profileJSON[0].acts[1].name + ' for ' + profileJSON[0].acts[1].newpoints + ' points on ' + profileJSON[0].acts[1].month + '/' + profileJSON[0].acts[1].day + '/' + profileJSON[0].acts[1].year;
		activity1.setText(activity1string);
		activity2.setText(activity2string);
		levelLabel.setText(userLevel);

	};

	function profileUpdate() {
		profileReq.open("POST", "http://sh.rice.edu:5000/mobile/profile");
		var params = {
			uuid : Titanium.Platform.id,
		};
		profileReq.send(params);
	}

	if (Ti.App.Properties.hasProperty('loggedBefore')) {
		profileUpdate();
	};

	/* Set up profile window */

	var win1 = Titanium.UI.createWindow({
		title : 'Log Exercises',
		backgroundColor : '#2C2B3D',
		backgroundImage : 'images/triangular.png',
		backgroundRepeat : true,
	});

	var profileWin = Titanium.UI.createWindow({
		title : 'Profile',
		backgroundColor : '#2C2B3D',
		backgroundColor : '#2C2B3D',
		backgroundImage : 'images/triangular.png',
		backgroundRepeat : true,
	});

	profileWin.add(activity1);
	profileWin.add(activity2);
	profileWin.add(pb2);
	profileWin.add(levelLabel);

	var mainTabGroup = Titanium.UI.createTabGroup({
	});

	var win1Tab = Titanium.UI.createTab({
		window : win1,
		title : 'Log'
	});

	var profileWinTab = Titanium.UI.createTab({
		window : profileWin,
		title : 'Profile'
	});

	/* Add profile and win1 Tabs to the mainTabGroup */

	mainTabGroup.addTab(win1Tab);
	mainTabGroup.addTab(profileWinTab);

	/* Set up fields for submission */

	var email = Ti.UI.createTextField({
		height : '40dp',
		width : '200dp',
		top : '20dp',
		left : '110dp',
		color : '#222',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType : Titanium.UI.KEYBOARD_EMAIL
	});

	var password = Ti.UI.createTextField({
		height : '40dp',
		width : '200dp',
		top : '70dp',
		left : '110dp',
		color : '#222',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		passwordMask : 'True'
	});

	var exercise = Ti.UI.createTextField({
		height : '40dp',
		width : '200dp',
		top : '20dp',
		left : '110dp',
		color : '#222',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	var lowIntensityTime = Ti.UI.createTextField({
		height : '40dp',
		width : '50dp',
		top : '100dp',
		left : '110dp',
		color : '#222',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION
	});

	var mediumIntensityTime = Ti.UI.createTextField({
		height : '40dp',
		width : '50dp',
		top : '100dp',
		left : '185dp',
		color : '#222',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION
	});

	var highIntensityTime = Ti.UI.createTextField({
		height : '40dp',
		width : '50dp',
		top : '100dp',
		left : '260dp',
		color : '#222',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION
	});

	var numberOfFriends = Ti.UI.createTextField({
		height : '40dp',
		width : '50dp',
		top : '150dp',
		left : '260dp',
		color : '#222',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION
	});

	win1.add(numberOfFriends);

	var friendLabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 20
		},
		text : 'Number of Participants:',
		top : '150dp',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	win1.add(friendLabel);

	var ratingLabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 20
		},
		text : 'Rating (1-5 scale):',
		top : '200dp',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	win1.add(ratingLabel);

	var numberRating = Ti.UI.createTextField({
		height : '40dp',
		width : '50dp',
		top : '200dp',
		left : '260dp',
		color : '#222',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION
	});

	win1.add(numberRating);

	var changeDateWin = Titanium.UI.createWindow({
		title : 'Change Date',
		backgroundColor : '#2C2B3D',
		backgroundImage : 'images/triangular.png',
		backgroundRepeat : true,
	});

	var datebtn = Ti.UI.createButton({
		title : "Change Date",
		top : '300dp',
		left : '150dp',
	});

	var doneButton = Ti.UI.createButton({
		title : "Done",
		top : '350dp'
	});

	var _date = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE,
		minDate : new Date,
	});

	doneButton.addEventListener('click', function(e) {
		changeDateWin.close();
		mainTabGroup.show();
		alert(_date.value);
	});

	datebtn.addEventListener('click', function(e) {
		changeDateWin.open();
		mainTabGroup.hide();
	});

	changeDateWin.add(_date);
	changeDateWin.add(doneButton);
	win1.add(datebtn);

	var recentLabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 25
		},
		text : 'Recent Activities:',
		top : '125dp',
		left : '5dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	profileWin.add(recentLabel);

	var refresh = Ti.UI.createButton({
		top : '300dp',
		left : '70dp',
		title : 'Refresh',
	});

	refresh.addEventListener('click', function(e) {
		profileUpdate();
	});

	profileWin.add(refresh);

	var submit = Ti.UI.createButton({
		top : '80%',
		left : '70%',
		color : 'white',
		font : {
			fontSize : 30,
			fontFamily : 'Helvetica Neue'
		},
		width : 130,
		height : 130,
		title : 'Submit',
		backgroundImage : './images/blue600.png',
		backgroundSelectedImage : './images/orange600.png',

	});

	var submitReq = Titanium.Network.createHTTPClient();

	submitReq.onload = function() {
		if (this.responseText == 'Activity submission succeeded') {
			alert("Your exercise has been submitted!");
		} else {
			alert(this.responseText);
		}
	};
	var social = 1;
	var t = new Date();
	submit.addEventListener('click', function(e) {
			alert(user.value);
			submitReq.open("POST", "http://sh.rice.edu:5000/mobile/submit");
			var params = {
				date : datepicked,
				activity : "running",
				social : social.value,
				lowintensity : 10,
				moderateintensity : 10,
				highintensity : 10,
				note : "",
				rate : social.value,
				hour : t.getHours(),
				min : t.getMinutes(),
				sec : t.getSeconds(),
				happiness : social.value,
				activeness : social.value,
				uuid : Titanium.Platform.id
			};
			submitReq.send(params);

	});

	var image = Ti.UI.createImageView({
		image : '/images/myimage.png',
		height : '100dp',
		width : '100dp',
		top : '5dp',
		left : '5dp',
	});

	profileWin.add(image);

	var deauth = Ti.UI.createButton({
		top : '300dp',
		left : '150dp',
		title : 'Deauthorize',
	});

	var deauthReq = Titanium.Network.createHTTPClient();

	deauthReq.onload = function() {
		if (this.responseText == 'Deauthorization succeeded') {
			alert("Phone successfully deauthorized.");
			Ti.App.Properties.removeProperty('loggedBefore');
			win2.open();
			mainTabGroup.hide();
		} else {
			alert(this.responseText);
		}
	};

	deauth.addEventListener('click', function(e) {
		deauthReq.open("POST", "http://sh.rice.edu:5000/mobile/detach");
		var params = {
			uuid : Titanium.Platform.id
		};
		deauthReq.send(params);
	});

	profileWin.add(deauth);

	/* Set up labels */

	var emaillabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 20
		},
		text : 'Username',
		top : '25dp',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var passwordlabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 20
		},
		text : 'Password',
		top : '75dp',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var exerciselabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 20
		},
		text : 'Exercise',
		top : '25dp',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var timelabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 20
		},
		text : 'Time (Min)',
		top : '105dp',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var intensitylabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 20
		},
		text : 'Intensity:',
		top : '70dp',
		left : '10dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var lowlabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 20
		},
		text : 'Low',
		top : '70dp',
		left : '115dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var medlabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 20
		},
		text : 'Med.',
		top : '70dp',
		left : '190dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var highlabel = Ti.UI.createLabel({
		color : 'white',
		font : {
			fontSize : 20
		},
		text : 'High',
		top : '70dp',
		left : '265dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var win2 = Titanium.UI.createWindow({
		title : 'Register Phone',
		backgroundColor : '#2C2B3D',
		backgroundImage : 'images/triangular.png',
		backgroundRepeat : true,
	});

	/* Add labels to windows */

	win2.add(emaillabel);
	win2.add(passwordlabel);
	win2.add(password);
	win2.add(email);

	win1.add(exercise);

	win1.add(exerciselabel);
	win1.add(timelabel);
	win1.add(intensitylabel);
	win1.add(exercise);
	win1.add(lowIntensityTime);
	win1.add(lowlabel);
	win1.add(mediumIntensityTime);
	win1.add(medlabel);
	win1.add(highIntensityTime);
	win1.add(highlabel);
	timeView.add(submit);

	var register = Ti.UI.createButton({
		top : '300dp',
		title : 'register',
	});

	win2.add(register);

	var registerReq = Titanium.Network.createHTTPClient();

	registerReq.onload = function() {

		if (this.responseText == 'Authentication succeeded') {
			alert("Account successfully registered.");
			homeWin.open();
			win2.close();
			Ti.UI.Android.hideSoftKeyboard();
			Ti.App.Properties.setInt('loggedBefore', 1);

		} else {
			alert(this.responseText);
		}
	};

	register.addEventListener('click', function(e) {
		if (email.value != '' && password.value != '') {
			registerReq.open("POST", "http://sh.rice.edu:5000/mobile/register");
			var params = {
				username : email.value,
				password : password.value,
				uuid : Titanium.Platform.id
			};
			registerReq.send(params);
		} else {
			alert("Username/Password are required");
		}
	});

	if (Ti.App.Properties.hasProperty('loggedBefore')) {
		homeWin.open();
		Ti.UI.Android.hideSoftKeyboard();
	} else {
		win2.open();
	}

})();
