import * as React from 'react';
import DefaultBackground from '../../shared/defaultBackground';
import {StyleSheet, Text, View} from 'react-native';
import VerificationButton from '../../shared/buttons/verificationButton';
import RedButton from '../../shared/buttons/redButton';
import {useContext} from 'react';
import FireBaseContext from '../../context/fireBaseProvider';

function VerificationScreen({navigation}) {
  const {logoutUser, checkVerification} = useContext(FireBaseContext);

  return (
    <DefaultBackground>
      <Text style={styles.logoText}> Verify! </Text>

      <Text style={styles.infoText}>
        Verify your account by clicking the link in your email
      </Text>

      <View style={styles.bottomContainer}>
        <VerificationButton
          displayText="Verified, let me pass :)"
          onPress={() => checkVerification({navigation})}
        />
        <RedButton
          onPress={() => logoutUser({navigation})}
          displayText="Logout"
        />
      </View>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  logoText: {
    marginTop: '15%',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
  },
  infoText: {
    top: '50%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
  bottomContainer: {
    width: '80%',
    marginLeft: '10%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    padding: 10,
    top: '55%',
  },
});

export default VerificationScreen;
