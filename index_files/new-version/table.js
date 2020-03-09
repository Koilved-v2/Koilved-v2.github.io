class Table {
    constructor(name, sound) {

        this.fixedTable = $('.js-fixed-table');
        this.trFixedTable = this.fixedTable.find('tr');

        this.currentTable = $('.js-current-table');
        this.scrollWrapperForCurrentTable = $('.specScroll');
        this.buttonModal = $('.js-show-modal');
        this.isStop = false;


        setTimeout( () => {
            $('.applications__container').removeClass('hidden-block')
            this.initResizableTable();
            this.initScroll();
            this.initSelect();
            this.initModal();

            // let table = this.currentTable;
            // this.trFixedTable.html('');
            // this.fixedTable.css({
            //     width: `${table.innerWidth()}px`,
            //     minWidth: `${table.innerWidth()}px`});
            // this.trFixedTable.append(table.find('th').clone());
            // this.fixedTable.parent().scrollLeft(this.scrollWrapperForCurrentTable.scrollLeft());

        }, 4000);

    }

    initModal() {
        let self = this;
        this.buttonModal.on('click', function () {
            $(this).prev().show();
            self.updateStateCell($(this))
        });
    }

    updateStateCell(menu) {
        menu.closest('td').toggleClass('is-visible');
    }

    initResizableTable() {

        // fix link https://github.com/alvaro-prieto/colResizable/issues/56
        this.currentTable.colResizable({
            liveDrag: true,
            resizeMode: 'overflow',
            // onDrag: $.throttle(100, this.updateLengthFixedTable.bind(this)),
            // onResize: $.throttle(100, this.updateLengthFixedTable.bind(this)),
        });
    }

    copyCurrentThead() {

    }

    stopDrag(e) {
        let table = $(e.currentTarget);
        setTimeout(() => {
            this.isStop = false;
            console.log('2')
        }, 200);

        // this.trFixedTable.html('');
        // this.fixedTable.css({
        //     width: `${table.innerWidth() + 3}px`,
        //     minWidth: `${table.innerWidth() + 3}px`});
        // this.trFixedTable.append(table.find('th').clone());
    }

    updateLengthFixedTable(e) {
        //this.isStop = true;
        let table = $(e.currentTarget);
        this.trFixedTable.html('');
        this.fixedTable.css({
            width: `${table.innerWidth()}px`,
            minWidth: `${table.innerWidth()}px`});
        this.trFixedTable.append(table.find('th').clone());
        this.fixedTable.parent().scrollLeft(this.scrollWrapperForCurrentTable.scrollLeft());
    }

    initScroll() {
        let lastScrollLeft = 0;
        this.scrollWrapperForCurrentTable.scroll(({target}) => {
            let documentScrollLeft = this.scrollWrapperForCurrentTable.scrollLeft();
            if (lastScrollLeft !== documentScrollLeft) {
                this.fixedTable.parent().scrollLeft($(target).scrollLeft());
                lastScrollLeft = documentScrollLeft;
            }
        });
    }

    initSelect() {
        if (jQuery('#custon-Listname').data('select2')) {
            jQuery('#custon-Listname').select2('destroy');
        }
        window.custon_Listname_option = {
            "allowClear": true,
            "prompt": "Все",
            "closeOnSelect": false,
            "theme": "custom",
            "width": "100%",
            "placeholder": "Выбрать фильтр",
            "language": "ru"
        };
        window.custon_show = {
            "theme": "custom custom-mini",
            "width": "100%",
            "minimumResultsForSearch": "-1",
            "language": "ru"
        };
        $('#select-show-count').select2(custon_show);
        $('#autoplay').select2(custon_show);
        jQuery.when(jQuery('#custon-Listname').select2(custon_Listname_option)).done(initS2Loading('custon-Listname', 's2options_c4acac00'));
        // jQuery('#custon-Listname').on('select2:select', function (data) {
        //     counterSelectElement(data)
        // });
        // jQuery('#custon-Listname').on('select2:unselecting', function (data) {
        //     counterSelectElement(data)
        // });
        // jQuery('#custon-Listname').on('select2:unselect', function (data) {
        //     counterSelectElement(data)
        // });
    }
}

new Table();
// !!!!!!!!!!
// !!!!!!!!!!
// !!!!!!!!!!
// !!!!!!!!!!
// !!!!!!!!!! RequestTable.js  add new function

