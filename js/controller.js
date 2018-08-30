var controller = function () {
    var startGame = function () {
        var initialNumberOfPieces = view.getInitialNumberOfPieces();

        view.resetPieces();

        game.startGame({
            numberOfPieces: initialNumberOfPieces
        });

        view.generatePieces(game.getPieces());
        view.highlight()

    };

    var addNewPiece = function () {
        view.addNewPiece()

    };

    var resetGame = function () {
        view.resetPieces();

    };

    var highlight = function () {
        startGame();
    };



    return {
        'startGame': startGame,
        'highlight': highlight,
        'addNewPiece': addNewPiece,
        'resetGame': resetGame
    }
}();
