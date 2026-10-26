// Global modal windows module
var _24Plus = _24Plus || {};

_24Plus.Utilities = (function () {

    function startWaitingIndicator(caller) {
        var $btn = caller;

        if ($btn && $btn.data("loading-text")) {
            $btn.attr("disabled", "disabled");
            $btn.button("loading");
        }
    }

    function stopWaitingIndicator(caller) {
        var $btn = caller;

        if ($btn && $btn.data("loading-text")) {
            $btn.removeAttr("disabled");
            $btn.button("reset");
        }
    }

    /// <summary>
    /// global string prototypes.
    /// </summary>
    /// <returns></returns>
    function stringUtils() {
        // ReSharper disable NativeTypePrototypeExtending
        String.prototype.capitalizeFirst = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, "");
        };
        String.prototype.endsWith = function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    };

    function init() {
        try {
            stringUtils();
        } catch (ex) {
            console.log(ex);
        }
    }

    return {
        Init: function () { init(); },
        StartWaitingIndicator: startWaitingIndicator,
        StopWaitingIndicator: stopWaitingIndicator
    };
}($));