// Closes the sidebar menu
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});
// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});
// Scrolls to the selected menu item on the page
$(function() {
    $('a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});
//#to-top button appears after scrolling
var fixed = false;
$(document).scroll(function() {
    if ($(this).scrollTop() > 250) {
        if (!fixed) {
            fixed = true;
            // $('#to-top').css({position:'fixed', display:'block'});
            $('#to-top').show("slow", function() {
                $('#to-top').css({
                    position: 'fixed',
                    display: 'block'
                });
            });
        }
    } else {
        if (fixed) {
            fixed = false;
            $('#to-top').hide("slow", function() {
                $('#to-top').css({
                    display: 'none'
                });
            });
        }
    }
});
// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function(event) {
    var that = $(this);
    that.on('click', onMapClickHandler);
    that.off('mouseleave', onMapMouseleaveHandler);
    that.find('iframe').css("pointer-events", "none");
}
var onMapClickHandler = function(event) {
    var that = $(this);
    // Disable the click handler until the user leaves the map area
    that.off('click', onMapClickHandler);
    // Enable scrolling zoom
    that.find('iframe').css("pointer-events", "auto");
    // Handle the mouse leave event
    that.on('mouseleave', onMapMouseleaveHandler);
}
// Enable map zooming with mouse scroll when the user clicks the map
$('.map').on('click', onMapClickHandler);

$('.slider').each(function() { // For every slider
    var $this = $(this); // Current slider
    var $group = $this.find('.slide-group'); // Get the slide-group (container)
    var $slides = $this.find('.slide'); // Create jQuery object to hold all slides
    var buttonArray = []; // Create array to hold navigation buttons
    var currentIndex = 0; // Hold index number of the current slide
    var timeout; // Sets gap between auto-sliding

    function move(newIndex) { // Creates the slide from old to new one
        var animateLeft, slideLeft; // Declare variables

        advance(); // When slide moves, call advance() again

        // If it is the current slide / animating do nothing
        if ($group.is(':animated') || currentIndex === newIndex) {
            return;
        }

        buttonArray[currentIndex].removeClass('active'); // Remove class from item
        buttonArray[newIndex].addClass('active'); // Add class to new item

        if (newIndex > currentIndex) { // If new item > current
            slideLeft = '100%'; // Sit the new slide to the right
            animateLeft = '-100%'; // Animate the current group to the left
        } else { // Otherwise
            slideLeft = '-100%'; // Sit the new slide to the left
            animateLeft = '100%'; // Animate the current group to the right
        }
        // Position new slide to left (if less) or right (if more) of current
        $slides.eq(newIndex).css({
            left: slideLeft,
            display: 'block'
        });

        $group.animate({
            left: animateLeft
        }, function() { // Animate slides and
            $slides.eq(currentIndex).css({
                display: 'none'
            }); // Hide previous slide
            $slides.eq(newIndex).css({
                left: 0
            }); // Set position of the new item
            $group.css({
                left: 0
            }); // Set position of group of slides
            currentIndex = newIndex; // Set currentIndex to the new image
        });
    }

    function advance() { // Used to set
        clearTimeout(timeout); // Clear previous timeout
        timeout = setTimeout(function() { // Set new timer
            if (currentIndex < ($slides.length - 1)) { // If slide < total slides
                move(currentIndex + 1); // Move to next slide
            } else { // Otherwise
                move(0); // Move to the first slide
            }
        }, 4000); // Milliseconds timer will wait
    }

    $.each($slides, function(index) {
        // Create a button element for the button
        var $button = $('<button type="button" class="slide-btn">&bull;</button>');
        if (index === currentIndex) { // If index is the current item
            $button.addClass('active'); // Add the active class
        }
        $button.on('click', function() { // Create event handler for the button
            move(index); // It calls the move() function
        }).appendTo('.slide-buttons'); // Add to the buttons holder
        buttonArray.push($button); // Add it to the button array
    });

    advance(); // Script is set up, advance() to move it


});
