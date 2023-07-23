import { View } from 'react-native';
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { theme as app_theme } from '../theme/theme';
import { IconButton } from 'react-native-paper';






const CalendarComponent = ({ 
  containerStyles, 
   markedDates, 
   handleDayPress,
    disableAllTouchEventsForDays,
    minDate

 }: any) => {

  return (
    <View>
      <Calendar
        // Collection of dates that have to be marked. Default = {}
        markingType="custom"
        markedDates={markedDates}
        style={containerStyles}
        // min data is today
        // minDate={new Date().toISOString().split('T')[0]}
        minDate={minDate}
        theme={theme}
        enableSwipeMonths={true}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={disableAllTouchEventsForDays}
        // disableAllTouchEventsForDays={disableTouchEventsForDays}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={direction => (
          <IconButton
            icon={direction === 'left' ? 'chevron-left' : 'chevron-right'}
            iconColor={app_theme.colors.white}
            size={25}
            containerColor={app_theme.colors.arraowBackGroundColor}
            style={{
              marginLeft: direction === 'left' ? -10 : 0,
              marginRight: direction === 'right' ? -10 : 0,
            }}
          />
        )}
        onDayPress={handleDayPress}
      />

    </View>
  );
};

export default CalendarComponent;

const theme = {
  backgroundColor: app_theme.colors.darkBlack,
  calendarBackground: app_theme.colors.darkBlack,
  textSectionTitleColor: '#b6c1cd',
  textSectionTitleDisabledColor: '#d9e1e8',
  selectedDayBackgroundColor: app_theme.colors.buttonColor,
  selectedDayTextColor: app_theme.colors.white,
  todayTextColor: app_theme.colors.white,
  dayTextColor: app_theme.colors.white,
  textDisabledColor: app_theme.colors.placeholder,
  dotColor: '#00adf5',
  selectedDotColor: '#ffffff',
  arrowColor: app_theme.colors.white,
  disabledArrowColor: '#d9e1e8',
  monthTextColor: app_theme.colors.white,
  indicatorColor: 'blue',
  textDayFontFamily: 'monospace',
  textMonthFontFamily: 'monospace',
  textDayHeaderFontFamily: 'monospace',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 15,
  textDayFontWeight: '900',
};
