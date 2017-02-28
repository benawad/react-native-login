import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';

export default class AppContainer extends React.Component {
  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <StatusBar />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
