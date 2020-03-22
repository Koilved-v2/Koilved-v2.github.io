class Table {
    constructor() {

        this.fixedTable = $('.js-fixed-table');
        this.trFixedTable = this.fixedTable.find('tr');

        this.currentTable = $('.js-current-table');
        this.scrollWrapperForCurrentTable = $('.specScroll');
        this.buttonModal = $('.js-show-modal');
        this.buttonAside = $('.js-show-aside');
        this.buttonShowPhone = $('.js-show-more-phones');
        this.stateCurrentIdAside = '';
        this.closeButtonForSidebarObj = $('#sidebar-object .button-icon--close');


        setTimeout(() => {
            $('.applications__container').removeClass('hidden-block');
            this.initResizableTable();
            this.initScroll();
            this.initSelect();
            this.initModal();
            this.initButtons();
        }, 4000);

    }

    checkActiveAside() {
        this.buttonAside.removeClass('button-icon--disabled');
        $('#' + this.stateCurrentIdAside + '').removeClass('active');
    }

    initButtons() {
        var self = this;
        this.buttonShowPhone.on('click', function () {
            $(this).prev().show();
            $(this).hide();
        });

        this.buttonAside.on('click', function () {
            var $this = $(this);
            var id = $this.data('aside');
            var idAside = $('#' + id + '');
            var $body = idAside.find('.popup__body');

            if (self.stateCurrentIdAside && self.stateCurrentIdAside !== id) {
                self.checkActiveAside();
            }

            self.stateCurrentIdAside = id;
            if (idAside.hasClass('active')) self.stateCurrentIdAside = '';
            $this.toggleClass('button-icon--disabled');
            idAside.toggleClass('active');

            if (idAside.find('.custom-table--fixed').length) return;
            updateFixedHeaderTable($body);
        });

        this.closeButtonForSidebarObj.on('click', function () {
            self.checkActiveAside();
        });
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
        this.currentTable.colResizable({
            liveDrag: true,
            resizeMode: 'overflow',
        });
    }

    updateLengthFixedTable(e) {
        let table = $(e.currentTarget);
        this.trFixedTable.html('');
        this.fixedTable.css({
            width: `${table.innerWidth()}px`,
            minWidth: `${table.innerWidth()}px`
        });
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
    }
}

new Table();

