/* 
 Обект для работы с таблицей заявок
 первый выполняеться iinit по умолчанию автоматом
 класс юзаеться как статичный!!!
 */

/* global SidebarConfig */
class RequestSidebar {

    // Special constructor method
    constructor(c) {
        this.headerSelector = '.sb-head';
        this.containerSelector = '.sb-content';
        this.footerSelector = '.sb-footer';
        var cl = ('rt' + crc32(c.elem.attr('id')));
        this.id = cl;
        this.elem = c.elem;
        this.header = $(c.elem).find(this.headerSelector);
        this.footer = $(c.elem).find(this.footerSelector);
        this.container = $(c.elem).find(this.containerSelector);

        this.t = $(c.elem);

        c.elem.addClass(cl);
        this.header.addClass(cl);
        this.footer.addClass(cl);
        this.container.addClass(cl);
    }
    setContainer(htm) {
        this.container.html(htm)
    }
    setHeader(htm) {
        let header = this.header;
        header.children().first().html(htm)
    }
    setFooter(htm) {
        this.footer.html(htm)
    }
    setStyle(conf) {
        if (conf === undefined) {
            return;
        }
        this.elem.css(conf);
    }
    // ###-правка
    close(name) {
        var nameSelector = '.js-' + name + '';
        $(nameSelector).removeClass('is-active');
        this.t.addClass(rt.hiddenClass())
    }
    // ###-правка
    open(name) {
        var nameSelector = '.js-' + name + '';
        if ($(nameSelector).hasClass('is-active')) {
            $(nameSelector).removeClass('is-active');
            this.close();
            return
        }
        $(nameSelector).addClass('is-active');

        var zarray = [];
        $.each(rt.collection(), function (i, index) {
            var container = (index);
            let   zindex = parseInt($(container.t).css('z-index'));
            zarray.push(zindex);
        });

        let  maxz = Math.max.apply(null, zarray);
        this.t.css('z-index', maxz + 2);
        this.t.removeClass(rt.hiddenClass())
    }
    pjaxElement() {
        return '.' + this.container.attr('class').split(' ').join(".");
    }
}
