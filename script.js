function getFormattedDate(month, weekday, day) {
    var str = weekday == 0? "Mon ": weekday == 1? "Tues ": weekday == 2? "Wed ": weekday == 3? "Thur ": weekday == 4? "Fri ": weekday == 5? "Sat ": "Sun ";
    str += month == 0? "Jan ": month == 1? "Feb ": month == 2? "Mar ": month == 3? "Apr ": month == 4? "May ": month == 5? "Jun ": month == 6? "Jul ": month == 7? "Aug ": month == 8? "Sep ": month == 9? "Oct ": month == 10? "Nov ": "Dec ";
    str += day;
    return str;
}

function getWeather(data) {
    var condition = data.query.results.channel.item.condition;
    var date = new Date();
    var icon = document.getElementById("w-icon");

    document.getElementById("date").innerHTML = getFormattedDate(date.getMonth(), date.getDay(), date.getDate());
    document.getElementById("w-text").innerHTML = Math.round((condition.temp - 32)/1.8) + "<span style='font-family: sans-serif; font-size: 0.5em;'>&deg;</span>";

    // Partly Cloudy, Mostly Cloudy, Fair, Showers in the Vicinity, Haze, Light snow
    if(date.getHours() > 6 && date.getHours() < 18) {
        if(condition.text.indexOf("Fair") > -1)
            icon.src = "weather_icons/sunny.png";
        else if(condition.text.indexOf("Showers") > -1)
            icon.src = "weather_icons/showers.png";
        else if(condition.text.indexOf("Cloudy") > -1)
            icon.src = "weather_icons/cloudy.png";
        else if(condition.text.indexOf("Haze") > -1) {
            icon.src = "weather_icons/haze.png";
            icon.style.width = "35%";
        } else if(condition.text.indexOf("Snow") > -1)
            icon.src = "weather_icons/snow.png";
    } else {
        if(condition.text.indexOf("Fair") > -1)
            icon.src = "weather_icons/clear.png";
        else if(condition.text.indexOf("Cloudy") > -1)
            icon.src = "weather_icons/cloudy.png";
    }
}

function updateTime() { // TODO Manage memory
    var date = new Date();
    var hours = date.getHours() < 10? "0" + date.getHours(): date.getHours();
    var minutes = date.getMinutes() < 10? "0" + date.getMinutes(): date.getMinutes();

    document.getElementById("time").innerHTML =  hours + ":" + minutes;
    document.getElementById("seconds").innerHTML = date.getSeconds() < 10? "0" + date.getSeconds(): date.getSeconds();

    window.setTimeout(updateTime, 1000);
}

window.onload = updateTime();
