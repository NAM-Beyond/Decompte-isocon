/* Function to enlight the button your mouse is over */
function Light(ButtonId, ButtonFontColor, ButtonBackgroundColor) {
    document.getElementById(ButtonId).style.color = ButtonFontColor;
    document.getElementById(ButtonId).style.backgroundColor = ButtonBackgroundColor;
}
/* Function that creates the input field after a button is clicked before adding it to the timeline */
function AddInputField(BoxId) {
    document.getElementById(BoxId).innerHTML = "";
    NewField = document.createElement("input");
    NewField.type = "text";
    NewField.id = "i" + BoxId;
    NewField.setAttribute("onkeypress", "KeyPressed(event, " + BoxId + ")");
    NewField.addEventListener("blur", function () {
        document.getElementById(BoxId).innerHTML = "";
        NewButton = document.createElement("button");
        NewButton.id = "b" + BoxId;
        NewButton.setAttribute("onclick", "AddInputField(" + BoxId + ")");
        NewButton.setAttribute("onmouseover", "Light('b" + BoxId + "', '#FFFFFF', '#0099FF')");
        NewButton.setAttribute("onmouseout", "Light('b" + BoxId + "', '#000000', '#FFFF96')");
        NewButton.innerHTML = "+";
        document.getElementById(BoxId).appendChild(NewButton);
    });
    document.getElementById(BoxId).appendChild(NewField);
}
/* Function of the keyboard event listener, an input is add only if the user press enter */
function KeyPressed(event, InputLocation, Name) {
    y = event.which || event.keyCode;
    if (y == 13) {
        NewItem = document.createElement("div");
        NewItem.innerHTML = document.getElementById("i" + InputLocation).value;
        document.getElementById(InputLocation).innerHTML = "";
        document.getElementById(InputLocation).appendChild(NewItem);
    }
}