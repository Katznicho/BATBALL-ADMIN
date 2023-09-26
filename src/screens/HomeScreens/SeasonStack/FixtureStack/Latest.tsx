import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React ,{useEffect, useState}from 'react'
import { ScrollView } from 'react-native'
import ReviewTypes from '../../../../components/ReviewTypes'
import { theme } from '../../../../theme/theme'
import moment from 'moment'

const Latest = () => {
    const [activeDetails, setActiveDetails] = useState<any[] | []>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessage] = useState(
      {
        id: 1,
        message: 'There are no active bookings yet',
        time: moment().format('DD/MM/YYYY'),
      },
    );
  
  
    const [details, setDetails] = useState([
      {
        name: 'LineUps',
        screen: 'LineUps',
      },
      {
        name: 'Stats',
        screen: 'Stats',
      },
      {
        name: 'Latest',
        screen: 'Latest',
      },
    ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReviewTypes name="Stats" data={details} />
      
    </ScrollView>
  </SafeAreaView>
  )
}

export default Latest

const styles = StyleSheet.create({})