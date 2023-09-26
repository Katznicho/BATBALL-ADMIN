import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { generalstyles } from '../generalstyles/generalstyles';

const ReviewTypes = ({ data, name }: any) => {
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.containerStyle, generalstyles.flexStyles]}>
      {data.map(
        (
          detail: {
            name:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
            screen: any;
          },
          index: React.Key | null | undefined,
          array: string | any[],
        ) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabStyle,
              generalstyles.centerContent,
              {
                backgroundColor:
                  name === detail.name
                    ? theme.colors.buttonColor
                    : theme.colors.darkBlack,
                marginLeft: index === 0 ? -5 : 10,
                marginRight: index === array.length - 1 ? -5 : 0,
                paddingHorizontal: index === array.length - 1 ? 5 : 0,
              },
            ]}
            onPress={() => navigation.navigate(detail.screen)}
          >
            <Text
              style={{
                color:
                  name === detail.name
                    ? theme.colors.primary
                    : theme.colors.white,
                fontSize: 15,
                fontWeight: 'bold',
                paddingHorizontal: index === array.length - 1 ? 5 : 0,
              }}
            >
              {detail.name}
            </Text>
          </TouchableOpacity>
        ),
      )}
    </View>
  );
};

export default ReviewTypes;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.colors.darkBlack,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
    justifyContent: 'space-evenly',
  },
  tabStyle: {
    height: 40,
    width: 100,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
