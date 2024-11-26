import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import useOptions from './hooks/useOptions';

const NavButtons = () => {
  const options = useOptions();
  const { width } = Dimensions.get('window');
  const isLargeScreen = width >= 768;

  return (
    <View
      style={[
        styles.navContainer,
        { flexDirection: isLargeScreen ? 'row' : 'column' },
      ]}
    >
      {options.map((option, index) => (
        <TouchableOpacity key={index} style={styles.navButton}>
            <option.icon width={25} height={25} />
            
          {isLargeScreen ? (
            <Text style={styles.navText}>{option.name}</Text>
          ) : (
            <Text style={[styles.navText, { fontSize: 22 }]}>
              {option.name}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    alignItems: 'center',
    gap: 15,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  navText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'green',
    fontWeight: '500',
  },
});

export default NavButtons;
