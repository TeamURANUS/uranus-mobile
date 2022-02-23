export function showDangerPopup({Popup, title, textBody}) {
  Popup.show({
    type: 'Danger',
    title: title,
    button: true,
    textBody: textBody,
    buttonText: 'Okay',
    callback: () => Popup.hide(),
  });
}

export function showWarningPopup({Popup, title, textBody}) {
  Popup.show({
    type: 'Warning',
    title: title,
    button: true,
    textBody: textBody,
    buttonText: 'Okay',
    callback: () => Popup.hide(),
  });
}

export function showSuccessPopup({Popup, title, textBody}) {
  Popup.show({
    type: 'Success',
    title: title,
    button: true,
    textBody: textBody,
    buttonText: 'Okay',
    callback: () => Popup.hide(),
  });
}
