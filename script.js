var weekdays = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

var months = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'
];

function getFormattedDate(month, weekday, day) {
  return weekdays[weekday] + ' ' + months[month] + ' ' + day;
}

function getWeather(data) {
  var condition = data.query.results.channel.item.condition;
  var date = new Date();
  var icon = document.getElementById('w-icon');

  document.getElementById('date').innerHTML = getFormattedDate(date.getMonth(), date.getDay(), date.getDate());
  document.getElementById('w-text').innerHTML = Math.round((condition.temp - 32) / 1.8) + '<span style="font-family: sans-serif; font-size: 0.5em;">&deg;</span>';

  // Partly Cloudy, Mostly Cloudy, Fair, Showers in the Vicinity, Haze, Light snow
  if (date.getHours() > 6 && date.getHours() < 18) {
    if (condition.text.indexOf('Fair') > -1)
      icon.src = 'weather_icons/sunny.png';
    else if (condition.text.indexOf('Showers') > -1)
      icon.src = 'weather_icons/showers.png';
    else if (condition.text.indexOf('Cloudy') > -1)
      icon.src = 'weather_icons/cloudy.png';
    else if (condition.text.indexOf('Haze') > -1) {
      icon.src = 'weather_icons/haze.png';
      icon.style.width = '35%';
    } else if (condition.text.indexOf('Snow') > -1)
      icon.src = 'weather_icons/snow.png';
  } else {
    if (condition.text.indexOf('Fair') > -1)
      icon.src = 'weather_icons/clear.png';
    else if (condition.text.indexOf('Cloudy') > -1)
      icon.src = 'weather_icons/cloudy.png';
  }
}

function updateTime() { // TODO Manage memory
  var date = new Date();
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

  document.getElementById('time').innerHTML =  hours + ':' + minutes;
  document.getElementById('seconds').innerHTML = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  window.setTimeout(updateTime, 1000);
}

window.onload = updateTime();
