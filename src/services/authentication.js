import {showDangerPopup, showSuccessPopup, showWarningPopup} from './popup';
import {firebase} from '@react-native-firebase/auth';
import {Popup} from 'popup-ui';

export function checkPasswordMatch({Popup, password, confirmationPassword}) {
  if (password.length <= 8) {
    showWarningPopup({
      Popup,
      title: 'Password is to short',
      textBody: 'Password should be longer than 8 characters',
    });
    return false;
  }
  if (password !== confirmationPassword) {
    showWarningPopup({
      Popup,
      title: 'Type Error',
      textBody: 'Passwords do not match',
    });
    return false;
  }
  return true;
}

export async function checkAndRegisterUser({
  Popup,
  email,
  password,
  confirmationPassword,
  registerUser,
  navigation,
}) {
  const isMatch = checkPasswordMatch({
    password: password,
    confirmationPassword: confirmationPassword,
    Popup,
  });
  if (isMatch) {
    await registerUser({
      email: email,
      password: password,
      navigation: navigation,
    });
  }
}

export function reauthenticate(currentPassword, user) {
  const cred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword,
  );
  return user.reauthenticateWithCredential(cred);
}

// Changes user's password...
export function onChangePasswordPress(user, newPassword, currentPassword) {
  reauthenticate(currentPassword, user)
    .then(() => {
      user
        .updatePassword(newPassword)
        .then(() => {
          showSuccessPopup({
            Popup,
            title: 'Password changed succesfully',
            textBody: '',
          });
        })
        .catch(error => {
          showDangerPopup({
            Popup,
            title: 'Password change failed',
            textBody: error.message,
          });
        });
    })
    .catch(error => {
      showDangerPopup({
        Popup,
        title: 'Password change failed',
        textBody: error.message,
      });
    });
}
