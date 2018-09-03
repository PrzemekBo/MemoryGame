var controller = function () {
    var startGame = function () {
            var startNumberPieces = view.getStartNumberPieces(),
                possibleNumberOfMistakes = view.getNumberOfFail();

            game.startGame({
                numberOfPieces: startNumberPieces,
                numberOfFail: possibleNumberOfMistakes
            });

            view.generatePieces(game.getPieces());
            view.showNumberOfPieces(game.getCurrentNumberOfPieces());
            view.showNumberOfPiecesToFind(game.calculatePiecesToFind(game.getCurrentNumberOfPieces()));
            view.highlightPieces(game.getCurrentPieces());
        },

        clickOnPiece = function (i) {
            var clickedPiece = game.checkClickedPiece(i);
            view.clickOnPiece(i, clickedPiece);
            if (game.checkIfAllPiecesFinded()) {
                view.blockAllElements();
                setTimeout(function () {
                    addPiece();
                }, 1000);
            }

            if(!clickedPiece){
                view.setNumberOfFail(game.getNumberOfFail());
                if(!game.checkIfGameCanBeContinued()){
                    view.blockAllElements();
                    setTimeout(function () {
                        view.showNumberOfPieces(4);
                        game.resetNumberOfFails();
                        view.setNumberOfFail(game.getNumberOfFail());
                        startGame();
                    }, 1000)
                }
            }

            view.setAccuracy(game.getAccuracy());
        },

        addPiece = function () {
            view.showNumberOfPieces(game.getCurrentNumberOfPieces() + 1);
            startGame();
        },

        restartGame = function () {

            view.showNumberOfPieces(4);
            this.startGame();

        };

    return {
        'startGame': startGame,
        'addPiece': addPiece,
        'clickOnPiece': clickOnPiece,
        'restartGame': restartGame
    }
}();
