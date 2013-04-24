(function($, w){
    
    var B = (function($, w){
        
        function B(breakpoints) {
            this.breakpoints = breakpoints.sort(function(a, b) {
                return a - b;
            });
            this.current = null;
        };
        
        B.prototype.getBoundariesForWidth = function(width) {
            var last = 0;
            for (var i = 0; i < this.breakpoints.length; i++) {
                if (last < width && width < this.breakpoints[i]) {
                    return {
                        start: last,
                        end: this.breakpoints[i]
                    }
                }
                last = this.breakpoints[i];
            }
            if (width > this.breakpoints[this.breakpoints.length - 1]) {
                return {
                    start: this.breakpoints[this.breakpoints.length - 1],
                    end: Number.POSITIVE_INFINITY
                };
            }
            return {
                start: 0,
                end: this.breakpoints[0]
            };
        };
        
        B.prototype.getCurrent = function() {
            return this.current;
        };
        
        B.prototype.setCurrentFromWidth = function(width){
            this.current = this.getBoundariesForWidth(width);
            return this;
        };
        
        return B;
        
    })();
    
    $.fn.breakpoints = function(breakpoints) {
        $.fn._breakpoint = new B(breakpoints);
        $(w).resize(function(){
            var width = $(w).width();
            var bp = $.fn._breakpoint;
            var curr = bp.getCurrent();
            var nextSeg = bp.getBoundariesForWidth(width);
            if (curr != null && (curr.start == nextSeg.start && curr.end == nextSeg.end)) {
                return;
            }
            if (curr != null) {
                $(w).trigger('breakpoint-leave', [curr]);
            }
            $(w).trigger('breakpoint-enter', [nextSeg]);
            bp.setCurrentFromWidth(width);
        }).resize();
        return this;
    };
    
})(jQuery, window);