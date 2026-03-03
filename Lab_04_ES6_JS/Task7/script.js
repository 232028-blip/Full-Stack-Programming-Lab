$(document).ready(function () {

    // Enable sortable (Drag & Drop)
    $("#sortableList").sortable({

        start: function (event, ui) {
            // Highlight dragged item (CSS Manipulation)
            ui.item.addClass("dragging");
        },

        stop: function (event, ui) {
            // Remove highlight
            ui.item.removeClass("dragging");

            // Update order dynamically (DOM Manipulation)
            updateOrder();
        }
    });

    // Function to update order display
    function updateOrder() {
        let items = [];

        $("#sortableList li").each(function () {
            items.push($(this).text());
        });

        $("#currentOrder")
            .hide()
            .text(items.join(" | "))
            .fadeIn(300);
    }

    // Initialize order on load
    updateOrder();

});