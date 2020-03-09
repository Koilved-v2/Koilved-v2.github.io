let simpleTreeTable = require('@kanety/jquery-simple-tree-table');

$(document).ready(function () {
    $('.js-table-collapsed').simpleTreeTable({
        opened: [0],
        margin: 14,
        iconPosition: ':first-child',
    }).on('node:open', function(e, $node) {
        const $body = $node.closest('.popup__body');
        updateFixedHeaderTable($body);

    }).on('node:close', function(e, $node) {
        const $body = $node.closest('.popup__body');
        updateFixedHeaderTable($body);
    });
});
