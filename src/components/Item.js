import {Text, TouchableWithoutFeedback, View} from 'react-native';

export default function Item({item, onPress}) {
  return (
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 10,
          borderRadius: 10,
          borderWidth: 1,
          padding: 10,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item?.title}</Text>
        <Text style={{fontSize: 14, fontWeight: '500'}}>
          {item?.time_published}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
