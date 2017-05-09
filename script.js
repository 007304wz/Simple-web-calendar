// Code goes here

function getHowManyDays(year,month) {
	var thisYear = year;
	var thisMonth = month;
	var daysCount = 0;
	if(thisMonth == 0 || thisMonth == 2 || thisMonth == 4||thisMonth == 6||thisMonth == 7|| thisMonth == 9|| thisMonth ==11) {
		daysCount = 31;
	}else{
		if(thisMonth == 1) {
			if((thisYear % 4 == 0 && thisYear % 100 != 0) || (thisYear % 400 ==0)) {
				daysCount = 29;
			}else{
				daysCount = 28
			}
		}else{
			daysCount = 30;
		}
	}
	return daysCount;
}

function getRows(year,month) {
	var blankCount = getBlankCount(year,month);
	var daysCount = getHowManyDays(year,month);
	return Math.ceil((blankCount+daysCount)/7);
}

function getBlankCount(year,month) {
	var date = new Date();
	date.setYear(year);
	date.setMonth(month);
	var blankCount = date.getDay();
	return blankCount;
}

function showCalendar(year,month) {
	var daysCount = getHowManyDays(year,month);
	var blankCount = getBlankCount(year,month);
	var rows = getRows(year,month);
	var html = '<tr><td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Tur</td><td>Fri</td><td>Sat</td></tr>';
	html += '<div id="div">';
	//console.log(rows);
	for(var i = 0; i < rows; i++) {
		html += '<tr id="tr_' + i + '">';
		for(var j = 0; j < 7; j++) {
			html += "<td></td>";
		}
		html += '</tr>';
	}
	html += '</div>'
	//console.log(html);
	$('#table').html(html);
}

function showDays(year,month) {
  var days = 1;
  var daysCount = getHowManyDays(year,month);
	var blankCount = getBlankCount(year,month);
  var td_arr = $("tr[id^='tr_'] td");
  
	for(var k = 0; k < daysCount+blankCount; k++) {
		if(k < blankCount) {
			td_arr[k].innerHTML = null;
		}else {
		  if(days < 10) {
		    days = "0" + days;
		  }
			td_arr[k].innerHTML = days;
			days++;
		}
	}
}

function prevMonth() {
  var month = $("#select_month option:selected").attr('value');
  if(month == 1) {
    month = 12;
    var year = $("#select_year option:selected").attr('value');
    year = year - 1;
    $('#select_year').val(year).trigger('change');
    $('#select_month').val(month).trigger('change')
  }else {
    month = month - 1;
    $('#select_month').val(month).trigger('change')
  }
}
function prevYear() {
  var year = $("#select_year option:selected").attr('value');
  year = year - 1;
  $('#select_year').val(year).trigger('change')
}
function nextMonth() {
  var month = $("#select_month option:selected").attr('value');
  if(month == 12) {
    month = 1;
    var year = $("#select_year option:selected").attr('value');
    year = parseInt(year) + 1;
    $('#select_year').val(year).trigger('change')
  }else {
    month = parseInt(month) + 1;
  }
  $('#select_month').val(month).trigger('change')
}
function nextYear() {
  var year = $("#select_year option:selected").attr('value');
  year = parseInt(year);
  year = year + 1;
  $('#select_year').val(year).trigger('change')
}
function changeDate() {
  var year = $("#select_year option:selected").attr('value');
  var month = $("#select_month option:selected").attr('value');
  month = month -1;
  showCalendar(year,month);
  showDays(year,month);
}

$(document).ready(function() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	showCalendar(year,month);
	showDays(year,month);
	$("#select_year").html("<option id='current_year' value='"+year+"' selected='selected'>"+year+"</option>");
	$("#select_month").html("<option id='current_month' value='"+(month+1)+"' selected='selected'>"+(month+1)+"</option>");
	for(var i=100; i>0; i--) {
		$("<option value='"+(year-i)+"'>"+(year-i)+"</option>").insertBefore($("#current_year"));
		$("#current_year").after("<option value='"+(year+i)+"'>"+(year+i)+"</option>");
	}
	for(var j = 1; j<=month; j++) {
		$("<option value='"+j+"'>"+j+"</option>").insertBefore($("#current_month"));
	}
	for(var k = 12; k>month+1; k--) {
		$("#current_month").after("<option value='"+k+"'>"+k+"</option>");
	}
})