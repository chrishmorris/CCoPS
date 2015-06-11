// Standard Javascript for all PLan pages

// progress reporting
function reportProgress(message) {
    if (document.getElementById("progress")) {
        document.getElementById("progress").innerHTML += '<li>' + message
                + '</li>';
    }
}
function clearProgress() {
	 if (document.getElementById("progress")) {
	        document.getElementById("progress").innerHTML ="";
	 }
}

// polyfills for String
String.prototype.endsWith = String.prototype.endsWith || function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
String.prototype.contains = String.prototype.contains || function(suffix) {
    return this.indexOf(suffix) !== -1;
};

// history management
if (document.getElementById('searchString')) {
    var input = document.getElementById('searchString');
    if (window.location.search) {
        input.value = window.location.search.substring(1);
        input.form.onsubmit(); // note that PLan.js must be loaded after js
        // needed
        // by this function
    }
    var oldOnChange = input.onchange || function() {
    };
    oldOnChange.prototype = oldOnChange.prototype || Function.prototype;
    boundOnChange = oldOnChange.bind(input);
    input.onchange = function() {
        var url = (window.location + '').split('?')[0] + "?" + this.value;
        try {
            history.replaceState({}, "", url);
        } catch (e) {
            // file:// url
            window.location = url;
            alert(window.location);
        }
        boundOnChange();
    }
    // TODO could also be a whole form
}

// event handling
function cancel(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    return false;
}
function getPoint(e) {
    if (!e) {
        var e = event;
    }
    if (!e) {
        alert('no event');
    }
    var coords = e;
    if (e.targetTouches) {
        coords = e.targetTouches[0];
    }
    var x = coords.pageX - canvas.offsetLeft;
    var y = coords.pageY - canvas.offsetTop;
    if (e.preventDefault) {
        e.preventDefault();
    }
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    return [ x, y ];
}

// Avoid `console` errors in browsers that lack a console.
{
    var _console = function() {
        var method;
        var noop = function() {
        };
        var methods = [ 'assert', 'clear', 'count', 'debug', 'dir', 'dirxml',
                'error', 'exception', 'group', 'groupCollapsed', 'groupEnd',
                'info', 'log', 'markTimeline', 'profile', 'profileEnd',
                'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn' ];
        var len = methods.length;
        var console = window.console = window.console || {};

        while (len--) {
            method = methods[len];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    };
    _console();
}

// TODO function save(element) {require(['download.js'], function()
// {doSave(element)})}:

// polyfill for details/summary
if ('open' in document.createElement('details')) {
    // OK
} else {
    document.body.classList.add('no-details');
    var list = document.getElementsByTagName('details');
    for ( var n = list.length, i = 0; i < n; i++) {
        var summaries = list[i].getElementsByTagName('summary');
        for ( var m = summaries.length, j = 0; j < m; j++) {
            summaries[j].onclick = function() {
                this.parentNode.classList.toggle('open');
            };
        }
    }
}
