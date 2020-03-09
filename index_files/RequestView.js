/* 
 Обект для работы с таблицей заявок
 первый выполняеться iinit по умолчанию автоматом
 класс юзаеться как статичный!!!
 */

/* global RequestSidebar, krajeeDialog */

class RequestView {
    hiddenClass = function () {
        return 'rtHide';
    }
    conf() {
        return {
            hideOffset: 2000,
            hiddenClass: 'rtHide'
        }
    }
//    PseudoTabListener = function () {
//        $(document).on('click', '.pseudoTab', function () {
//            $('.pseudoTab').removeClass('active-tab');
//            $(this).addClass('active-tab');
//            $('#DynamicWindow').showLoading();
//            $.pjax({
//                type: "GET",
//                url: $(this).data('tab_link'),
//                container: '#DynamicWindow',
//                push: false,
//                timeout: 10000,
//                scrollTo: false
//            }).always(function (jqXHR, textStatus, errorThrown) {
//                $('#DynamicWindow').hideLoading();
//
//            })
//        })
//    }
    startPage = function () {
        if ($('.pseudoTab').length > 1) {
            $('.pseudoTab')[0].click();
        }
    }
    createOperation = function () {
        $(document).on('beforeSubmit', '#CreateOperation', function () {
            $('#view-operation_grid').showLoading();
            var _this = this;
            var url = $(_this).data('pjax-url');
            $.ajax({
                data: $(_this).serialize(),
                type: "POST",
                url: $(_this).attr('action') + '&ajaxonly=true',
                push: false,
                scrollTo: false
            }).done(function (data) {
                $.notify({message: 'Изменения сохранены'}, {type: 'info'});
                $('#universal-modal').modal('hide');
                $.pjax({
                    type: "GET",
                    url: url,
                    container: '#view-operation_grid',
                    push: false,
                    timeout: 10000,
                    scrollTo: false
                }).always(function (jqXHR, textStatus, errorThrown) {
                })

            }).always(function (jqXHR, textStatus, errorThrown) {
                $('#view-operation_grid').hideLoading();
            })
            return false; // Cancel form submitting.
        });
    }
    CreateWork = function () {
        $(document).on('beforeSubmit', '#CreateWork', function () {
            $('#view-operation_grid').showLoading();
            var _this = this;
            var url = $(_this).data('pjax-url');
            $.ajax({
                data: $(_this).serialize(),
                type: "POST",
                url: $(_this).attr('action') + '&ajaxonly=true',
                push: false,
                scrollTo: false
            }).done(function (data) {
                $.notify({message: 'Изменения сохранены'}, {type: 'info'});
                $('#universal-modal').modal('hide');
                $.pjax({
                    type: "GET",
                    url: url,
                    container: '#view-operation_grid',
                    push: false,
                    timeout: 10000,
                    scrollTo: false
                }).always(function (jqXHR, textStatus, errorThrown) {
                })

            }).always(function (jqXHR, textStatus, errorThrown) {
                $('#view-operation_grid').hideLoading();
            })
            return false; // Cancel form submitting.
        });
    }
    // событие переключения таба
    CreateMessageTab = function () {

        $(document).on('click', "a[href='#messageTab']", function () {
            $('#messageTab .scrollTabContent').scrollTop(99999999)

        })
    }
    // отправка сообщения из просмотра заявки
    CreateMessage = function () {

        $(document).on('beforeSubmit', '#CreateMessageInView', function (e) {
            e.preventDefault();
            return;
            $('#messageTab').showLoading();
            var _this = this;
            var url = $(_this).data('pjax-url');

            $.ajax({
                data: $(_this).serialize(),
                type: "POST",
                url: $(_this).attr('action'),
                push: false,
                scrollTo: false
            }).done(function (data) {
                $.notify({message: 'Сообщение добавленно'}, {type: 'info'});
                $.pjax({
                    type: "GET",
                    url: url,
                    container: '#messageTab',
                    push: false,
                    timeout: 10000,
                    scrollTo: false
                }).always(function (jqXHR, textStatus, errorThrown) {
                    $('#messageTab .scrollTabContent').scrollTop(99999999)
                })

            }).always(function (jqXHR, textStatus, errorThrown) {

                $('#messageTab').hideLoading();
            })
            return false; // Cancel form submitting.
        });
    }
    // отправка сообщения из просмотра заявки
    spendingForm = function () {

        $(document).on('beforeSubmit', '#OperationSpending', function () {
            $('#spending').showLoading();
            var _this = this;
            var url = $(_this).data('pjax-url');


            $.ajax({
                data: $(_this).serialize(),
                type: "POST",
                url: $(_this).attr('action'),
                push: false,
                scrollTo: false
            }).done(function (data) {
                $.notify({message: 'Затрата добавленна'}, {type: 'info'});
                $.pjax.reload({url: url, container: '#spending', async: true, push: false, timeout: 10000, scrollTo: false});
                $('#universal-modal2').modal('hide');

            }).always(function (jqXHR, textStatus, errorThrown) {

                $('#spending').hideLoading();
            })
            return false; // Cancel form submitting.
        });
    }
    pjaxForm = function () {
        $(document).on('change', '.pjaxClass', function () {
            var form = $(this).parents('form:first');

            let url = form.attr('action') + (form.attr('action').indexOf('?') >= 0 ? '&' : '?') + 'check=1';
            if ($('#PjaxPage').length) {
                $('#PjaxPage').showLoading();
            }
            $.pjax({
                type: "POST",
                data: form.serializeArray(),
                url: url,
                container: '#PjaxPage',
                push: false,
                timeout: 10000,
                scrollTo: false
            }).always(function (jqXHR, textStatus, errorThrown) {
                if ($('#PjaxPage').length) {
                    $('#PjaxPage').hideLoading();
                }
            })

        })
    }
    modalObjectLink = function () {
        $(document).on('click', '.modalObjectLink', function () {
            $('#content').showLoading();
            $.pjax({
                type: "GET",
                url: $(this).data('sidebar-link') + '&isModal=1',
                container: '#pjaxModalUniversal',
                push: false,
                timeout: 10000,
                scrollTo: false
            }).always(function (jqXHR, textStatus, errorThrown) {

                $('#content').hideLoading();

            })

        })
    }
    deleteSpanding = function () {
        $(document).on('click', '.deleteSpanding', function (e) {
            e.preventDefault();
            let _this = this;
            let url = $(_this).data('pjax-url');
            krajeeDialog.confirm('Удалить элемент?', function (out) {
                if (out) {
                    $.post($(_this).attr('href'), [], function (ret) {
                    }).done(function () {
                        $.pjax.reload({url: url, container: '#spending', async: true, push: false, timeout: 10000, scrollTo: false});
                    })
                }
            })

        })
    }
    clearBeginRq = function () {
        $(document).on('click', '.clearBeginRq', function (e) {
            e.preventDefault()
            let    out = confirm('Поле будет очищено, продолжить?');
            if (out) {
                $.ajax({
                    type: "GET",
                    url: $(this).data('url'),
                    success: function () {
                        $('#requestexternal-timebeginreq').val('');
                    }
                })
            }
            ;
        })
    }
    addAttachToMessage = function () {
        $(document).on('click', '.add-attach-to-message', function (e) {
            e.preventDefault()
            return;
            let    out = confirm('Поле будет очищено, продолжить?');
            if (out) {
                $.ajax({
                    type: "GET",
                    url: $(this).data('url'),
                    success: function () {
                        $('#requestexternal-timebeginreq').val('');
                    }
                })
            }
            ;
        })
    }
    getPjax = function (url, data, container = "#pjaxModalUniversal") {
        let pjax = $.pjax({
            type: 'GET',
            url: url,
            data: data,
            container: container,
            push: false,
            timeout: 10000,
            scrollTo: false
        })
        return pjax;
    }
    postPjax = function (url, data, container = "#pjaxModalUniversal") {
        let pjax = $.pjax({
            type: 'POST',
            url: url,
            data: data,
            container: container,
            push: false,
            timeout: 10000,
            scrollTo: false
        })
        return pjax;
    }
    /**
     * История переключения статусов
     * @param {type} requestId
     * @returns {undefined}
     */
    getLogState = function (requestId) {
        let url = '/edit-log/view';
        let   data = {'requestId': requestId};
        this.getPjax(url, data);
    }
    /**
     * история переключения ответственных
     * @param {type} requestId
     * @returns {undefined}
     */
    getLogResponsible = function (requestId) {
        let url = '/edit-log/users';
        let   data = {'requestId': requestId};
        this.getPjax(url, data);

    }
    /**
     * Печатная форма
     * @param {type} requestId
     * @returns {undefined}
     */
    printForm = function (requestId) {
        alert('Не реализованно')

    }
    addInner = function (requestId) {
        alert('Не реализованно')

    }
    addOuter = function (requestId) {
        alert('Не реализованно')

    }
    edit = function (requestId) {
        alert('Не реализованно')

    }
    delete = function (requestId) {
        alert('Не реализованно')

    }
    new = function (requestId) {
        alert('Не реализованно')

    }
    closeRepeat = function (requestId) {
        alert('Не реализованно')

    }
    quickProcess = function (requestId) {
        alert('Не реализованно')

    }
    testCall = function (requestId) {
        alert('Не реализованно')

    }
    historyCall = function (requestId) {
        alert('Не реализованно')

    }
    ke = function (requestId) {
        let url = '/request-view/unints';
        let   data = {'requestId': requestId};
        this.getPjax(url, data);
    }
    contracts = function (requestId) {
        let url = '/request-view/contract';
        let   data = {'requestId': requestId};
        this.getPjax(url, data);
    }
    history = function (requestId) {
        let url = '/unit-history/history';
        let   data = {'requestId': requestId, isModal: true};
        this.getPjax(url, data);
    }
    files = function (requestId) {
        let url = '/request-view/files';
        let   data = {'requestId': requestId};
        this.getPjax(url, data);
    }
    addFileForm = function (requestId) {
        let url = '/sub-menu/files-add';
        let   data = {'requestId': requestId};
        this.getPjax(url, data, '#pjaxModalUniversal2');
    }
    identity = function (requestId) {
        let url = '/request-view/identity';
        let   data = {'requestId': requestId};
        this.getPjax(url, data);

    }
    automaticDialing = function (requestId) {
        alert('Не реализованно уточнить данные')

    }
    sla = function (requestId) {
        alert('Не реализованно уточнить данные')

    }
    expendable = function (requestId) {
        alert('Не реализованно уточнить данные')

    }
    conversionAttributes = function (requestId) {
        alert('Не реализованно уточнить данные')

    }
    messageClient = function (requestId) {
        alert('Не реализованно уточнить данные')

    }
    messageCorporation = function (requestId) {
        alert('Не реализованно уточнить данные')

    }
    messageDelays = function (requestId) {
        alert('Не реализованно уточнить данные')

    }
    messageSubsctibe = function (requestId) {
        alert('Не реализованно уточнить данные')

    }
    messageAlignment = function (requestId) {
        alert('Не реализованно уточнить данные')

    }
    allMessages = function (requestId) {
        alert('Не реализованно уточнить данные')

    }
    createOperationForm = function (requestId) {
        let url = '/operation/create';
        let   data = {'requestId': requestId};
        this.getPjax(url, data);
    }
    createWorkForm = function (requestId, operationId) {
        let url = '/work/create';
        let   data = {'requestId': requestId, operationId: operationId};
        this.getPjax(url, data)

    }
    updateWorkForm = function (requestId, operationId) {
        let url = '/work/update';
        let   data = {'requestId': requestId, id: operationId};
        this.getPjax(url, data);


    }
    updateOperationForm = function (requestId, operationId) {
        let url = '/operation/update';
        let   data = {'requestId': requestId, id: operationId};
        this.getPjax(url, data);


    }
    deleteWorkForm = function (requestId, workId) {
        let url = '/work/delete?id=' + workId + '&requestId=' + requestId;
        let   data = {};
        $.post(url, data, function () {
            $.pjax.reload({'container': '#view-operation_grid'})
        })
    }
    deleteOperationForm = function (requestId, operationId) {
        let url = '/operation/delete?id=' + operationId + '&requestId=' + requestId;

        let   data = {};
        $.post(url, data, function () {
            $.pjax.reload({'container': '#view-operation_grid'})
        })




    }
}

//
if (!rv) {
    var rv = new RequestView;
//    rv.PseudoTabListener();
    rv.createOperation();
    rv.CreateWork();
    rv.CreateMessage();
    rv.CreateMessageTab();
    rv.startPage();
    rv.pjaxForm();
    rv.clearBeginRq();
    rv.modalObjectLink();
    rv.spendingForm();
    rv.deleteSpanding();
    rv.addAttachToMessage();
}