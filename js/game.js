var game = (function () {

    var initialNumberOfPieces = 4,
        currentNumberOfPieces,
        piecesToGuess = 1,

        startGame = function (config) {
            if (config && config.numberOfPieces) {
                currentNumberOfPieces = config.numberOfPieces;
            } else {
                currentNumberOfPieces = initialNumberOfPieces;
            }
        },

        currentPieces = [],

        getPieces = function () {
            var i,
                pieces = [];

            for (i = 0; i < currentNumberOfPieces; i++) {
                pieces.push({});
            }
            getRandomPieces(pieces);

            currentPieces = pieces;
            return pieces;
        },

        getCurrentPieces = function () {
            return currentPieces;
        },
        getRandomPieces = function (pieces) {
            piecesToGuess = calculatePiecesToAdd(pieces.length);

            for (i = 0; i < piecesToGuess; i++) {
                var randomNumber = randomizePiecesToGuess(pieces.length);
                while (pieces[randomNumber].toGuess === true) {
                    randomNumber = randomizePiecesToGuess(pieces.length);
                }
                pieces[randomNumber].toGuess = true;
            }

            return pieces;
        },
        calculatePiecesToAdd = function (piecesToGuess) {
            return Math.floor(piecesToGuess / 2 - 1);
        },

        randomizePiecesToGuess = function (length) {
            return Math.floor(Math.random() * length);
        };




  ;

    return {
        'startGame': startGame,
        'getPieces': getPieces,
        'calculatePiecesToAdd': calculatePiecesToAdd,
        'getCurrentPieces': getCurrentPieces

    }


}


());
