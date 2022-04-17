import React from 'react';
import OptionsMenu from 'react-native-option-menu';
import MoreIcon from '../../assets/hamburger.png';
import {StyleSheet} from 'react-native';

export function GroupHeaderRight({route}) {
  const options = route.params.options.concat(['Cancel']);
  return (
    <OptionsMenu
      button={MoreIcon}
      buttonStyle={styles.headerButton}
      destructiveIndex={options.length - 1}
      options={options}
      actions={route.params.actions}
    />
  );
}

const styles = StyleSheet.create({
  headerButton: {
    height: 15,
    width: 15,
  },
});
