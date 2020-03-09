export function startLines() {
    let line = $('.js-line');
    let startMainLine = $('.custom-table__start-main-line');
    let endMainLine = $('.custom-table__end-main-line');
    let startPosition = Number(startMainLine.closest('tr').attr('data-start-main-line'));
    let endPosition = Number(endMainLine.closest('tr').attr('data-end-main-line'));
    let getNumberBetweenStartEnd = startPosition - endPosition - 1;
    let count = 0;
    let arrayTrBetweenStartEnd = [];
    let stateEach = false;
    let getElementBetweenStartEnd = line.find('tr').each((i, tr) => {
        let $tr = $(tr);
        if ($tr.attr('data-start-main-line')) {
            stateEach = true
        }
        if ($tr.attr('data-end-main-line')) {
            stateEach = false
        }
        if (stateEach) {
            count++
        } else {
            return
        }
        if (count < endPosition && count !== startPosition) {
            arrayTrBetweenStartEnd.push($tr.innerHeight())
        }
    });
    count = 0;
    let startSecondaryLine = $('.custom-table__start-secondary-line');
    let endSecondaryLine = $('.custom-table__end-secondary-line');
    let startPositionSecondary = Number(startSecondaryLine.closest('tr').attr('data-start-secondary-line'));
    let endPositionSecondary = Number(endSecondaryLine.closest('tr').attr('data-end-secondary-line'));
    let arrayTrBetweenStartEndSecondary = [];
    let getElementBetweenStartEndSecondary = line.find('tr').each((i, tr) => {
        let $tr = $(tr);
        if ($tr.attr('data-start-secondary-line')) {
            stateEach = true
        }
        if ($tr.attr('data-end-secondary-line')) {
            stateEach = false
        }
        if (stateEach) {
            count++
        } else {
            return
        }
        if (count < endPositionSecondary && count !== startPositionSecondary) {
            arrayTrBetweenStartEndSecondary.push($tr.innerHeight())
        }
    });
    let summHeight = arrayTrBetweenStartEnd.reduce((a, b) => a + b, 0);
    let summHeightSecondary = arrayTrBetweenStartEndSecondary.reduce((a, b) => a + b, 0);

    let deltaStart = 9 + 19;
    let deltaEnd = 9 + 8 + 19;
    startMainLine.css('height', `${summHeight + deltaStart + deltaEnd}px`);
    startSecondaryLine.css('height', `${summHeightSecondary + deltaStart + deltaEnd}px`);
}