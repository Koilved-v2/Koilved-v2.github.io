import {setNewTable, setWidthInNewTable} from './popup';
import {startLines} from './line';

$(document).ready(function () {
    let linkTab = $('.js-tab > div'),
        contentTab = $('.js-tab-content > div'),
        desc = $('.tabs__control-desc > div'),
        elClosest = '.tabs';

    let treeBlock = $('.b-tree');
    let flagFirst = true;

    linkTab.on('click', function (e) {
        let $this = $(this),
            tabActive = $this.closest(elClosest).find('.js-tab > div');

        tabActive.removeClass('tabs__control-item--active');
        $this.addClass('tabs__control-item--active');
        let clickedTab = $('.js-tab').find('.tabs__control-item--active');

        contentTab.removeClass('tabs__body-item--active');
        desc.removeClass('tabs__sub-control--active');
        let clickedTabIndex = clickedTab.index();
        contentTab.eq(clickedTabIndex).addClass('tabs__body-item--active');
        desc.eq(clickedTabIndex).addClass('tabs__sub-control--active');

        let isTree = contentTab.eq(clickedTabIndex).find('.b-tree');


        if (isTree.length > 0) {
            treeBlock.find('.custom-table--fixed').css('left', '0');
            // отрисовка линий и приклепление шапки
            if (flagFirst) {
                setTimeout(() => {
                    setNewTable(treeBlock);
                    setWidthInNewTable(treeBlock);
                    startLines();
                    console.log(treeBlock);
                }, 300);
                flagFirst = false
            }
        }
    });
});
