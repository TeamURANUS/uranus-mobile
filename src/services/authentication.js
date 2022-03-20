import {showWarningPopup} from './popup';

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
