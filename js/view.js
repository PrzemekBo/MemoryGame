var view = (function () {

    var numberOfPieces = 4;

    var getInitialNumberOfPieces = function () {
       return numberOfPieces;
    };

    var addNewPiece  = function () {
        return numberOfPieces++;
    };

    var viewPieces;

    var generatePieces=function (pieces) {
        var i,piece;
        viewPieces = [];
        for (i = 0; i < pieces.length; i++) {
            piece = document.createElement("div");
            piece.classList.add('piece');
            document.getElementById('pieces').appendChild(piece);
            viewPieces.push(piece);
        }
    };

    var resetPieces = function () {
        var pieces,i;
         pieces = document.getElementsByClassName('piece');
         i = pieces.length;
        while (i--) {
            pieces[i].parentNode.removeChild(pieces[i]);

        }
        numberOfPieces =4;
    };

    var addEventListenersToPieces = function () {
        var children = document.getElementById('pieces').children;
        var i;
        for (i = 0; i < children.length; i++) {
            document.getElementById(i).setAttribute("onclick", "controller.clickOnPiece(" + i + ")");
        }
    };

    var blackoutPieces = function (pieces) {
        setTimeout(function () {
            var i;
            for (i = 0; i < pieces.length; i++) {
                if (pieces[i].toGuess === true) {
                    document.getElementById(i).classList.remove('highlight');
                }
            }
        }, 1000 * getTimeOfHighlight());

        addEventListenersToPieces();
    };



    var clickOnPiece = function (i, guess) {

        if(guess){
            document.getElementById(i).classList.add('correctPiece');
        }
        else{
            document.getElementById(i).classList.add('wrongPiece');
        }


    };




    return {
        'getInitialNumberOfPieces': getInitialNumberOfPieces,
        'generatePieces':generatePieces,
        'resetPieces':resetPieces,
        'addNewPiece':addNewPiece,
        'clickOnPiece':clickOnPiece


    }


})();
