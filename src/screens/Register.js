import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Form,
  Item,
  Label,
  Input,
  Button,
  Container,
  Icon,
  Spinner,
  Toast,
} from 'native-base';
import {auth, db} from '../utils/firebaseConfig';
import Geolocation from 'react-native-geolocation-service';
import styles from '../styles/styleApp';

class Register extends React.Component {
  state = {
    passwordSecure: true,
    name: '',
    email: '',
    password: '',
    isLoading: false,
    loadingMessage: '',
    nameError: false,
    nameMessage: '',
    emailError: false,
    emailMessage: '',
    passwordError: false,
    passwordMessage: '',
  };

  onChangeSecure = () => {
    const {passwordSecure} = this.state;
    this.setState({
      passwordSecure: !passwordSecure,
    });
  };

  onChange = (val, name) => {
    const key = name;
    const error = key + 'Error';
    const message = key + 'Message';
    if (val !== '') {
      this.setState({
        [error]: false,
      });
    } else {
      this.setState({
        [error]: true,
        [message]: 'Ini wajib diisi',
      });
    }
    this.setState({
      [key]: val,
    });
  };

  setLoading = (val) => {
    this.setState({
      isLoading: val,
    });
  };

  setMsgLoading = (val) => {
    this.setState({
      loadingMessage: val,
    });
  };

  onSubmit = () => {
    const {
      name,
      email,
      password,
      nameError,
      emailError,
      passwordError,
    } = this.state;
    if (!nameError && !emailError && !passwordError) {
      this.setLoading(true);
      this.setMsgLoading('Mohon tunggu');
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          this.setMsgLoading('Menyimpan');
          auth
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
              this.setMsgLoading('Menyelesaikan');
              this.addUser(name, res.user.uid, location);
            })
            .catch((e) => {
              let msg = 'Kesalahan terjadi';
              if (e.message === 'The email address is badly formatted.') {
                msg = 'Format email kamu salah';
              } else if (
                e.message ===
                'The email address is already in use by another account.'
              ) {
                msg = 'Email sudah digunakan';
              }
              this.setState({
                emailError: true,
                emailMessage: msg,
              });
              console.log(e.message);
            })
            .finally(() => {
              this.setLoading(false);
            });
        },
        (error) => {
          console.log(error.code, error.message);

        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  addUser = (name, uid, location) => {
    db.ref('/users/' + uid).set({
      name: name,
      bio: '',
      online: true,
      kota: '',
      location: location
    });
  };

  render() {
    const {
      passwordSecure,
      name,
      nameError,
      nameMessage,
      email,
      isLoading,
      loadingMessage,
      emailError,
      emailMessage,
      password,
      passwordError,
      passwordMessage,
    } = this.state;
    return (
      <Container style={styles.wrapper}>
        <View style={styles.wrapperImage}>
          <Image
            source={require('../images/logo-name.png')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <Text style={styles.title}>Register</Text>
        <Form style={styles.wrapperForm}>
          <Item floatingLabel style={styles.pb} error={nameError}>
            <Label>Nama</Label>
            <Input
              onChangeText={(e) => {
                this.onChange(e, 'name');
              }}
              value={name}
            />
          </Item>
          {nameError ? (
            <Text note style={styles.error}>
              {nameMessage}
            </Text>
          ) : null}
          <Item floatingLabel style={styles.pb} error={emailError}>
            <Label>Email</Label>
            <Input
              onChangeText={(e) => {
                this.onChange(e, 'email');
              }}
              value={email}
            />
          </Item>
          {emailError ? (
            <Text note style={styles.error}>
              {emailMessage}
            </Text>
          ) : null}
          <Item floatingLabel style={styles.pb} error={passwordError}>
            <Label>Kata Sandi</Label>
            <Input
              secureTextEntry={passwordSecure}
              onChangeText={(e) => {
                this.onChange(e, 'password');
              }}
              value={password}
            />
            <Icon
              name={passwordSecure ? 'eye-off' : 'eye'}
              onPress={this.onChangeSecure}
            />
          </Item>
          {passwordError ? (
            <Text note style={styles.error}>
              {passwordMessage}
            </Text>
          ) : null}
          {isLoading ? (
            <>
              <Spinner color="#D63447" />
              <Text
                style={[
                  styles.error,
                  {alignSelf: 'center', marginLeft: 0, marginTop: -15},
                ]}>
                {loadingMessage}
              </Text>
            </>
          ) : (
            <Button style={styles.btn} onPress={this.onSubmit}>
              <Text style={styles.btnText}>Register</Text>
            </Button>
          )}
        </Form>
        <Text style={styles.note}>Kamu sudah punya akun?</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}>
          <Text style={styles.noteClick}>Yuk, Login</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default Register;
