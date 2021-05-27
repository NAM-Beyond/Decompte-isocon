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
        NewTimeInput.setAttribute("onblur", "SetCumulativeTime('" + TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1) + "', document.getElementById('" + TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1) + "').childNodes[1].childNodes[0].value)");
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
    NewButton.innerHTML = "+";
    document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].appendChild(NewButton);
}
/* Function that sets the already cumulative time considering the beginning set by the user */
function SetCumulativeTime(LineId, StartTime, SecondTime = 0) {
    if (typeof StartTime === "string") {
        var FirstTime = StartTime.split(/[-:T]/).map(Number);
    }
    else {
        var FirstTime = StartTime;
    }
    if (SecondTime == 0) {
        var RightNow = new Date();
        SecondTime = new Array(6);
        SecondTime[0] = RightNow.getFullYear();
        SecondTime[1] = RightNow.getMonth() + 1;
        SecondTime[2] = RightNow.getDate();
        SecondTime[3] = RightNow.getHours();
        SecondTime[4] = RightNow.getMinutes();
        SecondTime[5] = RightNow.getSeconds();
    }
    if (FirstTime.length == 1) {
        alert("Erreur : pas de date définie");
        return;
    }
    if ((SecondTime[0] < FirstTime[0]) || (SecondTime[1] < FirstTime[1] && SecondTime[0] <= FirstTime[0]) || (SecondTime[2] < FirstTime[2] && SecondTime[1] <= FirstTime[1] && SecondTime[0] <= FirstTime[0]) || (SecondTime[3] < FirstTime[3] && SecondTime[2] <= FirstTime[2] && SecondTime[1] <= FirstTime[1] && SecondTime[0] <= FirstTime[0]) || (SecondTime[4] < FirstTime[4] && SecondTime[3] <= FirstTime[3] && SecondTime[2] <= FirstTime[2] && SecondTime[1] <= FirstTime[1] && SecondTime[0] <= FirstTime[0])) {
        alert("Date désignée dans le futur Marty ! Choisis-en une autre.");
        return;
    }
    NewMinutes = SecondTime[4] - FirstTime[4];
    NewHours = SecondTime[3] - FirstTime[3];
    NewDay = SecondTime[2] - FirstTime[2];
    NewMonth = SecondTime[1] - FirstTime[1];
    NewYear = SecondTime[0] - FirstTime[0];
    if (NewMinutes < 0) {
        NewMinutes += 60;
        NewHours -= 1;
    }
    if (NewHours < 0) {
        NewHours += 24;
        NewDay -= 1;
    }
    if (NewDay < 0) {
        NewDay += Months[FirstTime[1] - 1];
        NewMonth -= 1;
    }
    if (NewMonth < 0) {
        NewMonth += 12;
        NewYear -= 1;
    }
    NewHours = NewHours + NewDay * 24 + NewMonth * 30 * 24 + NewYear * 365 * 24;
    document.getElementById(LineId).childNodes[3].innerText = NewHours + " heures " + NewMinutes + " minutes";
    if (SecondTime[5] != undefined) {
        NewMinutes -= 1;
        document.getElementById(LineId).childNodes[1].childNodes[0].setAttribute("onblur", "SetPause('" + LineId + "', [" + FirstTime + "])");
        document.getElementById(LineId).childNodes[2].style.backgroundColor = "#00FF00";
        document.getElementById(LineId).childNodes[2].innerText = "En cours";
        StartCount(LineId, NewHours, NewMinutes);
    }
    else {
        document.getElementById(LineId).childNodes[1].childNodes[0].setAttribute("onblur", "Restart('" + LineId + "')");
    }
}
/* Function that ensure the counting */
function StartCount(LineId, NewHours, NewMinutes) {
    NewMinutes += 1;
    if (NewMinutes == 60) {
        NewMinutes = 00;
        NewHours += 1; 
    }
    document.getElementById(LineId).childNodes[3].innerText = NewHours + " heures " + NewMinutes + " minutes";
    window[LineId] = setTimeout(function() {
        StartCount(LineId, NewHours, NewMinutes);
    }, 60000);
}
/* Function that ensure the pause of the counting and set a restart option */
function SetPause(LineId, StartTime) {
    clearTimeout(window[LineId]);
    PauseTime = document.getElementById(LineId).childNodes[1].childNodes[0].value.split(/[-:T]/).map(Number);
    document.getElementById(LineId).childNodes[2].style.backgroundColor = "#FFFF00";
    document.getElementById(LineId).childNodes[2].innerText = "En pause";
    SetCumulativeTime(LineId, StartTime, PauseTime);
}
/* Function that handles the restart an set again a pause option */
function Restart(LineId) {
    NewHours = parseInt(document.getElementById(LineId).childNodes[3].innerText.match(/\d+/g)[0]);
    NewMinutes = parseInt(document.getElementById(LineId).childNodes[3].innerText.match(/\d+/g)[1]);
    RestartTime = document.getElementById(LineId).childNodes[1].childNodes[0].value.split(/[-:T]/).map(Number);
    RestartTime[4] = RestartTime[4] - NewMinutes;
    if (RestartTime[4] < 0) {
        RestartTime[4] += 60;
        RestartTime[3] -= 1;
    }
    RestartTime[3] = RestartTime[3] - NewHours;
    if (RestartTime[3] < 0) {
        RestartTime[3] += 24;
        RestartTime[2] -= 1;
        if (RestartTime[2] < 0) {
            if (RestartTime[1] == 1) {
                RestartTime[1] = 13;
            }
            RestartTime[2] += Months[RestartTime[1] - 2];
            RestartTime[1] -= 1;
        }
        if (RestartTime[1] < 0) {
            RestartTime[1] += 12;
            RestartTime[0] -= 1;
        }
    }
    SetCumulativeTime(LineId, RestartTime);
}