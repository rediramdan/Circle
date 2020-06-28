import React, {useEffect, useState} from 'react';
import {Text, View, Animated, Easing, Image} from 'react-native';
import {Spinner} from 'native-base';
import {auth, db} from '../utils/firebaseConfig';
import {connect} from 'react-redux';
import {addAuthCreator} from '../redux/actions/AuthAction';
import {addUsersCreator} from '../redux/actions/UsersAction';

class Splash extends React.Component {
  constructor() {
    super();
    this.state = {
      spin: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.spiner();
    console.log('Mencoba masuk');
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.ref('users')
          .once('value')
          .then((snapshot) => {
            this.props.addAuth(snapshot.child(user.uid).val());
            const users = Object.values(snapshot.val());
            const newUsers = users.filter(
              (response) => response.uid !== user.uid,
            );
            this.props.addUsers(newUsers);
            console.log('welcome..');
            this.props.navigation.navigate('Home');
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.props.navigation.navigate('LandingpageOne');
      }
    });
  }

  spiner = () => {
    this.state.spin.setValue(0);
    Animated.timing(this.state.spin, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      this.spiner();
    });
  };

  render() {
    const spinIn = this.state.spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../images/logo-name.png')}
          style={{width: 140, height: 114, marginLeft: 10}}
        />
        <Spinner color="#D63447" />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAuth: (body) => {
      dispatch(addAuthCreator(body));
    },
    addUsers: (body) => {
      dispatch(addUsersCreator(body));
    },
  };
};

export default connect(null, mapDispatchToProps)(Splash);
