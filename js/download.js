// Save a page as a mime document
// TODO convert this into a class with a method addPart

var separator = '\n\n--=PLan=Part=';
var HEADER =
// TODO Date: Thu, 24 Jul 2014 15:28:29 +0100 RFC822
'Subject: Gel annotated in PLan\n' + 'MIME-Version: 1.0\n'
        + 'Content-Type: multipart/related;\n'
        + '    type="text/html"; charset=utf-8;\n'
        + '    boundary="=PLan=Part="\n' + '\n'
        + 'This is a multi-part message in MIME format.' + separator + '\n'
        + 'Content-Type: text/html;\n' + '    charset="Windows-1252"\n'
        + 'Content-Transfer-Encoding: 8bit\n' + 'Content-ID: PLan0\n' + '\n'
        + '<img src="cid:PLan1" />';
// TODO external part with css, icons, etc

// e.g. data:image/jpeg;base64,...
function toPart(dataUrl) {
    var type = dataUrl.substring(5, dataUrl.indexOf(';'));
    var encoding = dataUrl.substring(dataUrl.indexOf(';') + 1, dataUrl
            .indexOf(','));
    var data = dataUrl.substring(dataUrl.indexOf(',')); // could insert \ns

    return separator + '\n' + 'Content-Type: ' + type + '\n'
            + 'Content-Transfer-Encoding: ' + encoding + '\n'
            + 'Content-ID: <PLan1>\n\n' + data;
}

function save(element) {
    var text = HEADER
            + document.getElementById('rectangles').outerHTML
            + toPart(document.getElementById('canvasOne').toDataURL(
                    'image/jpeg')) + separator + '--';

    var blob = new Blob([ text ], {
        type : 'multipart/related'
    });
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, 'PLAn_Gel.eml');
    } else {
        element.href = window.URL.createObjectURL(blob);
    }
}

function valueToAttribute(element) {
    element.setAttribute('value', element.value);
    return true;
}
