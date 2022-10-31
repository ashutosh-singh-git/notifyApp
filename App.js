import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Details, Home, SCREEN_HEIGHT, SCREEN_WIDTH} from './src';
import {firebase} from '@react-native-firebase/database';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [detailItem, setDetailItem] = useState({});

  useEffect(() => {
    setLoading(true);
    firebase
      .app()
      .database(
        'https://spotfin-app-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref('posts')
      .on('value', snapshot => {
        if (snapshot && snapshot.val()) {
          setData(snapshot.val());
        }
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.prompt(
        `${remoteMessage.notification.title}`,
        `${remoteMessage.notification.body}`,
      );
    });
    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage && remoteMessage?.data && data) {
        const index = remoteMessage?.data?.index
          ? remoteMessage?.data?.index
          : 0;
        await setDetailItem(data[index]);
        setModal(true);
      }
    });
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage && remoteMessage?.data && data) {
          const index = remoteMessage?.data?.index
            ? remoteMessage?.data?.index
            : 0;
          await setDetailItem(data[index]);
          setModal(true);
        }
      });

    return () => unsubscribe;
  }, []);

  if (loading) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
        }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <>
      <Home
        data={data}
        onPress={item => {
          setModal(true);
          setDetailItem(item);
        }}
      />
      {modal && detailItem && (
        <Modal visible={modal} onRequestClose={() => setModal(false)}>
          <Details item={detailItem} />
          <View
            style={{
              bottom: 40,
              flexDirection: 'row',
              alignSelf: 'center',
              position: 'absolute',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#E2674D',
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 8,
                marginHorizontal: 80,
              }}
              onPress={() => setModal(false)}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#64C189',
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 8,
                marginHorizontal: 80,
              }}
              onPress={() => Linking.openURL(detailItem?.link)}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                Open Link
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  );
}

export default App;
