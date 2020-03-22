/* 
 * Gonnyh Ivan
 * sinelnikof88@gmail.com
 * Developing  by Yii
 * Each line should be prefixed with  * 
 */
/* global rt, krajeeDialog */

class elementFilter {
    constructor(c) {
        this.id = c.id;
        this.filter_name = c.filter_name;
        this.filter_object = c.filter_object;
        this.position = c.position;
    }
}

class RenderList {

    createHandle = function () {
        let moveElement = document.createElement('span');
        let moveimage = document.createElement('i');
        // ###-правка
        moveimage.classList.add('button-icon', 'button-icon--move');
        moveElement.append(moveimage);
        moveElement.classList.add('move', 'handle', 'col-lg-1');
        return moveElement;
    }
    createText = function (element) {
        let textColumn = document.createElement('span');
        let textwrap = document.createElement('p');
//        textwrap.append(element.id);
        textwrap.append(element.filter_name);
        textwrap.classList.add('contenteditable');
        textwrap.setAttribute('contenteditable', 'true');
        textwrap.dataset.id = element.id;
        // ###-правка
        textColumn.classList.add('text-filter', 'col-lg-8');
        textColumn.append(textwrap);
        return textColumn;
    }

    creteSaveButton = function (item) {
        let saveButton = document.createElement('i');
        let saveLink = document.createElement('a');
        saveLink.setAttribute('href', '/user-filter/save/' + item.id);
        saveLink.classList.add('saveFilter');

        saveLink.dataset.id = item.id;
        saveButton.classList.add('svg', 'svg-pointer', 'svg-x2', 'svg-btn-save');
        saveButton.append(saveLink);
        return saveButton;
    }
    creteDeleteButton = function (item) {
        let deleteButton = document.createElement('i');
        let deleteLink = document.createElement('a');
        deleteLink.setAttribute('href', '/user-filter/delete/' + item.id);
        deleteLink.classList.add('delteFilter');
        deleteLink.dataset.id = item.id;

        deleteButton.classList.add('svg', 'svg-pointer', 'svg-x2', 'svg-trash-full');
        deleteButton.append(deleteLink);
        return deleteButton;
    }

    actionButton = function (item) {
        let actionColumn = document.createElement('span');
        actionColumn.classList.add('col-lg-3', 'text-right');

        let saveButton = this.creteSaveButton(item);
        let deleteButton = this.creteDeleteButton(item);
        actionColumn.append(saveButton);
        actionColumn.append(deleteButton);
        return  actionColumn;
    }

    build = function () {
        $(this.placeSelector).html('');
        var list = document.createElement('ul');
        list.classList.add('sortable', 'list');
        list.setAttribute("id", "sortingWiget2");
        for (var key in this.items) {
            var opt = document.createElement('li');
            opt.classList.add('sort_item', 'g_s_i_2', 'customcheck');
            opt.dataset.id = this.items[key].id;
            opt.dataset.filter_name = this.items[key].filter_name;
            opt.dataset.filter_name = this.items[key].filter_name;
//            opt.dataset.filter_object =  this.items[key].filter_object;
            opt.dataset.position = this.items[key].position;

            let elemWrapper = document.createElement('div');
            elemWrapper.classList.add('row');


            let  handle = this.createHandle(this.items[key]);
            let  text = this.createText(this.items[key]);
            let  actionButtons = this.actionButton(this.items[key]);

            elemWrapper.append(handle);
            elemWrapper.append(text);
            elemWrapper.append(actionButtons);
            opt.append(elemWrapper);
            list.append(opt);
        }

        let filterBar = document.createElement('div');
        filterBar.setAttribute("id", "filterBar");
        $(this.placeSelector).append(filterBar);
        filterBar.append(list);

    }

    constructor(items) {
        this.items = items;
        this.placeSelector = '#ajaxSidebarObjectContent';
    }

}
class RenderOptions {
    constructor(items) {
        var select = $(this.dropDownSelector);
        select.html("");
        this.items = items;
        this.dropDownSelector = '.userFilter';

    }
    build = function () {
        var select = $(this.dropDownSelector);
        select.html("");
        var opt = document.createElement('option');
        select.append(opt);
        // отрисовываем дропдовн
        for (var key in this.items) {
            var opt = document.createElement('option');
            opt.value = this.items[key].id;
            opt.innerHTML = this.items[key].filter_name;
            select.append(opt);
        }
    }
}

class userFilter {
    // открытие списка фильтров

    selectCallTableListener = function () {
        let _this = this
        $(document).on('click', this.getTableSelector, function (e) {
            rt.sb5.setStyle($(this).data('sidebar-style'));
            rt.sb5.setHeader($(this).data('sidebar-name'));
            rt.sb5.open();
            _this.render();
        })
    }

    constructor() {
        this.urlSaveSort = '/user-filter/sort';
        this.url = '/user-filter/get-all-filters';
        this.tableSelector = '#filterBar';
        this.getTableSelector = '#FilterEditLink';
        this.getDeleteSelector = '.delteFilter';
        this.getSaveSelector = '.saveFilter';
        this.dropDownSelector = '.userFilter';

        this.elements = [];
    }
    // загружаем список фильтров пользователя
    loadFilter = function () {
        let els = [];
        let _this = this;
        $.getJSON(this.url, null, function (data) {

        }).done(function (data) {
            for (var i = 0; i < data.length; i++) {
                let e = new elementFilter(data[i]);
                els[i] = e;
            }

            els.sort(function (a, b) {
                return a.position - b.position;
            });
            _this.elements = els;
            _this.render();
        });

    }

    render = function () {
        //отрисовка панели
        let renderOptions = new RenderOptions(this.elements);
        renderOptions.build();
        let renderList = new RenderList(this.elements);
        renderList.build();
        this.sortListener();
    }

    // слушатель события сортировки фильтра
    sortListener = function () {
        let _this = this;
        if ($('#sortingWiget2').length) {
            sortable('#sortingWiget2', {items: 'li', handle: '.handle'});
            jQuery('#sortingWiget2').on('sortupdate', function (e, ui) {
                _this.sortFilterItem(e, ui);
            });
        }
    }

    sortFilterItem = function (e, ui) {
        let _this = this;
        let elementList = [];
        $.each(e.target.children, function (i, elem) {
            for (var key in _this.elements) {
                if (_this.elements[key].id == $(elem).data('id')) {
                    _this.elements[key].position = i;
                    elementList[key] = _this.elements[key];
                }
            }
        });

        elementList.sort(function (a, b) {
            return a.position - b.position;
        });
        this.elements = elementList;


        $.ajax({
            url: this.urlSaveSort,
            type: 'POST',
            dataType: 'json',
            data: {sort_item: this.elements},
            success: function (response) {
                _this.render();
            },

        })
    }

// сохранение
    saveListener = function () {
        this.save();
        this.render();
    }
// локальное обновление
    localUpdateListener = function () {
        let _this = this;
        $(document).on('input', '.contenteditable', function () {
            let id = $(this).data('id');
            let text = $(this).html();
            let elem = _this.elements.find(x => x.id == id);
            let pos = _this.elements.findIndex(x => x.id == id);

            elem.filter_name = $(this).html();
            _this.elements[pos] = elem;
        })
    }

    /**
     * Установленн пользовательский фильтр
     * @param {type} filter
     * @returns {undefined}
     */
    setCurrentFilter = function (filter) {
        if (filter === false) {
            return;
        }
        let attr = JSON.parse(filter.filter_object);
        window.location = '/request/index?' + $.param(attr);



        $.notify({message: 'Фильтр применен'}, {type: 'info'});
    }
    /*********/

    setFilterListener = function () {
        // устанаввливаем данные в поля поиска
        let _this = this;
        $(document).on('change', '.userFilter', function () {
            let val = ($(this).val());
            let elem = _this.elements.find(x => x.id === val);
            _this.setCurrentFilter(elem);
        });
    }

    getFilter = function (id) {
        let elem = this.elements.find(x => x.id == id);

        var d = {
            filter_name: elem.filter_name,
            filter_object: JSON.stringify($('*[name*="RequestSearch"]').serializeArray())
        };
        return {UserFilter: d};
    }

    updateListener = function () {
        let _this = this;
        $(document).on('click', this.getSaveSelector, function (e) {
            e.preventDefault();
            let url = $(this).attr('href');
            let iddd = $(this).data('id');
            krajeeDialog.confirm('Сохранить фильтр?', function (out) {
                if (out) {
                    let data = _this.getFilter(iddd);
                    $.post(url, data, function (ret) {
                        console.log(ret);
                    }).done(function () {
                        _this.loadFilter();
                    })
                }
            })
        })
    }

    createListener = function () {

        //сохраненние
    }

    deleteListener = function () {
        let _this = this;
        $(document).on('click', this.getDeleteSelector, function (e) {
            e.preventDefault();
            let url = $(this).attr('href');
            let iddd = $(this).data('id');
            krajeeDialog.confirm('Удалить фильтр?', function (out) {
                if (out) {
                    $.post(url, {}, function () {
                        _this.elements = _this.elements.filter(x => x.id != iddd);
                        _this.render();
                    })
                }
            })
        })
    }

    saveFilterListener = function () {
        var _this = this;

        $(document).on('beforeSubmit', '#newFilter-form', function () {
            _this.submitFilterForm(this);
            return false;
        });

    }
    submitFilterForm = function (_this) {
        var userFilter = this;
        var d = {
            filter_name: $('#userfilter-filter_name').val(),
            filter_object: JSON.stringify($('*[name*="RequestSearch"]').serializeArray())
        };

        $.ajax({
            data: {UserFilter: d},
            type: "POST",
            url: $(_this).attr('action')
        }).always(function (jqXHR, textStatus, errorThrown) {
            $('#userfilter-filter_name').val('');
            rt.sb3.close()
            userFilter.loadFilter();
        })
    }

    init = function () {

        this.loadFilter();
//        this.sortListener();
//        this.deleteListener();
//        this.saveListener();
        this.updateListener();
        this.deleteListener();
    }
}

var uf = new userFilter;
uf.init();
uf.selectCallTableListener();
uf.localUpdateListener();
uf.setFilterListener();
uf.saveFilterListener();
