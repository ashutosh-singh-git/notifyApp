import {ScrollView, Text, View} from 'react-native';

function Details({item}) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" bounces>
      <View
        style={{
          padding: 15,
          marginBottom: 100,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', marginVertical: 4}}>
          {item?.title}
        </Text>
        <Text style={{fontSize: 14, fontWeight: 'bold', marginVertical: 4}}>
          {item?.time_published}
        </Text>
        <Text style={{fontSize: 18, fontWeight: '500', marginVertical: 6}}>
          {item?.description}
        </Text>
      </View>
    </ScrollView>
  );
}

export default Details;
