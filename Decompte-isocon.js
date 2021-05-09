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
    NewField.setAttribute("onblur", "AddNewButton('" + TableId + "', 0)");
}
/* Function of the keyboard event listener, an input is add only if the user press enter and then add a new name and a new line*/
function AddNewName(event, TableId) {
    y = event.which || event.keyCode;
    if (y == 13) {
        document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].childNodes[0].removeAttribute("onblur");
        NewName = document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].childNodes[0].value;
        document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].innerHTML = "";
        document.getElementById(TableId + (document.getElementById(TableId).childNodes[0].childNodes.length - 1)).childNodes[0].innerText = NewName;
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