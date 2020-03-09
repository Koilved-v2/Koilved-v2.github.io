$(document).ready(function () {
    const listClasses = 'b-tooltip--show b-tooltip--remove b-tooltip--add b-tooltip--confirm';

    $('.js-show-tooltip').on('click', function () {
        let $this = $(this);
        let type = $this.data('type');
        let popup = $(this).closest('.popup');
        let isPopup = popup.length > 0 ? popup : $(this).closest('.applications__container');

        let tooltipBlock = isPopup.find('.b-tooltip');
        tooltipBlock.removeClass(listClasses);
        if (type === 'remove') tooltipBlock.addClass('b-tooltip--remove');
        if (type === 'add') tooltipBlock.addClass('b-tooltip--add');
        if (type === 'confirm') tooltipBlock.addClass('b-tooltip--confirm');
        tooltipBlock.addClass('b-tooltip--show')
    });

    $('.js-close-tooltip').on('click', function () {
        let $this = $(this);
        $this.closest('.b-tooltip').removeClass(listClasses)
    });

    $(document).click(function (event) {
        if ($(event.target).closest('.js-show-tooltip').length) return;
        if ($(event.target).closest('.b-tooltip').length) return;
        $('.b-tooltip').removeClass(listClasses)
    });
});

