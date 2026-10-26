var _24Plus = _24Plus || {};
_24Plus.Admin = _24Plus.Admin || {};

_24Plus.Admin.Start = (function () {
    function init() {
        _24Plus.Admin.EditableModel.Init();
        _24Plus.Admin.Image.Init();
        _24Plus.Admin.Client.Init();
    }

    return {
        Init: init
    }
})();

$(function () {
    _24Plus.Admin.Start.Init();
});

