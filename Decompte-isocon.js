var Months = [31,28,31,30,31,30,31,31,30,31,30,31];
if (new Date().getFullYear() % 4 == 0) {
    Months[1] = 29;
}
var NamesList = [];
var FirstColumnList = [];
var SecondColumnList = [];
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
    document.getElementById(LineId).style.color = ButtonFontColor;
    document.getElementById(LineId).style.backgroundColor = ButtonBackgroundColor;
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
    NewButton.id = "button" + TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1);
    NewButton.setAttribute("onmouseover", "Light('button" + TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1) + "', '#FFFFFF', '#0099FF')");
    NewButton.setAttribute("onmouseout", "Light('button" + TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1) + "', '#000000', '#FFFF96')");
    NewButton.innerText = "+";
    document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].appendChild(NewButton);
}
/* Function that sets the already cumulative time considering the beginning set by the user */
function SetCumulativeTime(LineId, StartTime = 0, EventTime = 0, PreviousTime = 0) {
    if (StartTime == 0) {
        alert("Erreur : pas de date d??finie");
        return;
    }
    StartTime = TimeAdjust(StartTime);
    if (EventTime == 0) {
        EventTime = TimeAdjust(TimeNow());
        if (TimeConsistency(StartTime, EventTime) == "Negative") {
            alert("Date de d??but / reprise d??sign??e dans le futur Marty ! Choisis-en une autre.");
            return;
        }
        if (PreviousTime != 0) {
            PreviousTime = TimeAdjust(PreviousTime);
            if (TimeConsistency(PreviousTime, StartTime) == "Negative") {
                alert("Date de reprise d??sign??e avant la pr??c??dente date de pause Docteur Who ! Choisissez une autre date.");
                return;
            }
            if (TimeConsistency(PreviousTime, StartTime) == "Equal") {
                alert("Tu viens de d??finir la m??me date deux fois. Choisis ?? nouveau.");
                return;
            }
        }
    }
    else {
        EventTime = TimeAdjust(EventTime);
        if (TimeConsistency(StartTime, EventTime) == "Negative") {
            alert("Date de pause d??sign??e avant la date de d??part Docteur Who ! Choisissez une autre date.");
            return;
        }
        if (TimeConsistency(EventTime, TimeAdjust(TimeNow())) == "Negative") {
            alert("Date de pause d??sign??e dans le futur Marty ! Choisis-en une autre.");
            return;
        }
        if (TimeConsistency(StartTime, EventTime) == "Equal") {
            alert("Tu viens de d??finir la m??me date deux fois. Choisis ?? nouveau.");
            return;
        }
        clearTimeout(window[LineId]);
    }
    var Ranks = [-1, -1, -1]
    for (t = 0; t < NamesList.length; t++) {
        if (NamesList[t][0] == LineId) {
            Ranks[0] = t;
        }
    }
    for (s = 0; s < FirstColumnList.length; s++) {
        if (FirstColumnList[s][0] == LineId) {
            Ranks[1] = s;
        }
    }
    for (r = 0; r < SecondColumnList.length; r++) {
        if (SecondColumnList[r][0] == LineId) {
            Ranks[2] = r;
        }
    }
    if (Ranks[0] == -1) {
        NamesList.push([LineId, document.getElementById(LineId).childNodes[0].innerText]);
        FirstColumnList.push([LineId, [1, StartTime]]);
        SecondColumnList.push([LineId, [1, StartTime]]);
        Ranks = [NamesList.length - 1, FirstColumnList.length - 1, SecondColumnList.length - 1];
    }
    else {
        FirstColumnList[Ranks[1]].push(EventTime[5] != undefined ? [1, StartTime] : [2, EventTime]);
        SecondColumnList[Ranks[2]].push(EventTime[5] != undefined ? [1, StartTime] : [2, EventTime]);
    }
    if (FirstColumnList[Ranks[1]][FirstColumnList[Ranks[1]].length - 1][0] == 1) {
        if (typeof(FirstColumnList[Ranks[1]][FirstColumnList[Ranks[1]].length - 2]) != "string" && TimeConsistency(FirstColumnList[Ranks[1]][FirstColumnList[Ranks[1]].length - 2][1], FirstColumnList[Ranks[1]][FirstColumnList[Ranks[1]].length - 1][1]) == "Forty-eight") {
            FirstColumnList[Ranks[1]].splice(1, FirstColumnList[Ranks[1]].length - 2);
        }
    }
    while (TimeConsistency(SecondColumnList[Ranks[2]][1][1], TimeAdjust(TimeNow())) == "Fifteen") {
        SecondColumnList[Ranks[2]].splice(1,1);
    }
    var CumulatedTime = new Array(2);
    CumulatedTime[0] = TimeCumulated(FirstColumnList, Ranks[1], EventTime[5] != undefined ? EventTime : 0);
    CumulatedTime[1] = TimeCumulated(SecondColumnList, Ranks[2], EventTime[5] != undefined ? EventTime : 0);
    for (s = 0; s < 2; s++) {
        document.getElementById(LineId).childNodes[s + 3].innerText = CumulatedTime[s][3] + " heures " + CumulatedTime[s][4] + " minutes";
    }
    if (EventTime[5] != undefined) {
        document.getElementById(LineId).childNodes[1].childNodes[0].setAttribute("onblur", "SetCumulativeTime('" + LineId + "', [" + StartTime + "], document.getElementById('" + LineId + "').childNodes[1].childNodes[0].value.split(/[-:T]/))");
        document.getElementById(LineId).style.backgroundColor = "#00FF00";
        document.getElementById(LineId).childNodes[2].innerText = "En cours";
        StartCount(LineId, CumulatedTime);
    }
    else {
        for (r = 0; r < 2; r++) {
            if ((((CumulatedTime[r][3] == 24 && CumulatedTime[r][4] > 0) || CumulatedTime[r][3] > 24) && LineId.charAt(1) == "2") || (((CumulatedTime[r][3] == 48 && CumulatedTime[r][4] > 0) || CumulatedTime[r][3] > 48) && LineId.charAt(1) == "1")) {
                document.getElementById(LineId).style.backgroundColor = "#FF0000";
            }
            else {
                document.getElementById(LineId).style.backgroundColor = "#FFFF00";
            }
        }
        document.getElementById(LineId).childNodes[2].innerText = "En pause";
        document.getElementById(LineId).childNodes[1].childNodes[0].setAttribute("onblur", "SetCumulativeTime('" + LineId + "', document.getElementById('" + LineId + "').childNodes[1].childNodes[0].value.split(/[-:T]/), 0, [" + EventTime + "])");
    }
}
/* A function that calculates the cumulative time by browsing the appropriate array */
function TimeCumulated (TimeList, Rank, EventTime = 0) {
    var AddedTime = new Array(5).fill(0);
    var TempTimeList = EventTime != 0 ? [...TimeList[Rank], [2, EventTime]] : TimeList[Rank];
    for (q = 1; q < TempTimeList.length; q += 2) {
        for (p = 0; p < 5; p++) {
            AddedTime[p] += parseInt(TempTimeList[q + 1][1][p]) - parseInt(TempTimeList[q][1][p]);
        }
    }
    AddedTime = TimeAdjust(AddedTime, parseInt(TempTimeList[TempTimeList.length - 2][1][1]));
    AddedTime[3] = (parseInt(AddedTime[3]) + parseInt(AddedTime[2]) * 24 + parseInt(AddedTime[1]) * 30 * 24 + parseInt(AddedTime[0]) * 365 * 24).toString();
    AddedTime[3] = parseInt(AddedTime[3]) < 10 ? "0" + parseInt(AddedTime[3]) : parseInt(AddedTime[3]).toString();
    for (o = 0; o < 3; o++) {
        AddedTime[o] = "00";
    }
    return AddedTime;
}
/* Function that ensure the counting */
function StartCount(LineId, CumulatedTime) {
    for (n = 0; n < 2; n++) {
        if (parseInt(CumulatedTime[n][4]) == 60) {
            CumulatedTime[n][4] = 0;
            CumulatedTime[n][3] = parseInt(CumulatedTime[n][3]) + 1;
        }
        if ((((parseInt(CumulatedTime[n][3]) == 24 && parseInt(CumulatedTime[n][4]) > 0) || parseInt(CumulatedTime[n][3]) > 24) && LineId.charAt(1) == "2") || (((parseInt(CumulatedTime[n][3]) == 48 && parseInt(CumulatedTime[n][4]) > 0) || parseInt(CumulatedTime[n][3]) > 48) && LineId.charAt(1) == "1")) {
            document.getElementById(LineId).style.backgroundColor = "#FF0000";
        }
        document.getElementById(LineId).childNodes[n + 3].innerText = (parseInt(CumulatedTime[n][3]) < 10 ? "0" + parseInt(CumulatedTime[n][3]) : parseInt(CumulatedTime[n][3])) + " heures " + (parseInt(CumulatedTime[n][4]) < 10 ? "0" + parseInt(CumulatedTime[n][4]) : parseInt(CumulatedTime[n][4])) + " minutes";
        CumulatedTime[n][4] = parseInt(CumulatedTime[n][4]) + 1;
    }
    window[LineId] = setTimeout(function() {
        StartCount(LineId, CumulatedTime);
    }, 60000);
}
/* Function that check mistakes of wrongly chosen dates */
function TimeConsistency(FirstTime, SecondTime) {
    var TempFirstTime = "";
    var TempSecondTime = "";
    for (m = 0; m < 5; m++) {
        TempFirstTime += FirstTime[m];
        TempSecondTime += SecondTime[m];
    }
    if (parseInt(TempSecondTime) == parseInt(TempFirstTime)) {
        return "Equal";
    }
    if (parseInt(TempFirstTime) > parseInt(TempSecondTime)) {
        return "Negative";
    }
    if (parseInt(TempSecondTime) - parseInt(TempFirstTime) > 150000) {
        return "Fifteen";
    }
    if (parseInt(TempSecondTime) - parseInt(TempFirstTime) > 20000) {
        return "Forty-eight";
    }
}
/* A function that checks if the different elements of the time arrays have correct values and in the right format */
function TimeAdjust(Time, MonthCorrection = 0) {
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
        if ((parseInt(Time[1]) == 0 || parseInt(Time[1]) == 1) && MonthCorrection == 0) {
            Time[1] = (13 + parseInt(Time[1]));
        }
        Time[2] = (parseInt(Time[2]) + (MonthCorrection == 0 ? Months[parseInt(Time[1]) - 2] : Months[parseInt(MonthCorrection) - 1])).toString();
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
    var RightNow = new Date;
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