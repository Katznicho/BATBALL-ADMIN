import React from 'react';
import { Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { theme } from '../theme/theme';

const SearchComponent = ({
  searchStyles,
  icon,
  iconPressed,
  placeholder,
  value,
  onSearchChange,
}: any) => {
  return (
    <View>
      <Searchbar
        placeholder={placeholder}
        style={searchStyles}
        onChangeText={onSearchChange}
        inputStyle={{ color: theme.colors.primary }}
        icon={icon}
        onIconPress={iconPressed}
        iconColor={theme.colors.primary}
        autoCorrect={true}
        autoCapitalize="none"
        theme={{ colors: { primary: theme.colors.black } }}
        value={value}
        placeholderTextColor={theme.colors.placeholder}
        
      />
    </View>
  );
};

export default SearchComponent;
