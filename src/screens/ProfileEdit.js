import React from 'react';
import {
  Container,
  Content,
  Thumbnail,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Form,
  Item,
  Input,
  Label,
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
import {addAuthCreator} from '../redux/actions/AuthAction';
import {connect} from 'react-redux';
const {width, height} = Dimensions.get('window');
class ProfileEdit extends React.Component {
  state = {
    name: '',
    bio: '',
    kota: '',
  };
  componentDidMount() {
    const {profile} = this.props;
    this.setState({
      name: profile.name,
      bio: profile.bio,
      kota: profile.kota,
    });
  }

  onSubmit = () => {
    const {profile, addAuth} = this.props;
    const {name, bio, kota} = this.state;
    console.log(this.state);
    db.ref('users/' + profile.uid)
      .update({name, bio, kota})
      .then(() => {
        addAuth({
          ...profile,
          name,
          bio,
          kota,
        });
        this.props.navigation.navigate('Profile');
      });
  };

  onChange = (val, name) => {
    const key = name;
    this.setState({
      [key]: val,
    });
  };

  render() {
    const {navigation, profile} = this.props;
    const {name, bio, kota} = this.state;
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
              paddingTop: 60,
              marginTop: 30,
            }}>
            <Text style={{position: 'absolute', top: 15, alignSelf: 'center'}}>
              Ubah Profile
            </Text>
            <List style={{paddingRight: 10}}>
              <ListItem noBorder noIndent>
                <Item floatingLabel>
                  <Label>Nama</Label>
                  <Input
                    value={name}
                    onChangeText={(e) => {
                      this.onChange(e, 'name');
                    }}
                  />
                </Item>
              </ListItem>
              <ListItem noBorder noIndent>
                <Item floatingLabel>
                  <Label>Deskripsi</Label>
                  <Input
                    value={bio}
                    onChangeText={(e) => {
                      this.onChange(e, 'bio');
                    }}
                  />
                </Item>
              </ListItem>
              <ListItem noBorder noIndent>
                <Item floatingLabel>
                  <Label>Kota</Label>
                  <Input
                    value={kota}
                    onChangeText={(e) => {
                      this.onChange(e, 'kota');
                    }}
                  />
                </Item>
              </ListItem>
              <ListItem
                style={{justifyContent: 'center', borderBottomWidth: 0}}>
                <Button
                  style={[styles.btn, {marginTop: 0, width: '100%'}]}
                  onPress={() => {
                    this.onSubmit();
                  }}>
                  <Text>Simpan</Text>
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
  }
}

const mapStateToProps = ({auth}) => {
  const {profile} = auth;
  return {
    profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAuth: (body) => {
      dispatch(addAuthCreator(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
