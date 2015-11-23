// Registers new helper methods on the Handlebars template

// Need to track the last date used
var monthLastDisplayed = '',
    monthLastDisplayedNumber = 0;

// utility function
function isset(object){
  return (typeof object !=='undefined');
}

// show the month header, only if it's not the same month as the last event
Handlebars.registerHelper("headerMonth", function(date){
  date = date.replace(" ","T"); // drupal date format needs a "T"
                  // "2015-10-19 08:15:00" >> "2015-10-19T08:15:00"
  var date = new Date(date),
     month = "January,February,March,April,May,June,July,August,September,October,November,December"
    .split(",")[date.getMonth()];

  // track date change intellegently
  if (month != monthLastDisplayed) {
    monthLastDisplayed = month;
    monthLastDisplayedNumber++;
    return ('<h3 class="month-' + monthLastDisplayedNumber + ' month-' + monthLastDisplayed + '">' + month + ' ' + date.getFullYear() + '</h3>');
  }
});

// limit the number of items shown...
// limit an array to a maximum of elements (from the start)
Handlebars.registerHelper('limit', function (arr, limit) {
  return arr.slice(0, limit);
});

// If the person is a staff member, say so
Handlebars.registerHelper('isEBIStaff', function (role) {
  if (role == 'Person (EBI staff member)') 
    return 'EMBL-EBI';
});

// inject the class of the current month, ala "month-1 month-nov"
Handlebars.registerHelper("cssMonth", function(date){
  // date = date.replace(" ","T"); // drupal date format needs a "T"
  //                 // "2015-10-19 08:15:00" >> "2015-10-19T08:15:00"
  // var date = new Date(date),
  //    month = "January,February,March,April,May,June,July,August,September,October,November,December"
  //   .split(",")[date.getMonth()];

  // // track date change intellegently
  // if (month != monthLastDisplayed) {
    // monthLastDisplayed = month;
    // monthLastDisplayedNumber++;
    return ('month-' + monthLastDisplayedNumber + ' month-' + monthLastDisplayed + ' ');
  // }
});

function formatDate(date){
  if (typeof(date) == "undefined") { return "Unknown"; }

  date = date.replace(" ","T"); // drupal date format needs a "T"
                  // "2015-10-19 08:15:00" >> "2015-10-19T08:15:00"

  var dateAway = new Date(date),
      date = dateAway.getDate(), 
      month = "January,February,March,April,May,June,July,August,September,October,November,December"
    .split(",")[dateAway.getMonth()];

  function nth(d) {
    if(d>3 && d<21) return 'th'; 
    switch (d % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
      }
  } 
  return date+nth(date) + " " + month.substring(0,3);
}

// we want to show a start and end, a la: Oct 16th; Oct 12th-15th, Oct 21st - Nov 1st
Handlebars.registerHelper("smartDates", function(date1, date2){

  // if start = end, just return the first
  if (date1 == date2) {
    return formatDate(date1);
  }
 
  // Ok, so we have a proper start and end...
  var jointDate = '';  

  // are the two dates in the same month?
  if (new Date(date1).getMonth() == new Date(date2).getMonth()) {
    // if it's the same day, don't list the date twice ...
    if (new Date(date1).getDay() == new Date(date2).getDay()) {
      return formatDate(date1);
    }

    //don't return the month on the second date..
    jointDate = formatDate(date1) + '-' + formatDate(date2).substring(0,4);
    return jointDate;
  }

  // ok, so just tell us it all
  jointDate = formatDate(date1) + '-' + formatDate(date2);
  return jointDate;
});

// we want to show a start and end, a la: Oct 16th; Oct 12th-15th, Oct 21st - Nov 1st
Handlebars.registerHelper("dateWithYear", function(date){
  date = date.replace(" ","T"); // drupal date format needs a "T"
                  // "2015-10-19 08:15:00" >> "2015-10-19T08:15:00"

  var dateAway = new Date(date);

  return formatDate(date) + ' ' + dateAway.getFullYear();
});

//we want to show a ebi-topic terms
Handlebars.registerHelper("ebiTopicTerm", function(data){
  var ebi_topic_term;
  $(data).each( function(i, term) {
    ebi_topic_term = term.name;
    console.log(term.name);
  });
  console.log('---');
  return ebi_topic_term;
  
});

// we want to show a start and end, a la: Oct 16th; Oct 12th-15th, Oct 21st - Nov 1st
Handlebars.registerHelper("seminarDates", function(date1, date2){
  return formatDate(date1);
});

// Only show the desciption if the title will fit on one line
Handlebars.registerHelper("smartDescription", function(title, description){
  // if a long title, don't return any text
  if (title.length > 30) { return; }

  var processedDescription =  jQuery('<div/>').html(description.safe_value).text();
  return (Handlebars.helpers.striptags(processedDescription)).substring(0,120) + '... Read more »';
});

// show the name of the event, unless it's a seminar then show the presenter's name
Handlebars.registerHelper("smartEventsName", function(title){

  if (this.bundle_name != "Seminar") {
    return title;
  }

  if (!isset(this.speakers_list)) { // some seminars have no speaker data?
    return title + '';
  }

  if (!isset(this.speakers_list[0])) { // some seminars have no speaker data?
    return title + '';
  }

  if (!isset(this.speakers_list[0].field_speaker)) { // some seminars have no speaker data?
    return title + '';
  }

  if (isset(this.speakers_list[0].field_speaker.field_person_affiliation)) {
    return 'Speaker: ' + this.speakers_list[0].field_speaker.title + " " + this.speakers_list[0].field_speaker.field_person_affiliation['value'];
  } else if (isset(this.speakers_list[0].field_speaker.title)) {
    return 'Speaker: ' + this.speakers_list[0].field_speaker.title ;
  }
});


Handlebars.registerHelper("striptags", function( txt ){

  // exit now if text is undefined 
  if(typeof txt == "undefined") return;
  // the regular expresion
  var regexp = new RegExp('#([^\\s]*)','g');
  // replacing the text
  return txt.replace(regexp, '');
});

Handlebars.registerHelper('trimString', function(passedString) {
  var StrippedString = passedString.replace(/(<([^>]+)>)/ig,"");
  var theString = StrippedString.substring(0,150);
  return new Handlebars.SafeString(theString + ' ...')
});

Handlebars.registerHelper('toLowerCase', function(passedString) {
  return passedString.toLowerCase();
});

Handlebars.registerHelper('escapeHtml', function(text) { 
    text = Handlebars.Utils.escapeExpression(text);
     
    return new Handlebars.SafeString(text); 
  });

