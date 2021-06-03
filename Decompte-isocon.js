var Months = [31,28,31,30,31,30,31,31,30,31,30,31];
if (new Date().getFullYear() % 4 == 0) {Months[1] = 29;}
/* No need to explain that one */
window.onload = function RemoveFuckingUselessEmptyTextNodes() {
    for (w = 1; w < 3; w++) {
        for (x = 0; x < document.getElementById("0" + w).childNodes.length; x ++) {
            if (document.getElementById("0" + w).childNodes[x].childNodes.length != 0) {
                for (y = 0; y < document.getElementById("0" + w).childNodes[x].childNodes.length; y++) {
                    if (document.getElementById("0" + w).childNodes[x].childNodes[y].childNodes.length != 0) {
                        for (z = 0; z < document.getElementById("0" + w).childNodes[x].childNodes[y].childNodes.length; z++) {
                            if (document.getElementById("0" + w).childNodes[x].childNodes[y].childNodes[z].nodeName =="#text") {
                                document.getElementById("0" + w).childNodes[x].childNodes[y].removeChild(document.getElementById("0" + w).childNodes[x].childNodes[y].childNodes[z]);
                            }
                        }
                    }
                    else {
                        document.getElementById("0" + w).childNodes[x].removeChild(document.getElementById("0" + w).childNodes[x].childNodes[y]);
                        y--;
                    }
                }
            }
            else {
                document.getElementById("0" + w).removeChild(document.getElementById("0" + w).childNodes[x]);
                x--;
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
    y = event.which || event.keyCode;
    if (y == 13) {
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
        for (x = 0; x < 5; x++) {
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
function SetCumulativeTime(LineId, FirstTime, SecondTime = 0, Column = 0) {
    if (SecondTime == 0) {
        SecondTime = TimeNow();
        if (TimeConsistency(TimeAdjust(FirstTime), TimeAdjust(SecondTime)) == "No") {
            alert("Date de début désignée dans le futur Marty ! Choisis-en une autre.");
            return;
        }
    }
    if (Column == 0) {
        SetCumulativeTime(LineId, FirstTime, SecondTime, 3);
        SetCumulativeTime(LineId, FirstTime, SecondTime, 4);
        return;
    }
    if (FirstTime.length == 1) {
        alert("Erreur : pas de date définie");
        return;
    }
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
    document.getElementById(LineId).childNodes[Column].innerText = NewHours + " heures " + NewMinutes + " minutes";
    if (SecondTime[5] != undefined) {
        NewMinutes -= 1;
        document.getElementById(LineId).childNodes[1].childNodes[0].setAttribute("onblur", "SetPause('" + LineId + "', [" + FirstTime + "])");
        document.getElementById(LineId).style.backgroundColor = "#00FF00";
        document.getElementById(LineId).childNodes[2].innerText = "En cours";
        StartCount(LineId, NewHours, NewMinutes, Column);
    }
    else {
        if ((NewHours >= 24 && LineId.charAt(1) == "2") || (NewHours >= 48 && LineId.charAt(1) == "1")) {
            document.getElementById(LineId).style.backgroundColor = "#FF0000";
        }
        document.getElementById(LineId).childNodes[1].childNodes[0].setAttribute("onblur", "Restart('" + LineId + "', [" + SecondTime + "])");
    }
}
/* Function that ensure the counting */
function StartCount(LineId, NewHours, NewMinutes, Column) {
    NewMinutes += 1;
    if (NewMinutes == 60) {
        NewMinutes = 00;
        NewHours += 1; 
    }
    if ((((NewHours == 24 && NewMinutes > 0) || NewHours > 24) && LineId.charAt(1) == "2") || (((NewHours == 48 && NewMinutes > 0) || NewHours > 48) && LineId.charAt(1) == "1")) {
        document.getElementById(LineId).style.backgroundColor = "#FF0000";
    }
    document.getElementById(LineId).childNodes[Column].innerText = NewHours + " heures " + NewMinutes + " minutes";
    window[LineId + Column] = setTimeout(function() {
        StartCount(LineId, NewHours, NewMinutes, Column);
    }, 60000);
}
/* Function that ensure the pause of the counting and set a restart option */
function SetPause(LineId, StartTime) {
    var NewHours = [parseInt(document.getElementById(LineId).childNodes[3].innerText.match(/\d+/g)[0]), parseInt(document.getElementById(LineId).childNodes[4].innerText.match(/\d+/g)[0])];
    var NewMinutes = [parseInt(document.getElementById(LineId).childNodes[3].innerText.match(/\d+/g)[1]), parseInt(document.getElementById(LineId).childNodes[4].innerText.match(/\d+/g)[1])];
    var PauseTime = document.getElementById(LineId).childNodes[1].childNodes[0].value.split(/[-:T]/);
    if (TimeConsistency(TimeAdjust(StartTime), TimeAdjust(PauseTime)) == "No") {
        alert("Date de pause désignée avant la date de début Docteur Who ! Choisissez une autre date.");
        return;
    }
    if (TimeConsistency(TimeAdjust(PauseTime), TimeNow()) == "No") {
        alert("Date de pause désignée dans le futur Marty ! Choisis-en une autre.");
        return;
    }
    clearTimeout(window[LineId + 3]);
    clearTimeout(window[LineId + 4]);
    if (document.getElementById(LineId).style.backgroundColor != "#FF0000") {
        document.getElementById(LineId).style.backgroundColor = "#FFFF00";
        document.getElementById(LineId).childNodes[2].innerText = "En pause";
    }
}
/* Function that handles the restart an set again a pause option */
function Restart(LineId, PauseTime) {
    var NewHours = [parseInt(document.getElementById(LineId).childNodes[3].innerText.match(/\d+/g)[0]), parseInt(document.getElementById(LineId).childNodes[4].innerText.match(/\d+/g)[0])];
    var NewMinutes = [parseInt(document.getElementById(LineId).childNodes[3].innerText.match(/\d+/g)[1]), parseInt(document.getElementById(LineId).childNodes[4].innerText.match(/\d+/g)[1])];
    var RestartTime = document.getElementById(LineId).childNodes[1].childNodes[0].value.split(/[-:T]/);
    if (TimeConsistency(TimeAdjust(PauseTime), TimeAdjust(RestartTime)) == "No") {
        alert("Date de reprise désignée avant la date de pause Docteur Who ! Choisissez une autre date.");
        return;
    }
    if (TimeConsistency(TimeAdjust(RestartTime), TimeNow()) == "No") {
        alert("Date de reprise désignée dans le futur Marty ! Choisis-en une autre.");
        return;
    }
    if (TimeConsistency(TimeAdjust(PauseTime), TimeAdjust(RestartTime)) == "Zero") {
        NewHours[0] = 0;
        NewMinutes[0] = 0;
    }
    for (y = 0; y < 2; y++) {
        TempTime = RestartTime.slice(0);
        TempTime[4] = (parseInt(TempTime[4]) - NewMinutes[y]).toString();
        if (parseInt(TempTime[4]) < 0) {
            TempTime[4] = parseInt(TempTime[4]) + 60 < 10 ? "0" + (parseInt(TempTime[4]) + 60) : (parseInt(TempTime[4]) + 60).toString();
            TempTime[3] = (parseInt(TempTime[3]) - 1).toString();
        }
        TempTime[3] = (parseInt(TempTime[3]) - NewHours[y]).toString();
        if (parseInt(TempTime[3]) < 0) {
            TempTime[3] = parseInt(TempTime[3]) + 24 < 10 ? "0" + (parseInt(TempTime[3]) + 24) : (parseInt(TempTime[3]) + 24).toString();
            TempTime[2] = (parseInt(TempTime[2]) - 1).toString();
        }
        if (parseInt(TempTime[2]) < 0) {
            if (TempTime[1] == "01") {
                TempTime[1] = "13";
            }
            TempTime[2] = parseInt(TempTime[2]) + Months[TempTime[1] - 2] < 10 ? "0" + (parseInt(TempTime[2]) + Months[TempTime[1] - 2]) : (parseInt(TempTime[2]) + Months[TempTime[1] - 2]).toString();
            TempTime[1] = (parseInt(TempTime[1]) - 1).toString();
        }
        if (parseInt(TempTime[1]) < 0) {
            TempTime[1] = parseInt(TempTime[1]) + 12 < 10 ? "0" + (parseInt(TempTime[1]) + 12) : (parseInt(TempTime[1]) + 12).toString();
            TempTime[0] = (parseInt(TempTime[0]) - 1).toString();
        }
        TempTime = TimeAdjust(TempTime);
        SetCumulativeTime(LineId, TempTime, 0, y + 3);
    }
}
/* Function that check mistakes of wrongly chosen dates */
function TimeConsistency(FirstTime, SecondTime) {
    var TempFirstTime = "";
    var TempSecondTime = "";
    for (x = 0; x < 5; x++) {
        TempFirstTime += FirstTime[x];
        TempSecondTime += SecondTime[x];
    }
    if (parseInt(TempFirstTime) > parseInt(TempSecondTime)) {
        return "No";
    }
    if (parseInt(TempSecondTime) - parseInt(TempFirstTime) > 20000) {
        return "Zero";
    }
}
/* A small function that verify if every dates numbers in the arrays are in the right format */
function TimeAdjust(Time) {
    for (z = 0; z < Time.length; z++) {
        Time[z] = parseInt(Time[z]) < 10 ? "0" + parseInt(Time[z]) : Time[z].toString();
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