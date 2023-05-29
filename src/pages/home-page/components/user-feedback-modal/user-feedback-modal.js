import Swal from 'sweetalert2';
import { UserFeedbackComponent } from '../user-feedback-component/user-feedback-component';

export const UserFeedbackModal = () => {
  let userFeedbackModalClosedTimestamp = localStorage.getItem(
    'userFeedbackModalClosedTimestamp'
  );

  if (userFeedbackModalClosedTimestamp) {
    const threeDaysInMiliseconds = 3 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const threeDaysAgo = currentDate.getTime() - threeDaysInMiliseconds;
    if (userFeedbackModalClosedTimestamp >= threeDaysAgo) {
      return;
    }
  }

  Swal.fire({
    template: '#user-feedback-modal',
    showConfirmButton: false,
    width: '492px',
    padding: 0,
    customClass: {
      container: 'user-feedback-modal',
    },
    background: 'var(--background-color)',
    color: 'var(--on-background-color)',
    showCloseButton: true,
    allowEnterKey: false,
    closeButtonHtml: '<img src="/assets/icons/close-icon.svg" alt="X" />',
    didClose: () => {
      userFeedbackModalClosedTimestamp = Date.now();
      // localStorage.setItem('userFeedbackModalClosedTimestamp', Date.now());
    },
  });
  UserFeedbackComponent();
};
