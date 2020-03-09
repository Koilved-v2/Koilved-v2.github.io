/* 
 * Gonnyh Ivan
 * sinelnikof88@gmail.com
 * Developing  by Yii
 * Each line should be prefixed with  * 
 */

var SidebarConfig = function (elem, _pos) {
    let _position = (_pos != undefined) ? _pos : {
        top: ''
    }

    return {
        elem: elem,
        position: _position
    }
}
