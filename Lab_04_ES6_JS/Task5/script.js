$(document).ready(function () {

    let fontSize = 16;

    // Increase Font Size
    $("#increaseFont").click(function () {
        fontSize += 2;

        $("#editableText")
            .css("font-size", fontSize + "px")
            .css("transition", "0.3s");
    });

    // Decrease Font Size
    $("#decreaseFont").click(function () {
        fontSize -= 2;

        $("#editableText")
            .css("font-size", fontSize + "px")
            .css("transition", "0.3s");
    });

    // Change Text Color (Chaining)
    $("#changeColor").click(function () {

        $("#editableText")
            .css("color", "#ff0066")
            .css("border", "2px solid #ff0066")
            .css("box-shadow", "0 0 10px #ff0066");
    });

    // Change Background (Chaining)
    $("#changeBg").click(function () {

        $("#editableText")
            .css("background", "#ffe6f2")
            .css("color", "#333");
    });

    // Toggle Bold
    $("#toggleBold").click(function () {
        $("#editableText").toggleClass("bold");
    });

    // Toggle Italic
    $("#toggleItalic").click(function () {
        $("#editableText").toggleClass("italic");
    });

});