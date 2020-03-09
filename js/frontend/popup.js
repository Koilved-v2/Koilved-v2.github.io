let magnificPopup = require('magnific-popup');

$(document).ready(function () {
    window.updateFixedHeaderTable = function($body) {
        let isSingle = $body.find('.custom-table--single').length;
        if (isSingle) return;
        cleanNewTable($body);
        setNewTable($body);
        setLightStyle($body);
        setWidthInNewTable($body);
    };

    $(document).on('click', '.js-show-popup', function (e) {
        $(this).magnificPopup({
            fixedContentPos: true,
            removalDelay: 350,
            mainClass: 'custom-mfp mfp-fade',
            showCloseBtn: false,
            callbacks: {
                open() {
                    let $bodies = $(this.content).find('.popup__body');
                    let isTable = $bodies.find('table').length;
                    let isSingle = $bodies.find('.custom-table--single').length;
                    if (!isTable || isSingle) return;

                    $bodies.each((i, body) => {
                        setNewTable($(body));
                        setLightStyle($(body));
                        setWidthInNewTable($(body))
                    });
                },
                close() {
                    cleanNewTable($(this.items[0].src))
                }
            },
        }).magnificPopup('open');
    });

    $(document).on('click', '.js-close-popup', function (e) {
        $.magnificPopup.close();
    });
});

function setNewTable($body) {
    $body.prepend(getHtmlTable())
}
function getHtmlTable() {
    return `<div class="custom-table custom-table--scroll custom-table--fixed"><table></table></div>`
}
function setLightStyle($body) {
    const nameClass = 'custom-table--light';
    let isLightStyle = $body.find(`.${nameClass}`).length;
    if (isLightStyle) $body.find('.custom-table--fixed').addClass(nameClass)
}
function cloneThead($body) {
    return $body.find('thead').clone();
}
function getWidthCurrentTh($body) {
    let widthListTh = [];
    const listTh = $body.find('.popup__body-wrap th');
    listTh.each((i, item) => {
        widthListTh.push($(item).innerWidth() + 1);
    });
    const resultRealWidth = widthListTh.reduce((sum, elem) => sum + elem);
    return {widthListTh, resultRealWidth};
}
function setWidthInNewTable($body) {
    const table = $body.find('.custom-table--fixed table');
    const {widthListTh, resultRealWidth} = getWidthCurrentTh($body);
    table.append(cloneThead($body));

    table.css('width', `${resultRealWidth}px`);

    table.find('th').each((i, th) => {
        $(th).css('min-width', `${widthListTh[i]}px`)
    });
}
function cleanNewTable($body) {
    $body.find('.custom-table--fixed').remove()
}

export { setNewTable, setWidthInNewTable}