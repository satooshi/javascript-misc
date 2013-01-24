(function(window) {
    var addEvent = function(target, type, listener) {
        var _type, _listener;

        if (target.addEventListener) {
            target.addEventListener(type, listener, false);

            return true;
        }

        if (target.attachEvent) {
            _listener =  function(event) {
                event.currentTarget = target;
                listener(event);
            };

            _type = 'on' + type;
            target.detachEvent(_type, _listener);
            target.attachEvent(_type, _listener);

            return true;
        }

        return false;
    };

    var cancelEvent = function(event) {
        if (event.preventDefault) {
            event.preventDefault(); // IE9+, FF, opera, chrome, safari
            event.stopPropagation(); // IE9+, FF, opera, chrome, safari
        } else {
            event.returnValue = false; // chrome, opera, safari
            event.cancelBubble = true; // IE, chrome, opera, safari
        }
    };

    var disableImplicitSubmit = function(elements) {
        for (var i = 0, length = elements.length; i < length; i++) {
            addEvent(elements[i], 'keypress', function(e) {
                if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                    cancelEvent(e);

                    return false;
                }
            });
        }
    };

    addEvent(window, 'load', function(e) {
        var inputs = document.getElementsByTagName('input');
        disableImplicitSubmit(inputs);
    });
}(window));
