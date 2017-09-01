// Common react native component - iOS + Android

/*eslint-disable no-unused-vars*/
// React
import React from 'react';
import PropTypes from 'prop-types';

// React native UI
import { StyleSheet, Text, View } from 'react-native';

const WesternSuburbsShow = () => {

  return (
    <View style={styles.container}>
      <View style={styles.element}>
        <Text style={styles.box}>
          Hello Western-suburbs!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  element: {
    paddingTop: 30
  },
  box: {
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15
  }
});

WesternSuburbsShow.propTypes = {
};

export default WesternSuburbsShow;
