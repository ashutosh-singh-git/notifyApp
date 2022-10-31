import {SafeAreaView, ScrollView} from 'react-native';
import {Item} from '../components';

function Home({data, onPress}) {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" bounces>
        {data &&
          data.map((item, index) => (
            <Item item={item} key={index ? index : 0} onPress={onPress} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
