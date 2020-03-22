/* 
 Обект для работы с таблицей заявок
 первый выполняеться iinit по умолчанию автоматом
 класс юзаеться как статичный!!!
 */

/* global RequestSidebar */

class RequestTable {
    // ###-правка
    constructor(url) {
        this.currentSelectorMenu = null;
    }

    hiddenClass = function () {
        return 'rtHide';
    }

    conf() {
        return {
            hideOffset: 2000,
            hiddenClass: 'rtHide'
        }
    }
    // тестовая хрень 
    setInfo = function (path) {
        $.get(path.url, function (data) {
            rt.sb4.setContainer(data)
            rt.sb4.open()
        })
    }
    // устанавливаем значанеия для фильтра из таблицы
    setFilterValue = function (filterName, filterValue, filterText) {
        var _filter = $(filterName);
        _filter.val(filterValue).change();
        if (_filter.val().length === 0) {
            console.log(_filter)
            _filter.append(new Option(filterText, filterValue, true, true));

        }
        $.notify({message: 'Выполнена сортировка'}, {type: 'info'});
        $('#search-form').submit();

    }

    // фильтрация из табличу с помощю дата аттрибутов
    FilterLinkListener = function () {
        $(document).on('click', '.filterLink', function (e) {
            console.log('click1')

            if (!$(this).hasClass('filtred')) {
                return;
            }
            console.log('click2')

            let filterName = $(this).data('filter-name');
            let filterVal = $(this).data('filter-val');
            let filterText = $(this).data('filter-text');
            rt.setFilterValue(filterName, filterVal, filterText)
            e.preventDefault();
        })
    }

    // аяксовый сайдбар
    SidebarLinkListener = function () {
        $(document).on('click', '.sidebarLink', function () {
            rt.sb5.close();
            if ($(this).hasClass('filtred')) {
                return;
            }
            $.pjax({
                type: "GET",
                url: $(this).data('sidebar-link'),
                container: '#ajaxSidebarContent',
                push: false,
                timeout: 10000,
                scrollTo: false
            })
            rt.sb4.setStyle($(this).data('sidebar-style'));
            rt.sb4.setFooter($(this).data('sidebar-footer'));
            rt.sb4.setHeader($(this).data('sidebar-name'));
            rt.sb4.open();
        })
    }
    // сайдбар слушатель обекта заявки заполнение аяксом
    SidebarObjectListener = function () {
        $(document).on('click', '.sidebarObjectLink', function () {
            $.pjax({
                type: "GET",
                url: $(this).data('sidebar-link'),
                container: '#ajaxSidebarObjectContent',
                push: false,
                timeout: 10000,
                scrollTo: false
            })
            rt.sb5.setStyle($(this).data('sidebar-style'));
            rt.sb5.setHeader($(this).data('sidebar-name'));
            rt.sb5.open();
        })
    }
    // перехват событий клавиатуры для клика во время нажатия на клвишу ctr

    // очищаем все настройки из локального хранилища
    clearStorage = function () {
        localStorage.clear();
        $.notify({message: 'Настройки ширины полей сброшенны'}, {type: 'info'});

    }
    // сохранение доступов в сайдбаре обекта
    UpdateSharedInfoListener = function () {
        $(document).on('beforeSubmit', '#updateSharedForm', function () {
            var _this = this;
            $('#sharedFormWrapper').showLoading();
            $.ajax({
                data: $(_this).serialize(),
                type: "POST",
                url: $(_this).attr('action'),
                container: "#sharedFormWrapper",
                push: false,
                scrollTo: false
            }).done(function (data) {
                $.notify({message: 'Доступы сохраненны'}, {type: 'info'});
            }).always(function (jqXHR, textStatus, errorThrown) {
                $('#sharedFormWrapper').hideLoading();
            })
            return false;
        });
    }
    // сохранение доступов в сайдбаре обекта
    UpdateRequestTextListener = function () {
        $(document).on('beforeSubmit', '#RequestText', function () {
            var _this = this;
            $('#RequestText').showLoading();
            $.ajax({
                data: $(_this).serialize(),
                type: "POST",
                url: $(_this).attr('action'),
                push: false,
                scrollTo: false
            }).done(function (data) {
                $.notify({message: 'Текст изменен'}, {type: 'info'});
                $.pjax.reload({container: '#mainRequestWindow', async: true, timeout: 10000, scrollTo: false});
            }).always(function (jqXHR, textStatus, errorThrown) {
                $('#RequestText').hideLoading();
            })
            return false;
        });
    }
    // звонок на номер
    phoneCall = function (phone) {
        alert('звонок на номер ' + phone)
    }

    popoverInit = function () {
        var self = this;
        $('[data-toggle="popover"]').popover({container: '.requestTable'})

        $('body').on('click', function (e) {
            $('[data-toggle="popover"]').each(function () {
                //the 'is' for buttons that trigger popups
                //the 'has' for icons within a button that triggers a popup
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    $(this).popover('hide');
                }
            });

            var div = $('.menuContent'); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                    && div.has(e.target).length === 0) { // и не по его дочерним элементам
                div.hide(); // скрываем его
                // ###-правка
                if (self.currentSelectorMenu) {
                    self.updateStateCell(self.currentSelectorMenu);
                    self.resetSelectorMenu();
                }
            }
        });
    }

    // ###-правка
    updateStateCell(menu) {
        menu.closest('td').toggleClass('is-visible');
    }

    // ###-правка
    resetSelectorMenu() {
        this.currentSelectorMenu = null;
    }

    // ###-правка
    checkPositionClickOnScreen = function (e) {
        var halfScreenWidth = $(window).width()/2;
        var positionClick = e.pageX;
        return positionClick > halfScreenWidth ? 'rightSide' : 'leftSide';
    }

    menuItemInit = function () {
        let _this = this;

        $(document).on('click', '.subMenu', function (e) {
            if ($(this).hasClass('filtred')) {
                return e;
            }

            // ###-правка
            var sideType = rt.checkPositionClickOnScreen(e);

            var _tis = this;
            setTimeout(function () {
                // ###-правка
                $('.menuContent').hide().attr('data-sideType', '');
                var group = $(_tis).data('menu-target_div');
                let conteiner = '.' + group;
                // ###-правка
                _this.currentSelectorMenu = $(conteiner);
                _this.updateStateCell(_this.currentSelectorMenu);

                $.pjax({
                    type: "POST",
                    url: $(_tis).data('menu-url'),
                    push: false,
                    scrollTo: false,
                    container: conteiner,
                })
                // ###-правка
                $(conteiner).attr('data-sideType', sideType).show();
            }, 200)
        })
    }

    // menuContent = function (conteiner) {
    //     try {
    //        let semWith = $('#requestTable-container').width() / 2;
    //     let e = $(conteiner).offset();
    //     if (e.left > semWith) {
    //         $(conteiner).css('right', '1px');
    //     }
    //     } catch (e) {
    //        console.log('Нет таблицы')
    //     }
    // }

    closeMenu = function (reqiestId) {
        $('.menuContent').hide();
    }
    // ссылки которые находяться внутри таблицы будут обновлять таблицу
    tableLink = function () {
        $(document).on('click', '.tableLink', function (e) {
            var _this = this;
            e.preventDefault();
            krajeeDialog.confirm("Вы действительно хотите продолжить?", function (result) {
                if (result) {
                    $.get($(_this).attr('href'), function () {
                        $.pjax.reload({container: '#mainRequestWindow', async: true, timeout: 10000, scrollTo: false});
                    })
                }
            });
        })
    }
    // ссылки которые находяться внутри таблицы будут обновлять таблицу
    quickProcess = function () {
        $(document).on('click', '.quickProcess', function (e) {
            e.preventDefault();
            var _this = this;
            $.pjax({
                type: "GET",
                url: $(_this).attr('href'),
                container: '#pjaxModalUniversal',
                push: false,
                timeout: 10000,
                scrollTo: false
            }).done(function (data) {


            })
        })
    }
    createMessage = function () {
        $(document).on('beforeSubmit', '#CreateMessage', function () {
            var conteiner = '';
            if ($('#ajaxSidebarObjectContent').length > 0) {
                conteiner = '#ajaxSidebarObjectContent';
            }
            if ($('#DynamicWindow').length > 0) {
                conteiner = '#DynamicWindow';
            }
            $('#CreateMessage').showLoading();
            var _this = this;
            $.pjax({
                data: $(_this).serialize(),
                type: "POST",
                url: $(_this).attr('action'),
                container: conteiner,
                push: false,
                scrollTo: false
            }).done(function (data) {
//                $.notify({message: 'Текст изменен'}, {type: 'info'});
                //    $.pjax.reload({container: '#mainRequestWindow', async: true, timeout: 10000, scrollTo: false});
            }).always(function (jqXHR, textStatus, errorThrown) {
                $('#CreateMessage').hideLoading();
            })
            return false; // Cancel form submitting.
        });
    }
    confirmTransition = function () {
        $(document).on('beforeSubmit', '#createOperationAjaxForm', function () {
            $('#createOperationAjaxForm').showLoading();
            var _this = this;
            $.ajax({
                data: $(_this).serialize(),
                type: "POST",
                url: $(_this).attr('action') + '&ajaxonly=true',
                push: false,
                scrollTo: false
            }).done(function (data) {
                $.notify({message: 'Переход выполнен'}, {type: 'info'});
                $('#universal-modal').modal('hide');
            }).always(function (jqXHR, textStatus, errorThrown) {
                $('#createOperationAjaxForm').hideLoading();

                setTimeout(function () {
                    if ($('#mainRequestWindow').length) {
                        $.pjax.reload({container: '#mainRequestWindow', async: true, timeout: 10000, scrollTo: false});
                    }

                    if ($('#statusStateToggle').length) {
                        $.pjax.reload({container: '#statusStateToggle', async: false, timeout: 0, scrollTo: false});
                    }
                }, 300)

                setTimeout(function () {

                    if ($('#view-operation_grid').length) {
                        $.pjax.reload({container: '#view-operation_grid', async: true, timeout: 10000, scrollTo: true});
                    }

                }, 300)




            })
            return false; // Cancel form submitting.
        });
    }

    // ссылки которые находяться внутри таблицы будут обновлять таблицу
    addAtachmentButton = function () {
        $(document).on('click', '.addAtachmentButton', function (e) {
            e.preventDefault();
            var _this = this;
            $.pjax({
                type: "GET",
                url: $(_this).attr('href'),
                container: '#pjaxModalUniversal',
                push: false,
                timeout: 10000,
                scrollTo: false
            })
        })
    }
    // Загрузка файлов
    UploadFile = function () {
        $(document).on('beforeSubmit', '#Fileform', function () {
            $('#Fileform').showLoading();
            var _this = this;
            $.ajax({
                url: $(_this).attr('action'),
                type: "POST",
                data: new FormData(_this),
                processData: false,
                contentType: false
            }).done(function (data) {
                if ($('#mainRequestWindow').length) {
                    $.pjax.reload({container: '#mainRequestWindow', async: true, timeout: 10000, scrollTo: false});
                }

            }).always(function (jqXHR, textStatus, errorThrown) {
                $('#Fileform').hideLoading();
                $('#universal-modal').modal('hide');


                if ($('#attachmentTable').length) {
                    $.pjax.reload({container: '#attachmentTable', async: true, timeout: 10000, scrollTo: false});
                }

            })
            return false;
        });
    }

    submitFilterForm = function () {

        $(document).on('beforeSubmit', '.filtedForm-form', function () {
            $.ajax({
                url: $(this).attr('action'),
                type: 'POST',
                data: $(this).serialize(),
                success: function (response) {
                    $.pjax({url: "/user-filter/drop", processData: false, push: false, timeout: 10000, contentType: false, container: "#filterTable"})

                    $.notify({message: 'Фильтр сохранен'}, {type: 'info'});
                },
            })

            return false;
        })

    }

    autoplay = function (timerId) {
        let timeout = 0;
        $(document).on('change', '#autoplay', function () {
            timeout = $(this).val();
            $.get('/site/autoplay?val=' + timeout);
            clearInterval(timerId)
            if (timeout > 0) {

                timerId = setInterval(function tick() {
                    $("#search-form").submit()
                }, timeout * 1000);
            }


            return false;
        });
        $('#autoplay').change();

    }

//    deleteUserFilter = function () {
//        $(document).on('click', '.deleteUserFilter', function (e) {
//            e.preventDefault();
//            let href = $(this).attr('href');
//            let parent = $(this).parent().parent();
//            krajeeDialog.confirm('Удалить фильтр?', function (out) {
//                if (out) {
//                    $.ajax({
//                        url: href,
//                        type: 'POST',
//                        success: function (response) {
//                            $.pjax({url: "/user-filter/drop", processData: false, push: false, timeout: 10000, contentType: false, container: "#filterTable"})
//                            parent.remove();
//                            $.notify({message: 'Фильтр удален'}, {type: 'info'});
//
//                        },
//                    });
//
//                }
//            });
//
//            return false;
//        })
//
//    }


    collection = function () {
        return [rt.sb1,
            rt.sb2,
            rt.sb3,
            rt.sb4,
            rt.sb5,
        ]
    }
    contactForm = function () {
        $(document).on('beforeSubmit', '#contact-form', function () {
            $.ajax({
                url: $(this).attr('action'),
                type: 'POST',
                data: $(this).serialize(),
                success: function (response) {
                    $.notify({message: 'Контакт изменен'}, {type: 'info'});
                    $.pjax.reload({container: '#mainRequestWindow', async: true, timeout: 10000, scrollTo: false});
                },
            })

            return false;
        })
    }

}
let timerId;
//
if (!rt) {
    var rt = new RequestTable;


    // добавлены новые сайдбары ###-правка
    rt.sb1 = new RequestSidebar({elem: $('#sidebar1')});
    rt.sb2 = new RequestSidebar({elem: $('#sidebar2')});
    rt.sb3 = new RequestSidebar({elem: $('#newFilter')});
    rt.sb4 = new RequestSidebar({elem: $('#ajaxSidebar')});
    rt.sb5 = new RequestSidebar({elem: $('#ajaxObjectSidebar')});
    rt.sb7 = new RequestSidebar({elem: $('#sidebar-object')});
    rt.sb8 = new RequestSidebar({elem: $('#sidebar-messenger')});
//rt.sb6 = new RequestSidebar({elem: $('#ajaxObjectSidebar')});
    rt.SidebarLinkListener();
    rt.SidebarObjectListener();
    rt.FilterLinkListener();
    rt.UpdateSharedInfoListener();
    rt.UpdateRequestTextListener();
    rt.popoverInit();
    rt.menuItemInit();
    rt.tableLink();
    rt.quickProcess();
    rt.createMessage();
    rt.confirmTransition();
    rt.addAtachmentButton();
    rt.UploadFile();
//    rt.submitFilterForm();
//    rt.userFilterListener();
//    rt.deleteUserFilter();
    rt.contactForm();
    rt.autoplay(timerId);
    rt.closeMenu();
//    rt.menuContent();

//$('#tableFilter').appendTo($(rt.sb1.pjaxElement()))
//
//rt.sb2.setContainer('666666666666')

}
