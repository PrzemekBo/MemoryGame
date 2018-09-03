var game = (function () {
    var startNumberPieces = 4,
        currentNumberOfPieces,
        piecesToFind = 1,
        findeedPieces = 0,
        numberOfFail = 0,
        possibleNumberOfMistakes = 0,
        numberOfShots = 0,
        accuracy = 0,
        startGame = function (config) {
            if (config && config.numberOfFail) {
                possibleNumberOfMistakes = config.numberOfFail;
            }
            if (config && config.numberOfPieces) {
                currentNumberOfPieces = config.numberOfPieces;
            } else {
                currentNumberOfPieces = startNumberPieces;
            }
            findeedPieces = 0;
        },

        currentPieces = [],

        getPieces = function () {
            var i,
                pieces = [];
            for (i = 0; i < currentNumberOfPieces; i++) {
                pieces.push({});
            }

            randomizePieces(pieces);

            currentPieces = pieces;
            return pieces;
        },

        getCurrentPieces = function () {
            return currentPieces;
        },

        randomizePieces = function (pieces) {
            piecesToFind = calculatePiecesToFind(pieces.length);
            var i, randomNumber
            for (i = 0; i < piecesToFind; i++) {
                randomNumber = randomizePiecesToFind(pieces.length);
                while (pieces[randomNumber].toFind === true) {
                    randomNumber = randomizePiecesToFind(pieces.length);
                }
                pieces[randomNumber].toFind = true;
            }

            return pieces;
        },

        calculatePiecesToFind = function (currentPieces) {
            return Math.floor(currentPieces / 2 - 1);
        },

        randomizePiecesToFind = function (length) {
            return Math.floor(Math.random() * length);
        },

        checkClickedPiece = function (index) {
            numberOfShots++;
            if (currentPieces[index].toFind === true) {
                findeedPieces++;
                currentPieces[index].toFind = false;
                return true;
            }

            numberOfFail++;
            return false;
        },

        checkIfGameCanBeContinued = function () {
            var canBeContinued = possibleNumberOfMistakes >= numberOfFail;
            if (!canBeContinued) {
                numberOfShots = 0;
            }
            return possibleNumberOfMistakes >= numberOfFail;
        },

        getAccuracy = function () {
            accuracy = Math.round((numberOfShots - numberOfFail) * 100) / numberOfShots;
            if (numberOfShots === 0) {
                accuracy = 0;
            }
            return accuracy;
        },

        getCurrentNumberOfPieces = function () {
            return currentNumberOfPieces;
        },

        checkIfAllPiecesFinded = function () {
            return findeedPieces === calculatePiecesToFind(currentNumberOfPieces);
        },

        resetNumberOfFails = function () {
            numberOfFail = 0;
        },

        getNumberOfFail = function () {
            return numberOfFail;
        },
        resetNumberOfShots = function () {
            numberOfShots = 0;
        };

    return {
        'startGame': startGame,
        'getPieces': getPieces,
        'calculatePiecesToFind': calculatePiecesToFind,
        'getCurrentPieces': getCurrentPieces,
        'checkClickedPiece': checkClickedPiece,
        'checkIfAllPiecesFinded': checkIfAllPiecesFinded,
        'getCurrentNumberOfPieces': getCurrentNumberOfPieces,
        'checkIfGameCanBeContinued': checkIfGameCanBeContinued,
        'resetNumberOfFails': resetNumberOfFails,
        'getNumberOfFail': getNumberOfFail,
        'getAccuracy': getAccuracy,
        'resetNumberOfShots': resetNumberOfShots
    }
})();