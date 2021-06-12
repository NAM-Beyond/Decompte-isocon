var Months = [31,28,31,30,31,30,31,31,30,31,30,31];
if (new Date().getFullYear() % 4 == 0) {
    Months[1] = 29;
}
/* No need to explain that one */
window.onload = function RemoveFuckingUselessEmptyTextNodes() {
    for (z = 1; z < 3; z++) {
        for (y = 0; y < document.getElementById("0" + z).childNodes.length; y ++) {
            if (document.getElementById("0" + z).childNodes[y].childNodes.length != 0) {
                for (x = 0; x < document.getElementById("0" + z).childNodes[y].childNodes.length; x++) {
                    if (document.getElementById("0" + z).childNodes[y].childNodes[x].childNodes.length != 0) {
                        for (w = 0; w < document.getElementById("0" + z).childNodes[y].childNodes[x].childNodes.length; w++) {
                            if (document.getElementById("0" + z).childNodes[y].childNodes[x].childNodes[w].nodeName =="#text") {
                                document.getElementById("0" + z).childNodes[y].childNodes[x].removeChild(document.getElementById("0" + z).childNodes[y].childNodes[x].childNodes[w]);
                            }
                        }
                    }
                    else {
                        document.getElementById("0" + z).childNodes[y].removeChild(document.getElementById("0" + z).childNodes[y].childNodes[x]);
                        x--;
                    }
                }
            }
            else {
                document.getElementById("0" + z).removeChild(document.getElementById("0" + z).childNodes[y]);
                y--;
            }
        }
    }
}
/* Function to enlight the button your mouse is over */
function Light(LineId, ButtonFontColor, ButtonBackgroundColor) {
    document.getElementById(LineId).childNodes[0].childNodes[0].style.color = ButtonFontColor;
    document.getElementById(LineId).childNodes[0].childNodes[0].style.backgroundColor = ButtonBackgroundColor;
}
/* Function that creates the input field after a button is clicked before adding it to the table */
function AddInputField(TableId) {
    document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].innerHTML = "";
    NewField = document.createElement("input");
    NewField.type = "text";
    NewField.setAttribute("onkeypress", "AddNewName(event, '" + TableId + "')");
    document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].appendChild(NewField);
    NewField.setAttribute("onblur", "AddNewButton('" + TableId + "')");
}
/* Function of the keyboard event listener, an input is add only if the user press enter and then add a new name, a time start option and then a new line*/
function AddNewName(event, TableId) {
    v = event.which || event.keyCode;
    if (v == 13) {
        document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].childNodes[0].removeAttribute("onblur");
        NewName = document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].childNodes[0].value;
        document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].innerHTML = "";
        document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].innerText = NewName;
        NewTimeInput = document.createElement("input");
        NewTimeInput.setAttribute("type", "datetime-local");
        NewTimeInput.setAttribute("onblur", "SetCumulativeTime('" + TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1) + "', document.getElementById('" + TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1) + "').childNodes[1].childNodes[0].value.split(/[-:T]/))");
        document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[1].appendChild(NewTimeInput);
        NewLine = document.createElement("tr");
        NewLine.id = TableId + (document.getElementById(TableId).childNodes[0].childNodes.length);
        document.getElementById(TableId).childNodes[0].appendChild(NewLine);
        for (u = 0; u < 5; u++) {
            NewLine.appendChild(document.createElement("td"));
        }
        AddNewButton(TableId);
    }
}
/* Function that add a new button, on the current line or on a new line */
function AddNewButton(TableId) {
    document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].innerHTML = "";
    NewButton = document.createElement("button");
    NewButton.setAttribute("onclick", "AddInputField('" + TableId + "')");
    NewButton.setAttribute("onmouseover", "Light('" + TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1) + "', '#FFFFFF', '#0099FF')");
    NewButton.setAttribute("onmouseout", "Light('" + TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1) + "', '#000000', '#FFFF96')");
    NewButton.innerText = "+";
    document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].appendChild(NewButton);
}
/* Function that sets the already cumulative time considering the beginning set by the user */
function SetCumulativeTime(LineId, ActualStartTime = 0, CalculatedStartTime = 0, EventTime = 0, Column = 0) {
    var MaxRange = Column == 3 || Column == 4 ? Column + 1 : Column + 5;
    Column = Column == 0 ? 3 : Column;
    if (ActualStartTime == 0) {
        alert("Erreur : pas de date définie");
        return;
    }
    if (EventTime == 0) {
        EventTime = TimeNow().slice(0);
        if (TimeConsistency(TimeAdjust(ActualStartTime), TimeAdjust(EventTime)) == "No") {
            alert("Date de début désignée dans le futur Marty ! Choisis-en une autre.");
            return;
        }
    }
    /* if (function() {
        for (t = 0; t < MainList.length; t++) {
            if (NamesList[t][0] == LineId) {
                return "Exists";
            }
        }
    } != "Exists") {
        NamesList.push([LineId, ActualStartTime]);
    };*/
    var FirstTime = CalculatedStartTime == 0 ? TimeAdjust(ActualStartTime).slice(0) : TimeAdjust(CalculatedStartTime).slice(0);
    var SecondTime = TimeAdjust(EventTime).slice(0);
    var NewMinutes = parseInt(SecondTime[4]) - parseInt(FirstTime[4]);
    var NewHours = parseInt(SecondTime[3]) - parseInt(FirstTime[3]);
    var NewDay = parseInt(SecondTime[2]) - parseInt(FirstTime[2]);
    var NewMonth = parseInt(SecondTime[1]) - parseInt(FirstTime[1]);
    var NewYear = parseInt(SecondTime[0]) - parseInt(FirstTime[0]);
    if (NewMinutes < 0) {
        NewMinutes += 60;
        NewHours -= 1;
    }
    if (NewHours < 0) {
        NewHours += 24;
        NewDay -= 1;
    }
    if (NewDay < 0) {
        NewDay += Months[parseInt(FirstTime[1]) - 1];
        NewMonth -= 1;
    }
    if (NewMonth < 0) {
        NewMonth += 12;
        NewYear -= 1;
    }
    NewHours = NewHours + NewDay * 24 + NewMonth * 30 * 24 + NewYear * 365 * 24;
    for (t = Column; t < MaxRange; t++) {
        document.getElementById(LineId).childNodes[t].innerText = NewHours + " heures " + NewMinutes + " minutes";
    }
    if (SecondTime[5] != undefined) {
        document.getElementById(LineId).childNodes[1].childNodes[0].setAttribute("onblur", "SetPause('" + LineId + "', [" + ActualStartTime + "])");
        document.getElementById(LineId).style.backgroundColor = "#00FF00";
        document.getElementById(LineId).childNodes[2].innerText = "En cours";
        StartCount(LineId, NewHours, NewMinutes, Column, MaxRange);
    }
    else {
        if ((((NewHours == 24 && NewMinutes > 0) || NewHours > 24) && LineId.charAt(1) == "2") || (((NewHours == 48 && NewMinutes > 0) || NewHours > 48) && LineId.charAt(1) == "1")) {
            document.getElementById(LineId).style.backgroundColor = "#FF0000";
        }
        document.getElementById(LineId).childNodes[1].childNodes[0].setAttribute("onblur", "Restart('" + LineId + "', [" + SecondTime + "])");
    }
}
/* Function that ensure the counting */
function StartCount(LineId, NewHours, NewMinutes, Column, MaxRange) {
    if (NewMinutes == 60) {
        NewMinutes = 0;
        NewHours += 1; 
    }
    if ((((NewHours == 24 && NewMinutes > 0) || NewHours > 24) && LineId.charAt(1) == "2") || (((NewHours == 48 && NewMinutes > 0) || NewHours > 48) && LineId.charAt(1) == "1")) {
        document.getElementById(LineId).style.backgroundColor = "#FF0000";
    }
    for (s = Column; s < MaxRange; s++) {
        document.getElementById(LineId).childNodes[s].innerText = NewHours + " heures " + NewMinutes + " minutes";
    }
    NewMinutes += 1;
    window[LineId + Column] = setTimeout(function() {
        StartCount(LineId, NewHours, NewMinutes, Column, MaxRange);
    }, 60000);
}
/* Function that ensure the pause of the counting and set a restart option */
function SetPause(LineId, StartTime) {
    var NewHours = [parseInt(document.getElementById(LineId).childNodes[3].innerText.match(/\d+/g)[0]), parseInt(document.getElementById(LineId).childNodes[4].innerText.match(/\d+/g)[0])];
    var NewMinutes = [parseInt(document.getElementById(LineId).childNodes[3].innerText.match(/\d+/g)[1]), parseInt(document.getElementById(LineId).childNodes[4].innerText.match(/\d+/g)[1])];
    var PauseTime = document.getElementById(LineId).childNodes[1].childNodes[0].value.split(/[-:T]/);
    StartTime = TimeAdjust(StartTime);
    PauseTime = TimeAdjust(PauseTime);
    if (TimeConsistency(StartTime, PauseTime) == "No") {
        alert("Date de pause désignée avant la date de début Docteur Who ! Choisissez une autre date.");
        return;
    }
    if (TimeConsistency(PauseTime, TimeNow()) == "No") {
        alert("Date de pause désignée dans le futur Marty ! Choisis-en une autre.");
        return;
    }
    var ActualTime = TimeNow().slice(0);
    clearTimeout(window[LineId + 3]);
    clearTimeout(window[LineId + 4]);
    if (document.getElementById(LineId).style.backgroundColor != "#FF0000") {
        document.getElementById(LineId).style.backgroundColor = "#FFFF00";
        document.getElementById(LineId).childNodes[2].innerText = "En pause";
    }
    var IntervalTime = new Array(5);
    for (r = 0; r < 5; r++) {
        IntervalTime[r] = (parseInt(ActualTime[r]) - parseInt(StartTime[r])).toString();
    }
    IntervalTime[3] = (parseInt(IntervalTime[3]) + parseInt(IntervalTime[2]) * 24 + parseInt(IntervalTime[1]) * 30 * 24 + parseInt(IntervalTime[0]) * 365 * 24).toString();
    for (q = 0; q < 3; q++) {
        IntervalTime[q] = "00";
    }
    IntervalTime = TimeAdjust(IntervalTime);
    var MaxLoop = 2;
    var ColumnRange = 3;
    if (NewHours[0] == NewHours[1] && NewMinutes[0] == NewMinutes[1]) {
        MaxLoop = 1;
        ColumnRange = 0;
    }
    for (p = 0; p < MaxLoop; p++) {
        var TempTime = IntervalTime.slice(0);
        TempTime[4] = (NewMinutes[p] - parseInt(TempTime[4])).toString();
        TempTime[3] = (NewHours[p] - parseInt(TempTime[3])).toString();
        for (o = 0; o < 5; o++) {
            TempTime[o] = (parseInt(StartTime[o]) - parseInt(TempTime[o])).toString();
        }
        TempTime = TimeAdjust(TempTime);
        SetCumulativeTime(LineId, StartTime, TempTime, PauseTime, p + ColumnRange);
    }
}
/* Function that handles the restart an set again a pause option */
function Restart(LineId, PauseTime) {
    var NewHours = [parseInt(document.getElementById(LineId).childNodes[3].innerText.match(/\d+/g)[0]), parseInt(document.getElementById(LineId).childNodes[4].innerText.match(/\d+/g)[0])];
    var NewMinutes = [parseInt(document.getElementById(LineId).childNodes[3].innerText.match(/\d+/g)[1]), parseInt(document.getElementById(LineId).childNodes[4].innerText.match(/\d+/g)[1])];
    var RestartTime = document.getElementById(LineId).childNodes[1].childNodes[0].value.split(/[-:T]/);
    PauseTime = TimeAdjust(PauseTime);
    RestartTime = TimeAdjust(RestartTime);
    if (TimeConsistency(PauseTime, RestartTime) == "No") {
        alert("Date de reprise désignée avant la date de pause Docteur Who ! Choisissez une autre date.");
        return;
    }
    if (TimeConsistency(RestartTime, TimeNow()) == "No") {
        alert("Date de reprise désignée dans le futur Marty ! Choisis-en une autre.");
        return;
    }
    if (TimeConsistency(PauseTime, RestartTime) == "Zero") {
        NewHours[0] = 0;
        NewMinutes[0] = 0;
    }
    for (n = 0; n < 2; n++) {
        var TempTime = RestartTime.slice(0);
        TempTime[4] = (parseInt(TempTime[4]) - NewMinutes[n]).toString();
        TempTime[3] = (parseInt(TempTime[3]) - NewHours[n]).toString();
        TempTime = TimeAdjust(TempTime);
        SetCumulativeTime(LineId, RestartTime, TempTime, 0, n + 3);
    }
}
/* Function that check mistakes of wrongly chosen dates */
function TimeConsistency(FirstTime, SecondTime) {
    var TempFirstTime = "";
    var TempSecondTime = "";
    for (m = 0; m < 5; m++) {
        TempFirstTime += FirstTime[m];
        TempSecondTime += SecondTime[m];
    }
    if (parseInt(TempFirstTime) > parseInt(TempSecondTime)) {
        return "No";
    }
    if (parseInt(TempSecondTime) - parseInt(TempFirstTime) > 20000) {
        return "Zero";
    }
    if (parseInt(TempSecondTime) - parseInt(TempFirstTime) > 150000) {
        return "Fifteen";
    }
}
/* A function that checks if the different elements of the time arrays have correct values and in the right format */
function TimeAdjust(Time) {
    if (parseInt(Time[4]) < 0) {
        var MinutesIncrement = Math.floor(Math.abs(parseInt(Time[4]))/60) + 1;
        Time[4] = (parseInt(Time[4]) + MinutesIncrement * 60).toString();
        Time[3] = (parseInt(Time[3]) - MinutesIncrement).toString();
    }
    if (parseInt(Time[3]) < 0) {
        var HoursIncrement = Math.floor(Math.abs(parseInt(Time[3]))/24) + 1;
        Time[3] = (parseInt(Time[3]) + HoursIncrement * 24).toString();
        Time[2] = (parseInt(Time[2]) - HoursIncrement).toString();
    }
    if (parseInt(Time[2]) < 0) {
        if (Time[1] == "01") {
            Time[1] = "13";
        }
        Time[2] = (parseInt(Time[2]) + Months[Time[1] - 2]).toString();
        Time[1] = (parseInt(Time[1]) - 1).toString();
    }
    if (parseInt(Time[1]) < 0) {
        Time[1] = (parseInt(Time[1]) + 12).toString();
        Time[0] = (parseInt(Time[0]) - 1).toString();
    }
    for (l = 0; l < Time.length; l++) {
        Time[l] = parseInt(Time[l]) < 10 ? "0" + parseInt(Time[l]) : parseInt(Time[l]).toString();
    }
    return Time;
}
/* A function that is used to check if you're not chosing a date in the future */
function TimeNow() {
    var RightNow = new Date();
    var NowTime = new Array(6);
    NowTime[0] = RightNow.getFullYear();
    NowTime[1] = RightNow.getMonth() + 1;
    NowTime[2] = RightNow.getDate();
    NowTime[3] = RightNow.getHours();
    NowTime[4] = RightNow.getMinutes();
    NowTime[5] = RightNow.getSeconds();
    NowTime = TimeAdjust(NowTime);
    return NowTime;
}