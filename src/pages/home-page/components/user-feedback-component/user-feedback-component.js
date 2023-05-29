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

  const disableMultiRating = (clickedTile) => {
    allRatesTiles.forEach((singleTile) => {
      if (singleTile !== clickedTile) {
        singleTile.removeAttribute('data-selected');
      }
    });
  };

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
};
