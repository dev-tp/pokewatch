var weekdays = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

var months = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'
];

var weatherConditions = {
  'day': {
    'Cloudy': 'weather_icons/cloudy.png',
    'Fair': 'weather_icons/sunny.png',
    'Haze': 'weather_icons/haze.png',
    'Showers': 'weather_icons/showers.png',
    'Snow': 'weahter_icons/snow.png'
  },
  'night': {
    // TODO Create icons specific for night time
    'Cloudy': 'weather_icons/cloudy.png',
    'Clear': 'weather_icons/clear.png'
  }
};

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
  var hours = date.getHours();
  var weatherCondition = condition.text.split(' ');
  var size = weatherCondition.length;

  if (6 < hours && hours < 18)
    icon.src = weatherConditions['day'][weatherCondition[size == 1 || size > 2 ? 0 : 1]];
  else
    icon.src = weatherConditions['night'][weatherCondition[size == 1 || size > 2 ? 0 : 1]];
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
