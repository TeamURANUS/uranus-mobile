export function clearStackAndNavigate({navigation, screenName}) {
  navigation.reset({
    index: 0,
    routes: [{name: screenName}],
  });
}
