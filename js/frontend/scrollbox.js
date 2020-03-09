require('jquery-mousewheel');
require('malihu-custom-scrollbar-plugin');

$(document).ready(function () {
    const commonOptions = {
        scrollbarPosition: 'outside',
        theme: 'custom-scroll',
        scrollInertia: 0,
        mouseWheel: {preventDefault: true},
    };

    $('.js-custom-scroll-y').mCustomScrollbar({
        ...commonOptions,
        axis: "y"
    });
    $('.js-custom-scroll-xy').mCustomScrollbar({
        ...commonOptions,
        axis: "yx",
        callbacks: {
            whileScrolling: function () {
                scrollTAbleHeader(this);
            },
        }
    });

    function scrollTAbleHeader(el){
        $(el).closest('.popup__body').find('.custom-table--fixed').css('left', `${el.mcs.left}px`)
        $(el).closest('.b-tree').find('.custom-table--fixed').css('left', `${el.mcs.left}px`)
    }
});