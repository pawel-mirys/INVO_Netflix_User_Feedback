export const UserFeedbackComponent = () => {
  const userFeedbackComponent = document.querySelector(
    '.user-feedback-component'
  );

  const allRatesTiles = userFeedbackComponent.querySelectorAll(
    '.user-feedback-component__single-rate-tile'
  );

  const confirmButton = userFeedbackComponent.querySelector(
    '.user-feedback-component__confirm-button'
  );

  const explanationContainer = userFeedbackComponent.querySelector(
    '.user-feedback-component__explanation-container'
  );

  const explanationInput = userFeedbackComponent.querySelector(
    '.user-feedback-component__explanation-input'
  );

  const feedbackData = {
    userRating: null,
    userExplanation: null,
    isRated: false,
    isExplained: false,
  };

  const disableMultiRating = (clickedTile) => {
    allRatesTiles.forEach((singleTile) => {
      if (singleTile !== clickedTile) {
        singleTile.removeAttribute('data-selected');
      }
    });
  };

  const setUserExplanation = (e) => {
    let inputValue = null;
    inputValue = e.target.value;
    feedbackData.userExplanation = inputValue;

    if ((feedbackData.userExplanation = null || e.target.value === '')) {
      feedbackData.isExplained = false;
    } else {
      feedbackData.isExplained = true;
    }

    if (feedbackData.isRated && feedbackData.isExplained) {
      confirmButton.removeAttribute('disabled');
    } else {
      confirmButton.setAttribute('disabled', true);
    }
  };

  explanationInput.addEventListener('input', setUserExplanation);

  const setButtonState = (currentRating) => {
    currentRating
      ? confirmButton.removeAttribute('disabled')
      : confirmButton.setAttribute('disabled', true);
  };

  const afterRatingChange = (clickedTile) => {
    let currentRating = null;
    clickedTile.hasAttribute('data-selected')
      ? (currentRating = clickedTile.getAttribute('data-rate'))
      : (currentRating = null);
    feedbackData.userRating = currentRating;
    setButtonState(currentRating);
  };

  const addListenersToAllRatesTiles = (() => {
    allRatesTiles.forEach((singleTile) => {
      singleTile.addEventListener('click', () => {
        singleTile.toggleAttribute('data-selected');
        afterRatingChange(singleTile);
        disableMultiRating(singleTile);
      });
    });
  })();

  const confirmRating = () => {
    if (feedbackData.userRating) {
      explanationContainer.classList.remove('disabled');
      feedbackData.isRated = true;
      confirmButton.setAttribute('disabled', true);
    }
  };

  const addListenerToConfirmButton = (() => {
    confirmButton.addEventListener('click', () => {
      confirmRating();
    });
  })();
};
