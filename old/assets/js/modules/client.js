var _24Plus = _24Plus || {};
_24Plus.Admin = _24Plus.Admin || {};

_24Plus.Admin.Client = (function ($) {

    function buildAddClientDialog(sender) {

        $.ajax({
            type: "GET",
            url: "/get-add-client-dialog",
            success: function (data) {
                bootbox.dialog({
                    title: 'Formular adaugare client',
                    message: data,
                    onEscape: true,
                    backdrop: true,
                    buttons: {
                        save: {
                            label: 'Salvati',
                            className: 'btn-primary',
                            callback: function () {
                                postAdd($("input#name").val(), $("input#url").val(), $("input#image")[0].files[0]);
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
    
    /**
     * post data for adding image
     * @param {*} clientId 
     * @param {*} file 
     * @param {*} type 
     */
    function postAdd(name, url, file, type) {
        var formData = new FormData();

        // If no files were selected
        if (!file) return;

        // Only proceed if the selected file is an image
        if (/^image/.test(file.type)) {
            formData.append("name", name);
            formData.append("image", file);
            formData.append("url", url);
            $.ajax({
                type: "POST",
                url: '/add-client',
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
            bootbox.alert("Clientul a fost sters din baza de date!");
            window.location.reload();
        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            bootbox.alert("Eroare la stergere: " + errorThrown);
        });
    }

    function bindUi() {
        var $body = $("body");

        $body.on("click", ".img-editable.add-client span", function (event) {
            buildAddClientDialog(this);
            event.stopPropagation();
        });

        $body.on("click", ".client-delete i", function () {
            var that = this;
            bootbox.confirm({
                message: "Doriti sa stergeti clientul si portofoliul atasat acestuia?",
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
                        postDelete(that, '/delete-client');
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