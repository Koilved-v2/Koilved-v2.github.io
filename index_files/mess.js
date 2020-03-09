/* 
 Обект для работы с таблицей заявок
 первый выполняеться iinit по умолчанию автоматом
 класс юзаеться как статичный!!!
 */

/* global RequestSidebar */

class WeSo {

    constructor(url) {
        this._ws = new WebSocket(url);
    }
    onOpen = function () {
        this._ws.onopen = function () {
//            $.notify({message: 'соединение с сервером установлено...'}, {type: 'warning'});
        };
    }
    onClose = function () {
        this._ws.onclose = function () {
//            $.notify({message: 'соединение с сервером потеряно...'}, {type: 'error'});

        };
    }
    onMessage = function () {
        let _this = this;
//        this._ws.onmessage = function (evt) {
//            let js = JSON.parse(evt.data);
//            console.log(evt.data);
//////            if (js.type === 'message') {
////                $.notify({message: 'Сообщение: ' + js.message}, {type: 'info'});
//////            }
//////            if (js.type === 'requestTableState') {
//////                $.notify({message: 'Сообщение: ' + js.message}, {type: 'info'});
//////            }
//        };
        this._ws.onmessage = function (event) {
            let   msg = JSON.parse(event.data);
            console.log(msg);
            switch (msg.event)
            {
                // сам включился
                case 'connected':
                    console.log(1)
                    break;
                    // подключился другой пользователь    
                case 'userJoined':
                    console.log(2)
                    break;
                case 'changeRequest':
                    console.log('!!!!!!!!!!!!')
                    _this.lockedRequest(msg);
                    break;
                case 'message':
                    $.notify({message: 'Сообщение: ' + msg.text}, {type: 'info'});
                    break;
                default:
                    break;
                    /**/
            }


        };
    }
    sendMessage = function (mess) {
        mess = JSON.stringify(mess);
        this._ws.send(mess)
    }
    lockedRequest = function (mess) {
        $('*[data-key="' + mess.key + '"]').attr('data-title', "Запись заблокированна");
        $('*[data-key="' + mess.key + '"]').attr('data-toggle', "tooltip-elem");
        $('*[data-key="' + mess.key + '"]').addClass('locked').prop('disabled', true);
        $('*[data-key="' + mess.key + '"] a').removeClass('subMenu')
        $('*[data-key="' + mess.key + '"] a').removeClass('addAtachmentButton')
        $('*[data-key="' + mess.key + '"] a').removeClass('sidebarLink')
        $('*[data-key="' + mess.key + '"] a').removeClass('filterLink')
        $('*[data-key="' + mess.key + '"] a').removeClass('filtred')
        $('*[data-key="' + mess.key + '"] a').removeAttr('href');

    }

}
//

//websoket.send({'event':'message','message':'asd'})