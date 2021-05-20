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
        NewTimeInput.setAttribute("onblur", "SetStart('" + TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1) + "', document.getElementById('" + TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1) + "').childNodes[1].childNodes[0].value)");
        document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[1].appendChild(NewTimeInput);
        NewLine = document.createElement("tr");
        NewLine.id = TableId + (document.getElementById(TableId).childNodes[0].childNodes.length);
        document.getElementById(TableId).childNodes[0].appendChild(NewLine);
        for (x = 0; x < 4; x++) {
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
/* Function that sets the already cumulated time considering the beginning set by the user */
function SetStart(LineId, Time) {
    var NewTime = Time.split(/[-:T]/).map(Number);
    var Today = new Date();
    if (Today.getMinutes() < NewTime[4]) {
        NewTime[4] = NewTime[4] - 60;
        NewTime[3] += 1;
    }
    if (Today.getHours() < NewTime[3]) {
        NewTime[3] = NewTime[3] - 24;
        NewTime[2] += 1;
    }
    if (Today.getDate() < NewTime[2]) {
        NewTime[2] = NewTime[2] - Months[NewTime[2] - 1];
        NewTime[1] += 1;
    }
    if (Today.getMonth() + 1 < NewTime[1]) {
        NewTime[1] = NewTime[1] - 12;
        NewTime[0] += 1;
    }
    if (Today.getFullYear() < NewTime[0]) {
        NewTime[0] = NewTime[1] - 100;
    }
    NewMinutes = Today.getMinutes() - NewTime[4];
    NewHours = Today.getHours() - NewTime[3];
    NewDay = Today.getDate() - NewTime[2];
    NewMonth = Today.getMonth() +1 - NewTime[1];
    NewYear = Today.getFullYear() - NewTime[0];
    NewHours = NewHours + NewDay * 24 + NewMonth * 30 * 24 + NewYear * 365 * 24;
    document.getElementById(LineId).childNodes[2].innerText = NewHours + " heures " + NewMinutes + " minutes";
    PauseButton = document.createElement("button");
    PauseButton.setAttribute("onclick", "SetPause('" + LineId + "')");
    PauseButton.innerHTML = "&#9208;";
    document.getElementById(LineId).childNodes[1].appendChild(PauseButton);
    NewMinutes -= 1;
    StartCount(LineId, NewHours, NewMinutes);
}
/* Function that ensure the counting */
function StartCount(LineId, NewHours, NewMinutes) {
    NewMinutes += 1;
    if (NewMinutes == 60) {
        NewMinutes = 00;
        NewHours += 1; 
    }
    document.getElementById(LineId).childNodes[2].innerText = NewHours + " heures " + NewMinutes + " minutes";
    window[LineId] = setTimeout(function() {
        StartCount(LineId, NewHours, NewMinutes);
    }, 100);
}
/* Function that ensure the pause of the counting and set a restart option */
function SetPause(LineId) {
    clearTimeout(window[LineId]);
    document.getElementById(LineId).childNodes[1].childNodes[1].innerHTML = "&#9654;";
    document.getElementById(LineId).childNodes[1].childNodes[1].setAttribute("onclick", "Restart('" + LineId + "')");
}
/* Function that handles the restart an set again a pause option */
function Restart(LineId) {
    document.getElementById(LineId).childNodes[1].childNodes[1].innerHTML = "&#9208;";
    document.getElementById(LineId).childNodes[1].childNodes[1].setAttribute("onclick", "SetPause('" + LineId + "')");
    NewHours = parseInt(document.getElementById(LineId).childNodes[2].innerText.match(/\d+/g)[0]);
    NewMinutes = parseInt(document.getElementById(LineId).childNodes[2].innerText.match(/\d+/g)[1]) - 1;
    StartCount(LineId, NewHours, NewMinutes);
}