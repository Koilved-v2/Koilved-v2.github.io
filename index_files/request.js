/**
 * Для работы на странице request/view/*
 * 
 * @type 
 */
function stopDefAction(evt) {
    evt.preventDefault();
}
var request = function () {

    var transition = function () {
        return {
            /**
             * Обрабатывем нажаите кнопок перехода 
             * @returns {undefined}
             */
            init: function () {
                $(document).on('click', ('.saveTransition'), function (e) {
                    e.preventDefault();
                    let url = $(this).data('url');
                    let formId = $(this).data('form');
                    let data = $('#' + formId).serialize();
                    //                    $('#' + formId).submit();
                    transition().save(url, data);
                })

            },
            /**
             * Обрабатываем сохранение перехода
             * @param {type} url
             * @param {type} data
             * @returns {undefined}
             */
            save: function (url, data) {
                $.post(url, data, function (inf) {
                    console.log(inf)
                    console.log(data)
                }).success(function () {
                    $.post(url, data, function (inf) {
                        console.log(inf)
                        console.log(data)
                    })
                })
                        .always(function (e, r) {
                            console.log(e)
                            alert();
                            console.log('always')
                        })
            }
        }
    }

    var autocompliteRequest = function () {
        function init() {
            $(document).off("change", ".pjaxClass");
            $(document).on('change', ".pjaxClass", function () {
                NextCahngeElem = $(this).data('next-elem');
                $('#pjax-container').showLoading();
                $.pjax({
                    data: $("#transitionAttributes").serialize(),
                    type: "POST",
                    url: $("#transitionAttributes").attr('action'),
                    container: "#PjaxPage",
                    push: false,
                    scrollTo: false
                }).done(function (data) {
                    $(NextCahngeElem).change();
                    console.log($(NextCahngeElem));
                    // делаем двойной pjax так какв предидущем посте передаються старые параметры
                }).always(function (jqXHR, textStatus, errorThrown) {
                    $('#pjax-container').hideLoading();
//                    alert("Ошибка на сервере");
                })
            })
//            $('#operation-operation_type_id').change();

        }

        return {
            init: function () {
                self:init();
            },

        }
    }
    function clearFilter() {
        $('#search-form').find('input').val('');
        $('[form=search-form]').val('');
        $('.numbercount').remove();
        $('.select2-selection__choice').remove();

    }


    return {
        init: function () {
            transition().init();
//            autocompliteRequest().init();

        },
        clearFilter: function () {
            self:clearFilter();
            $.pjax({
                type: "POST",
                url: '/request/index',
                push: true,
                scrollTo: false,
                container: '#mainRequestWindow',
            })
        },
        
        autoplayToogle: function () {

        }

    }
}();

let autoplay = false;
request.init();
 