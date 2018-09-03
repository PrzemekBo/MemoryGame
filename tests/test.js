describe('Game', function () {


    it('should have 4 pieces after game start', function () {
        var pieces;

        game.startGame();

        pieces = game.getPieces();

        expect(pieces.length).toBe(4);
    });

    it('one pieces should be to find after game start', function () {
        var piecesToFind;
        game.startGame();

        piecesToFind = findPiecesToFind(game.getPieces());

        expect(piecesToFind.length).toBe(1);
    });

    it('should start game with configured number of pieces', function () {
        var pieces,
            config = {
                numberOfPieces: 6
            };
        game.startGame(config);

        pieces = game.getPieces();

        expect(pieces.length).toBe(6);
    });

    
    it('should have start game witch 10 pieces', function () {
        var pieces,
            config = {
                numberOfPieces: 10
            };
        game.startGame(config);
        game.getPieces();


        pieces = game.getCurrentPieces();


        expect(pieces.length).toBe(10);
    });


    it('should calculate 2 pieces to find for 6 pieces', function () {
        var pieces,
            piecesToFind,
            config = {
                numberOfPieces: 6
            };
        game.startGame(config);

        game.getPieces();
        pieces = game.getCurrentPieces();
        piecesToFind = game.calculatePiecesToFind(pieces.length);
        expect(piecesToFind).toBe(2);
    });


    it('should calculate 10 current pieces', function () {
        var numberOfPieces,
            config = {
                numberOfPieces: 10
            };
        game.startGame(config);

        game.getPieces();
        numberOfPieces = game.getCurrentNumberOfPieces();
        expect(numberOfPieces).toBe(10);
    });


    it('should return false, because not all pieces finded', function () {
        var allPiecesFinded,
            config = {
                numberOfPieces: 10
            };
        game.startGame(config);

        game.getPieces();
        allPiecesFinded = game.checkIfAllPiecesFinded();
        expect(allPiecesFinded).toBe(false);
    });


    it('should return false, because piece is not to find', function () {
        var findedPiece,
            config = {
                numberOfPieces: 10
            };
        game.startGame(config);
        game.getPieces();
        while (game.checkClickedPiece(1)) {
            game.getPieces();
        }

        findedPiece = game.checkClickedPiece(1);
        expect(findedPiece).toBe(false);
    });


    it('should reset fails ', function () {
        var fails,
            config = {
                numberOfPieces: 12,
                numberOfFail: 4
            };
        game.startGame(config);
        game.resetNumberOfFails();
        fails = game.getNumberOfFail();

        expect(fails).toBe(0);
    });


    it('should fails be greater than 0, and accuracy should be lesser than 100', function () {
        var fails,
            accuracy,
            config = {
                numberOfPieces: 12,
                resetNumberOfFails: 4
            };
        game.startGame(config);

        fails = game.getNumberOfFail();
        while (fails <= 0) {
            game.getPieces();
            game.checkClickedPiece(1);
            fails = game.getNumberOfFail();
        }

        accuracy = game.getAccuracy();

        expect(fails).toBeGreaterThan(0);
        expect(accuracy).toBeLessThan(100);
    });

    it('should number of fail be greater than allowed number of fails', function () {
        var fails,
            config = {
                numberOfPieces: 12,
                numberOfFail: 4
            };
        game.startGame(config);

        fails = game.getNumberOfFail();
        while (game.checkIfGameCanBeContinued()) {
            game.getPieces();
            game.checkClickedPiece(0);
            fails = game.getNumberOfFail();
        }

        expect(fails).toBeGreaterThan(4);
    });


    it('should accuracy be 0 because number of shots reset', function () {
        var accuracy,
            config = {
                numberOfPieces: 12,
                numberOfMistakes: 4
            };
        game.startGame(config);

        game.getPieces();
        game.checkClickedPiece(0);
        game.checkClickedPiece(1);
        game.checkClickedPiece(2);
        game.resetNumberOfShots();
        accuracy = game.getAccuracy();

        expect(accuracy).toBe(0);
    });


    it('should mock methods and test controller startGame method', function () {

        var object = [{}, {}, {}, {}];
        spyOn(view, 'getStartNumberPieces').and.returnValue(4);
        spyOn(view, 'getNumberOfFail').and.returnValue(0);
        spyOn(game, 'startGame');
        spyOn(game, 'getPieces').and.returnValue(object);
        spyOn(view, 'generatePieces');
        spyOn(game, 'getCurrentNumberOfPieces').and.returnValue(4);
        spyOn(view, 'showNumberOfPieces');
        spyOn(game, 'calculatePiecesToFind').and.returnValue(1);
        spyOn(view, 'showNumberOfPiecesToFind');
        spyOn(game, 'getCurrentPieces').and.returnValue(object);
        spyOn(view, 'highlightPieces');

        controller.startGame();

        expect(game.startGame).toHaveBeenCalledWith({numberOfPieces: 4, numberOfFail: 0});
        expect(view.generatePieces).toHaveBeenCalledWith(object);
        expect(view.showNumberOfPieces).toHaveBeenCalledWith(4);
        expect(view.showNumberOfPiecesToFind).toHaveBeenCalledWith(1);
        expect(view.highlightPieces).toHaveBeenCalledWith(object);
    });


    it('should mock methods and test controller restartGame method', function () {


        var div = document.createElement("div");
        div.innerText = "";
        spyOn(document, "getElementById").and.returnValue(div);


        spyOn(view, 'showNumberOfPieces');
        spyOn(controller, 'startGame');

        controller.restartGame();

        expect(view.showNumberOfPieces).toHaveBeenCalledWith(4);
        expect(controller.startGame).toHaveBeenCalled();

    });

    function findPiecesToFind(pieces) {
        return pieces.filter(function (piece) {
            return piece.toFind;
        });
    }
});

