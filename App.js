/**
 * CollabTask - Shared Task Management for Teams
 * 
 * Main App component with navigation and state management
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { registerRootComponent } from 'expo';
import SimpleApp from './src/screens/SimpleApp';

const App = () => {
  return (
    <View style={styles.container}>
      <SimpleApp />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

// Register the main component
registerRootComponent(App);
