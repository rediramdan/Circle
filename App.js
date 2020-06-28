import 'react-native-gesture-handler';
import React from 'react';
import {YellowBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import store from './src/redux/store';
import Login from './src/screens/Login';
import One from './src/screens/landing/One';
import Register from './src/screens/Register';
import ChatPage from './src/screens/ChatPage';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Maps from './src/screens/Maps';
import Contact from './src/screens/Contact';
import ImageEdit from './src/screens/ImageEdit';
import ProfileEdit from './src/screens/ProfileEdit';

// YellowBox.ignoreWarnings([
//   'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
// ]);
// YellowBox.ignoreWarnings([
//   'Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.',
// ]);
// YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);

const persistedStore = persistStore(store);
const {Navigator, Screen} = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <NavigationContainer>
          <Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Splash">
            <Screen name="Splash" component={Splash} />
            <Screen name="LandingpageOne" component={One} />
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
            <Screen name="ChatPage" component={ChatPage} />
            <Screen name="Home" component={Home} />
            <Screen name="Profile" component={Profile} />
            <Screen name="Maps" component={Maps} />
            <Screen name="Contact" component={Contact} />
            <Screen name="ImageEdit" component={ImageEdit} />
            <Screen name="ProfileEdit" component={ProfileEdit} />
          </Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
