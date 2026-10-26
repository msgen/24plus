var _24Plus = _24Plus || {};
_24Plus.Admin = _24Plus.Admin || {};

_24Plus.Admin.Image = (function ($) {

    function buildAddImageDialog(sender) {
        var type = $(sender).data("entity-type");

        $.ajax({
            type: "GET",
            url: "/get-add-image-dialog",
            success: function (data) {
                bootbox.dialog({
                    title: 'Formular adaugare imagine',
                    message: data,
                    onEscape: true,
                    backdrop: true,
                    buttons: {
                        save: {
                            label: 'Salvati',
                            className: 'btn-primary',
                            callback: function () {
                                postAdd($("select#selectClients").val(), $("input#clientImage")[0].files[0], type);
                            }
                        }
                    }
                });
            },
            error: function (data) {
                bootbox.alert(data.statusText + ":" + data.responseText);
            }
        });
    }

    function changeImage(sender) {
        // Get a reference to the fileList
        var files = !!sender.files ? sender.files : [];

        // If no files were selected, or no FileReader support, return
        if (!files.length || !window.FileReader) return;

        // Only proceed if the selected file is an image
        if (/^image/.test(files[0].type)) {

            // Create a new instance of the FileReader
            var reader = new FileReader();

            // Read the local file as a DataURL
            reader.readAsDataURL(files[0]);

            var $sender = $(sender);

            // When loaded, set image data
            reader.onloadend = function (e) {
                var target = e.target || e.srcElement;
                var targetEl = $sender.data("target");
                if ($sender.data("type") === "background") {
                    $(targetEl).css("background-image", "url(" + target.result + ")");
                } else {
                    $($sender.data("target")).attr("src", target.result);
                }
            }
        }
    }

    /**
     * postdata for changing image
     * @param {*} sender 
     * @param {*} url 
     */
    function postChange(sender, url) {
        var formData = new FormData();
        var $sender = $(sender);

        // Get a reference to the fileList
        var files = !!sender.files ? sender.files : [];

        // If no files were selected
        if (!files.length) return;

        // Only proceed if the selected file is an image
        if (/^image/.test(files[0].type)) {
            formData.append("pk", $sender.data("pk"));
            formData.append("image", files[0]);
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                processData: false,
                contentType: false,
                success: function () {
                    changeImage(sender);
                },
                error: function (data) {
                    bootbox.alert(data.statusText + ":" + data.responseText);
                }
            });
        }
    }

    /**
     * post data for adding image
     * @param {*} clientId 
     * @param {*} file 
     * @param {*} type 
     */
    function postAdd(clientId, file, type) {
        var formData = new FormData();

        // If no files were selected
        if (!file) return;

        // Only proceed if the selected file is an image
        if (/^image/.test(file.type)) {
            formData.append("clientId", clientId);
            formData.append("type", type);
            formData.append("image", file);
            $.ajax({
                type: "POST",
                url: '/add-image',
                data: formData,
                processData: false,
                contentType: false,
                success: function() {
                    window.location.reload();
                },
                error: function (data) {
                    bootbox.alert(data.statusText + ":" + data.responseText);
                }
            });
        }
    }
    /**
     * post delete
     * @param {*} sender 
     * @param {*} url 
     */
    function postDelete(sender, url) {
        var $sender = $(sender);
        var formData = new FormData();
        formData.append("id", $sender.data("pk"));

        var request = $.ajax({
            url: url,
            method: "POST",
            data: { id: $sender.data("pk") }
        });

        request.done(function () {
            bootbox.alert("Imaginea a fost stearsa din baza de date!");
        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            bootbox.alert("Eroare la stergere: " + errorThrown);
        });
    }

    /**
     * post promote
     * @param {*} sender 
     * @param {*} url 
     */
    function postPromote(sender, url) {
        var $sender = $(sender);
        var formData = new FormData();
        formData.append("id", $sender.data("pk"));

        var request = $.ajax({
            url: url,
            method: "POST",
            data: { id: $sender.data("pk") }
        });

        request.done(function () {
            $sender.parent().toggleClass("promoted")
            bootbox.alert("Statusul imaginii a fost schimbat!");
        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            bootbox.alert("Eroare: " + errorThrown);
        });
    }

    function bindUi() {
        var $body = $("body");

        $body.on("click", ".img-editable span", function (event) {
            var $inputFile = $("#" + $(this).parent().data("input-id"));
            $inputFile.click();
            event.stopPropagation();
        });

        $body.on("change", ".img-editable.change-image input[type=file]", function (event) {
            postChange(this, '/change-image');
            event.stopPropagation();
        });

        $body.on("click", ".img-editable.add-image span", function (event) {
            buildAddImageDialog(this);
            event.stopPropagation();
        });

        $body.on("click", ".img-delete i", function () {
            var that = this;
            bootbox.confirm({
                message: "Doriti sa stergeti elementul?",
                title: "Stergeti?",
                buttons: {
                    confirm: {
                        label: 'Da',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'Nu',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result) {
                        postDelete(that, '/delete-image');
                    }
                }
            });
        });

        $body.on("click", ".img-promote i", function () {
            var that = this;
            bootbox.confirm({
                message: "Doriti sa modificati statusul imaginii de pe prima pagina?",
                title: "Promovati/Nepromovati?",
                buttons: {
                    confirm: {
                        label: 'Da',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'Nu',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result) {
                        postPromote(that, '/promote-image');
                    }
                }
            });
        });
    }

    // initialize the UI binders
    function init() {
        try {
            bindUi();
        } catch (ex) {
            console.log(ex);
        }
    }

    return {
        Init: init
    }

})($)