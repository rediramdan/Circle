import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Container, Content, Thumbnail, Text, Icon, Button} from 'native-base';
import styless from '../styles/styleApp';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Maps = ({navigation, route, list, profile}) => {
  const {user} = route.params;
  const isUser = route.params.isUser;
  const [stateIsUser, setIsUser] = React.useState(isUser);
  const [stateUser, setUser] = React.useState(user);
  const minHeight = stateIsUser ? 128 : 198;

  return (
    <Container
      style={{
        backgroundColor: '#F6EEDF',
      }}>
      <View style={[styles.container, {height: height - minHeight}]}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: stateUser.location.latitude,
            longitude: stateUser.location.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.0421,
          }}>
          {list.map((val, index) => {
            return (
              <Marker
                key={index}
                coordinate={val.location}
                title={val.name}
                pinColor={'orange'}
                description={val.bio || 'Ada'}
                onPress={() => {
                  setIsUser(false);
                  setUser(val);
                }}>
                <Callout />
              </Marker>
            );
          })}
          <Marker
            coordinate={profile.location}
            title={profile.name}
            description={profile.bio || 'Ada'}
            onPress={() => {
              setIsUser(true);
              setUser(user);
            }}
          />
        </MapView>
      </View>
      <View
        style={{
          width: width,
          backgroundColor: 'white',
          height: minHeight - 18,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          position: 'absolute',
          alignItems: 'center',
          bottom: 0,
          paddingTop: 45,
        }}>
        <Thumbnail
          source={{uri: 'https://placeimg.com/140/140/any'}}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            alignSelf: 'center',
            marginTop: -40,
            position: 'absolute',
            zIndex: 2,
          }}
        />
        <Text style={{alignSelf: 'center'}}>{stateUser.name}</Text>
        <Text style={{alignSelf: 'center'}} note>
          {stateUser.kota || 'Ada'}
        </Text>
        {!stateIsUser ? (
          <Button
            style={[styless.btn, {marginTop: 20, width: '60%', marginLeft: 0}]}
            onPress={() => {
              navigation.navigate('ChatPage', {user:stateUser});
            }}>
            <Text>Kirim pesan</Text>
          </Button>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 2,
          left: 0,
          paddingLeft: 15,
          paddingTop: 15,
          width: 50,
          height: 50,
        }}>
        <Icon name="arrow-back" style={{fontSize: 22}} />
      </TouchableOpacity>
    </Container>
  );
};

const mapStateToProps = ({auth, users}) => {
  const {profile} = auth;
  const {list} = users;
  return {
    profile,
    list,
  };
};

export default connect(mapStateToProps)(Maps);
