$(document).ready(function () {
    // выпадающий список
    $('.custom-dropdown__name').on('click', function () {
        let $this = $(this);
        $('.custom-dropdown').removeClass('custom-dropdown--active');
        $this.parent().toggleClass('custom-dropdown--active')
    });

    // кнопка сердца
    $('.js-automatic-dialing').on('click', function () {
        $(this).toggleClass('button-icon--automatic-dialing-active')
    });

    // пока чекбокса в попапе file
    $('.js-show-checkboxs').on('click', function () {
        $(this).next().toggleClass('popup__header-checkboxs-other--show')
    });

    $("input[type='file']").on('change', function () {
        let $this = $(this);
        let file = $this.prop('files')[0];
        $this.parent().find('span').html(file.name).css('color', '#414040')
    });


    // закрытие вне области
    $(document).click(function (event) {
        if ($(event.target).closest('.js-show-checkboxs').length) return;
        if ($(event.target).closest('.custom-dropdown__name').length) return;
        if ($(event.target).closest('.popup__header-checkboxs-other').length) return;

        $('.popup__header-checkboxs-other').removeClass('popup__header-checkboxs-other--show');
        $('.custom-dropdown').removeClass('custom-dropdown--active');
    });
});

