var view = function () {
    var getStartNumberPieces = function () {
            return parseInt(document.getElementById('numberOfPieces').innerText);
        },

        showNumberOfPieces = function (numberOfPieces) {
            document.getElementById('numberOfPieces').textContent = numberOfPieces.toString();
        },

        showNumberOfPiecesToFind = function (number) {
            document.getElementById('numberToFinds').textContent = number.toString();
        },

        getTimeOfHighlight = function () {
            return document.getElementById('highlightTime').value;
        },

        getNumberOfFail = function () {
            return document.getElementById('numberOfFail').value;
        },

        setNumberOfFail = function (mistakes) {
            document.getElementById('fails').textContent = mistakes;
        },

        setAccuracy = function (accuracy) {
            document.getElementById('accuracy').textContent = accuracy;
        },

        generatePieces = function (pieces) {
            resetPieces();
            var i;
            for (i = 0; i < pieces.length; i++) {
                var piece = document.createElement("div");
                piece.setAttribute('id', i);
                piece.classList.add('piece');
                document.getElementById('pieces').appendChild(piece);
            }
        },

        resetPieces = function () {
            var pieces, i;
            pieces = document.getElementsByClassName('piece');
            i = pieces.length;
            while (i--) {
                pieces[i].parentNode.removeChild(pieces[i]);

            }
        },

        highlightPieces = function (pieces) {
            var i;
            for (i = 0; i < pieces.length; i++) {
                if (pieces[i].toFind === true) {
                    document.getElementById(i).classList.add('highlight');
                }
            }
            blockAllElements();
            blackoutPieces(pieces);
        },

        blockAllElements = function () {
            document.getElementById('pieces').classList.add('disabled');
            document.getElementById('container').classList.add('disabled');
        },

        blackoutPieces = function (pieces) {
            setTimeout(function () {
                var i;
                for (i = 0; i < pieces.length; i++) {
                    if (pieces[i].toFind === true) {
                        document.getElementById(i).classList.remove('highlight');
                    }
                }
                unblockAllElements();
            }, 1000 * getTimeOfHighlight());


            setAttributeForElement();
        },

        unblockAllElements = function () {
            document.getElementById('pieces').classList.remove('disabled');
            document.getElementById('container').classList.remove('disabled');
        },

        setAttributeForElement = function () {

            var children = document.getElementById('pieces').children;
            var i;
            for (i = 0; i < children.length; i++) {
                document.getElementById(i).setAttribute("onclick", "controller.clickOnPiece(" + i + ")");
            }
        },

        clickOnPiece = function (i, find) {
            if (find) {
                document.getElementById(i).classList.add('correctPiece');
            }
            else {
                document.getElementById(i).classList.remove('correctPiece');
                document.getElementById(i).classList.add('wrongPiece');
            }
        };

    return {
        'getStartNumberPieces': getStartNumberPieces,
        'generatePieces': generatePieces,
        'highlightPieces': highlightPieces,
        'showNumberOfPieces': showNumberOfPieces,
        'showNumberOfPiecesToFind': showNumberOfPiecesToFind,
        'clickOnPiece': clickOnPiece,
        'blockAllElements': blockAllElements,
        'getNumberOfFail': getNumberOfFail,
        'setNumberOfFail': setNumberOfFail,
        'setAccuracy': setAccuracy
    }
}();


