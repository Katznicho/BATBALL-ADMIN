import { StyleSheet, Text, View , SafeAreaView, ScrollView} from 'react-native'
import React ,{useState , useEffect}from 'react'
import moment from 'moment';
import ReviewTypes from '../../../../components/ReviewTypes';

const Stats = () => {
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
    <SafeAreaView>
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReviewTypes name="Stats" data={details} />
      
    </ScrollView>
  </SafeAreaView>
  )
}

export default Stats

const styles = StyleSheet.create({})