import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertProps } from '../types/Alert';
const colors = {
  success: '#4BB543',
  error: '#FF3333',
  info: '#007bff',
};

const AlertMessage: React.FC<AlertProps> = ({ message, type = 'info', visible, onHide, duration = 2000 }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide]);

  if (!visible) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors[type] }]}> 
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    zIndex: 1000,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AlertMessage; 