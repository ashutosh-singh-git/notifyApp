import {Dimensions, NativeModules, Platform} from 'react-native';
const {StatusBarManager} = NativeModules;

export {default as Details} from './Details';
export {default as Home} from './Home';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Platform.select({
  ios: Dimensions.get('window').height,
  android: Dimensions.get('window').height + StatusBarManager.HEIGHT,
});
