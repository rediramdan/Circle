import React, {useEffect, useState} from 'react';
import {Text, View, Animated, Easing, Image} from 'react-native';

class One extends React.Component {
  constructor() {
    super();
    this.state = {
      spin: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.spiner();
    setTimeout(()=>{
      this.props.navigation.navigate('Login')
    }, 500)
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
          backgroundColor: '#D63447',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            color:'white',
          }}>
          Created by
        </Text>
        <Text
          style={{
            fontSize: 22,
            color:'white',
            fontWeight: 'bold',
          }}>
          redi_rmdn
        </Text>
      </View>
    );
  }
}

export default One;
