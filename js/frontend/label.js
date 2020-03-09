$(document).ready(function () {
    let containerLabels = $('.js-set-labels');
    containerLabels.on('click', function () {
        $(this).next().toggleClass('applications__request-label-list--show')
    });

    $('.js-show-label-list').on('click', function () {
        let $this = $(this);
        $this.parent().next().toggleClass('applications__request-label-list--show')
    });

    $(document).click(function (event) {
        if ($(event.target).closest('.js-set-labels').length || $(event.target).closest('.js-show-label-list').length) {
            return;
        }

        $('.applications__request-label-list').removeClass('applications__request-label-list--show')
    });

    $('.js-get-labels').on('click', '.label-item__list-item', function () {
        let $this = $(this);
        let labels = $this.html();
        containerLabels.html(labels);
        $('.applications__request-label-list').removeClass('applications__request-label-list--show')
    });
});