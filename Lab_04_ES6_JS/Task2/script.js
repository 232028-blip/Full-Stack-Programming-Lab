$(document).ready(function () {

    let galleryData = [];
    let currentIndex = 0;

    // AJAX: Load images from local JSON file
    $.ajax({
        url: "gallery.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            galleryData = data;
            showImage(currentIndex);
        },
        error: function () {
            alert("Failed to load gallery data. Make sure you run using Live Server.");
        }
    });

    function showImage(index) {

        // Fade out image first
        $("#galleryImage").fadeOut(300, function () {

            // DOM Manipulation + Chaining
            $(this)
                .attr("src", galleryData[index].image)
                .fadeIn(500);
        });

        // Update caption with animation
        $(".caption")
            .hide()
            .text(galleryData[index].caption)
            .fadeIn(500);
    }

    // Next Button
    $("#nextBtn").click(function () {
        currentIndex = (currentIndex + 1) % galleryData.length;
        showImage(currentIndex);
    });

    // Previous Button
    $("#prevBtn").click(function () {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        showImage(currentIndex);
    });

});