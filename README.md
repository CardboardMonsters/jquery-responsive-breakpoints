jquery-responsive-breakpoints
=============================

Provides JQuery events for responsive breakpoints

## Usage
    
    $(window).on('breakpoint-enter', function(e, bounds) {
        alert("Entered " + bounds.start + " - " + bounds.end);
    }).on('breakpoint-leave', function(e, bounds) {
        alert("Left " + bounds.start + " - " + bounds.end);
    });
    
    $(window).breakpoints([480, 768, 980, 1200]);
    