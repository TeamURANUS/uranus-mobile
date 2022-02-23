import * as React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  useColorScheme,
  StyleSheet,
} from 'react-native';

function DefaultBackground(props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.container}
      resizeMode="cover">
      <SafeAreaView
        style={isDarkMode ? styles.areaViewDark : styles.areaViewLight}>
        {props.children}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  areaViewLight: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  areaViewDark: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

export default DefaultBackground;
