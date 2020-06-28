import React, {useEffect} from 'react';
import {
  Container,
  Content,
  Thumbnail,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Body,
  Icon,
  Button,
} from 'native-base';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from '../styles/styleApp';
import {db, auth} from '../utils/firebaseConfig';
import {removeAuthCreator} from '../redux/actions/AuthAction';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');
const Profile = ({navigation, profile, removeAuth}) => {
  return (
    <Container>
      <Content style={{backgroundColor: '#D63447'}}>
        <View
          style={{
            backgroundColor: 'white',
            width: width,
            height: height - 54,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingHorizontal: 10,
            paddingTop: 80,
            marginTop: 30,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ImageEdit');
            }}>
            <Thumbnail
              source={{uri: 'https://placeimg.com/140/140/any'}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                alignSelf: 'center',
                zIndex: 2,
                marginBottom: 10,
              }}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 18, alignSelf: 'center'}}>
            {profile.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              alignSelf: 'center',
              textAlign: 'center',
              color: 'rgba(0,0,0,0.4)',
            }}>
            {profile.bio || 'Ada'}
          </Text>
          <List style={{paddingRight: 10}}>
            <ListItem itemHeader style={{marginBottom: -20}}>
              <Text>Lokasi</Text>
            </ListItem>
            <ListItem noBorder noIndent>
              <Text>{profile.kota}</Text>
            </ListItem>
            <ListItem noBorder noIndent>
              <Left>
                <Text>Lokasi Saya</Text>
              </Left>
              <Right>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Maps', {user: profile, isUser: true});
                  }}>
                  <Icon name="arrow-forward" />
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem itemHeader style={{marginBottom: -20}}>
              <Text>Pengaturan</Text>
            </ListItem>
            <ListItem noBorder noIndent>
              <Left>
                <Text>Ubah profile</Text>
              </Left>
              <Right>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ProfileEdit');
                  }}>
                  <Icon name="arrow-forward" />
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem noBorder noIndent>
              <Left>
                <Text>Ubah password</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem style={{justifyContent: 'center', borderBottomWidth: 0}}>
              <Button
                style={[styles.btn, {marginTop: 0, width: '100%'}]}
                onPress={() => {
                  auth.signOut().then(() => {
                    removeAuth();
                    console.log('ok logout');
                  });
                }}>
                <Text>Logout</Text>
              </Button>
            </ListItem>
          </List>
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
        </View>
      </Content>
    </Container>
  );
};

const mapStateToProps = ({auth}) => {
  const {profile} = auth;
  return {
    profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeAuth: (body) => {
      dispatch(removeAuthCreator(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
