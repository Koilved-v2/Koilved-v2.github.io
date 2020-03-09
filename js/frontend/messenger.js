$(document).ready(function () {
    $(document).on('click', '.js-show-mess-control', function () {
        let $this = $(this);
        let dropdown = $this.next();
        let isActive = dropdown.hasClass('b-messages__item-more-list--active');
        $('.js-show-mess-control').removeClass('b-messages__item-more-icon--active');
        $('.b-messages__item-more-list').removeClass('b-messages__item-more-list--active');
        if (!isActive) {
            dropdown.addClass('b-messages__item-more-list--active');
            $this.addClass('b-messages__item-more-icon--active');
        }
    });

    $('.js-textarea-mess').on('input', function () {
        $(this).css('height', '29px');
        $(this).css('height', `${$(this).prop('scrollHeight')}`);
    });

    // закрытие вне области

    $(document).click(function (event) {
        if ($(event.target).closest('.js-show-mess-control').length) return;

        $('.b-messages__item-more-list').removeClass('b-messages__item-more-list--active');
        $('.js-show-mess-control').removeClass('b-messages__item-more-icon--active');
    });
});
