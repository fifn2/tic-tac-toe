window.addEventListener('load', () => {
  // Determine whether you are going first
  const humanTurnFirst = false;

  const getLayout = () => {
    // Array of buttons ordered from top-left to bottom right
    const buttons = [
      document.getElementsByClassName('corner-top-left')[0],
      document.getElementsByClassName('edge-top')[0],
      document.getElementsByClassName('corner-top-right')[0],
      document.getElementsByClassName('edge-left')[0],
      document.getElementsByClassName('center-button')[0],
      document.getElementsByClassName('edge-right')[0],
      document.getElementsByClassName('corner-bottom-left')[0],
      document.getElementsByClassName('edge-bottom')[0],
      document.getElementsByClassName('corner-bottom-right')[0],
    ];
    const layout = [];
    buttons.forEach((button) => {
      if (!button) { return; }
      layout.push(button.innerText);
    });
    return layout;
  };

  const computerTurn = (turnNumber, layout, previous, localHumanTurnFirst) => {
    const autoClick = (button) => {
      const $turn = document.getElementsByClassName('turn')[0];
      if (!button || button.disabled) {
        return;
      }

      $turn.innerText = 'Not your turn yet...';
      const $allButtons = [...document.getElementsByClassName('button')];
      const $allDisableableButtons = $allButtons.filter(
        element => element !== button && !element.disabled,
      );
      $allDisableableButtons.forEach((disableableButton) => {
        const thisButton = disableableButton;
        thisButton.disabled = true;
      });
      button.focus();
      setTimeout(() => {
        button.click();
        $allDisableableButtons.forEach((disableableButton) => {
          const thisButton = disableableButton;
          thisButton.disabled = false;
        });
        $turn.innerText = 'Try clicking an empty space.';
      }, 500);
    };
    const $squares = [...document.getElementsByClassName('button')];
    const $edges = [
      document.getElementsByClassName('edge')[0],
      document.getElementsByClassName('edge')[1],
      document.getElementsByClassName('edge')[2],
      document.getElementsByClassName('edge')[3],
    ];
    const $corners = [
      document.getElementsByClassName('corner')[0],
      document.getElementsByClassName('corner')[1],
      document.getElementsByClassName('corner')[2],
      document.getElementsByClassName('corner')[3],
    ];
    const identifyDiagonal = (corner) => {
      const indexOfFilledOutCorner = $corners.indexOf(corner);
      if (indexOfFilledOutCorner === 0) {
        return $corners[3];
      }
      if (indexOfFilledOutCorner === 1) {
        return $corners[2];
      }
      if (indexOfFilledOutCorner === 2) {
        return $corners[1];
      }
      return $corners[0];
    };

    const $center = document.getElementsByClassName('center-button')[0];
    /* If the computer is going first,
    the computer plays a random corner */
    if (!localHumanTurnFirst) {
      if (turnNumber === 1) {
        const randomBelow4 = Math.floor(Math.random() * 4);
        const randomCorner = $corners[randomBelow4];
        autoClick(randomCorner);
      // Computers second turn
      } else if (turnNumber === 2) {
        if (
          $corners.some(corner => !corner)
          || $squares
            .filter(
              square => square.innerText === 'X',
            ).length === 2
        ) { return; }
        // O did not play the center square
        if (previous !== $center) {
          /* The corner previously played by X,
          determined as the top left most one to be filled out with an X. */
          const filledOutCorner = $corners.filter(
            corner => corner.innerText === 'X',
          )[0];
          /* The index of the filled out corner in the array of corners,
          which is sorted from top left to bottom right */
          const indexOfFilledOutCorner = $corners.indexOf(filledOutCorner);
          // The corner diagonal to the one filled out
          const diagonalCorner = identifyDiagonal(filledOutCorner);
          // An array of corners not diagonal to the one filled out
          // Includes filledOutCorner
          const cornersExcludingDiagonal = $corners.filter(
            corner => corner !== diagonalCorner,
          );
          // Array of empty corners excluding the one diagonal to
          // Does *not* include filled out corner
          const unfilledCornersExcludingDiagonal = cornersExcludingDiagonal.filter(
            corner => corner.innerText === 'Empty',
          );
          // The filled out corner is the top left
          if (indexOfFilledOutCorner === 0) {
            // The adjacent edges to the top left corner are:
            // The top and left edges
            const cornersEdges = [$edges[0], $edges[1]];
            // If the top edge is filled out,
            if (cornersEdges[0].innerText === 'O') {
              // Fill out the bottom left corner
              autoClick(unfilledCornersExcludingDiagonal[1]);
            // If the left edge is filled out,
            } else if (cornersEdges[1].innerText === 'O') {
              // Fill out the top right corner
              autoClick(unfilledCornersExcludingDiagonal[0]);
            /* Otherwise, if both of the edges are filled out,
              Flip a coin to determine which adjacent corner to go onto.
             */
            } else {
              autoClick(unfilledCornersExcludingDiagonal[
                Math.floor(Math.random() * unfilledCornersExcludingDiagonal.length)
              ]);
            }
          // The filled out corner is the top right
          } else if (indexOfFilledOutCorner === 1) {
            // The adjacent edges to the top right corner are:
            // The top and right edges
            const cornersEdges = [$edges[0], $edges[2]];
            // If the top edge is filled out,
            if (cornersEdges[0].innerText === 'O') {
              // Fill out the bottom right corner
              autoClick(unfilledCornersExcludingDiagonal[1]);
            // If the right edge is filled out,
            } else if (cornersEdges[1].innerText === 'O') {
              // Fill out the top left corner
              autoClick(unfilledCornersExcludingDiagonal[0]);
            /* Otherwise, if both of the edges are filled out,
              Flip a coin to determine which adjacent corner to go onto.
             */
            } else {
              autoClick(unfilledCornersExcludingDiagonal[
                Math.floor(Math.random() * unfilledCornersExcludingDiagonal.length)
              ]);
            }
          // The filled out corner is the bottom left
          } else if (indexOfFilledOutCorner === 2) {
            // The adjacent edges to the bottom left corner are:
            // The left and bottom edges
            const cornersEdges = [$edges[1], $edges[3]];
            // If the left edge is filled out,
            if (cornersEdges[0].innerText === 'O') {
              // Fill out the bottom right corner
              autoClick(unfilledCornersExcludingDiagonal[1]);
            // If the bottom edge is filled out,
            } else if (cornersEdges[1].innerText === 'O') {
              // Fill out the top left corner
              autoClick(unfilledCornersExcludingDiagonal[0]);
            /* Otherwise, if both of the edges are filled out,
              Flip a coin to determine which adjacent corner to go onto.
             */
            } else {
              autoClick(unfilledCornersExcludingDiagonal[
                Math.floor(Math.random() * unfilledCornersExcludingDiagonal.length)
              ]);
            }
          // The filled out corner is the bottom right
          } else {
            // The adjacent edges to the bottom right corner are:
            // The right and bottom edges
            const cornersEdges = [$edges[2], $edges[3]];
            // If the right edge is filled out,
            if (cornersEdges[0].innerText === 'O') {
              // Fill out the bottom left corner
              autoClick(unfilledCornersExcludingDiagonal[1]);
            // If the bottom edge is filled out,
            } else if (cornersEdges[1].innerText === 'O') {
              // Fill out the top right corner
              autoClick(unfilledCornersExcludingDiagonal[0]);
            /* Otherwise, if both of the edges are filled out,
              Flip a coin to determine which adjacent corner to go onto.
             */
            } else {
              autoClick(unfilledCornersExcludingDiagonal[
                Math.floor(Math.random() * unfilledCornersExcludingDiagonal.length)
              ]);
            }
          }
        // O played the center square
        } else {
          /* The corner previously played by X,
          determined as the top left most one to be filled out with an X. */
          const filledOutCorner = $corners.filter(
            corner => corner.innerText === 'X',
          )[0];
          // The corner diagonal to the one filled out
          const diagonalCorner = identifyDiagonal(filledOutCorner);
          // Play the corner diagonal to the one one filled out
          autoClick(diagonalCorner);
        }
      } else if (turnNumber === 3) {
        // I really wanted to finish, but I had a deadline :(
        // eslint-disable-next-line no-use-before-define
        welcome(localHumanTurnFirst, 'thats all for now');
      }
    }
  };
  const addClickEvents = (localHumanTurnFirst, isHumanTurn, turnNumber) => {
    const humanLetter = localHumanTurnFirst ? 'X' : 'O';
    const computerLetter = localHumanTurnFirst ? 'O' : 'X';
    const $squares = [...document.getElementsByClassName('button')];
    $squares.forEach((square) => {
      const thisSquare = square;
      square.addEventListener('click', () => {
        if (isHumanTurn) {
          thisSquare.innerText = humanLetter;
          computerTurn(
            turnNumber,
            getLayout(),
            thisSquare,
            localHumanTurnFirst,
          );
          addClickEvents(localHumanTurnFirst, false, turnNumber);
        } else {
          thisSquare.innerText = computerLetter;
          if (turnNumber < 3) {
            addClickEvents(localHumanTurnFirst, true, turnNumber + 1);
          }
        }
        thisSquare.disabled = true;
      });
    });
  };
  const welcomeButton = (localHumanTurnFirst) => {
    const spawnSquares = () => {
      const $turn = document.getElementsByClassName('turn')[0];
      const $mainGame = document.getElementsByClassName('main-game')[0];
      $turn.innerText = 'Try clicking an empty space.';
      $mainGame.className = 'main-game dp-4 tic-tac-toe';
      $mainGame.setAttribute('aria-label', 'Tic-tac-toe grid');
      $mainGame.innerHTML = '<button class="button corner corner-top-left corner-top corner-left">Empty</button><button class="button edge edge-top">Empty</button><button class="button corner corner-top-right corner-top corner-right">Empty</button><button class="button edge edge-left">Empty</button><button class="button center-button">Empty</button><button class="button edge edge-right">Empty</button><button class="button corner corner-bottom-left corner-bottom corner-left">Empty</button><button class="button edge edge-bottom">Empty</button><button class="button corner corner-bottom-right corner-bottom corner-right">Empty</button>';
      if (!localHumanTurnFirst) {
        addClickEvents(false, false, 1);
        computerTurn(1, getLayout(), false, false);
      } else {
        addClickEvents(true, true, 0);
      }
    };
    const $welcomeButton = document.getElementsByClassName('start-button')[0];
    $welcomeButton.addEventListener('click', () => spawnSquares(localHumanTurnFirst));
  };

  const welcome = (localHumanTurnFirst, type) => {
    const $mainGame = document.getElementsByClassName('main-game')[0];
    const $turn = document.getElementsByClassName('turn')[0];
    $turn.innerText = type === 'welcome' ? 'Welcome!' : 'That\'s all for now folks.';
    $mainGame.className = 'main-game dp-4 welcome center';
    $mainGame.innerHTML = `
      <section class="center welcome-section">
        <h2 class="heading welcome-heading">
          ${type === 'welcome'
    ? `
      Welcome to unbeatable tic-tac-toe by
      <a href="https://github.com/fifn2">fifn2</a>!
    `
    : 'Hopefully someday I\'ll find the bug.'}
        </h2>
        <p class="paragraph welcome-text">
          ${type === 'welcome'
    ? 'Your turn will be second to the computer for a while, but that might change in the future.'
    : 'Right now, the computer only knows how to go this far. This may change in the future.'}
          Have fun and feel free to look at the
          <a href="https://github.com/fifn2/tic-tac-toe" rel="external">source code</a>
          if you're curious, and if you find any issues, or have any suggestions,
           I'd really appreciate you taking the time to tell me
          <a href="https://github.com/fifn2/tic-tac-toe/issues/new" rel="external">here</a>.
          ${type === 'welcome' ? 'Without further adieu,' : 'If you feel like it,'}
          <strong class="bold">
            ${type === 'welcome'
    ? 'press the "Start" button to play.'
    : 'reload the page to start again.'}
          </strong>
        </p>
      </section>
      ${type === 'welcome'
    ? `
        <div role="none" class="center start-button-container">
          <button class="start-button button">Start</button>
        </div>
      `
    : ''}
    `;
    if (type !== 'welcome') { return; }
    welcomeButton(localHumanTurnFirst);
  };

  welcome(humanTurnFirst, 'welcome');
});
