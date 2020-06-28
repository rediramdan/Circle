import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import {
  Form,
  Item,
  Label,
  Input,
  Button,
  Container,
  Icon,
  Spinner,
} from 'native-base';
import styles from '../styles/styleApp';
import {auth} from '../utils/firebaseConfig';

class Login extends React.Component {
  constructor() {
    super();
    this.backhandler = null;
  }

  state = {
    passwordSecure: true,
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
    emailMessage: '',
    passwordMessage: '',
    isLoading: false,
  };

  onChangeSecure = () => {
    this.setState({
      passwordSecure: !this.state.passwordSecure,
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

  onSubmit = () => {
    const {email, password, emailError, passwordError} = this.state;
    if (!emailError && !passwordError) {
      this.setState({
        isLoading: true,
      });
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    } else {
    }
  };

  componentDidMount() {
    this.backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    console.log('Didmount');
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  componentDidUpdate() {
    console.log('uodate');
  }

  handleBackPress = () => {
    Alert.alert(
      'Keluar',
      'Apakah kamu ingin keluar ?',
      [
        {
          text: 'Batal',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Iya', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  };
  render() {
    const {
      email,
      emailError,
      password,
      passwordError,
      passwordSecure,
      emailMessage,
      isLoading,
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
        <Text style={styles.title}>Yuk, Login</Text>
        <Form style={styles.wrapperForm}>
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
            <Spinner color="#D63447" />
          ) : (
            <Button
              style={{
                borderRadius: 23,
                justifyContent: 'center',
                marginTop: 30,
                marginLeft: 10,
                backgroundColor: '#D63447',
              }}
              onPress={this.onSubmit}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                Login
              </Text>
            </Button>
          )}
        </Form>
        <Text style={{alignSelf: 'center', marginTop: 20}}>
          Atau kamu belum punya akun?
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.backhandler.remove();
            this.props.navigation.navigate('Register');
          }}>
          <Text
            style={{
              alignSelf: 'center',
              textDecorationLine: 'underline',
              color: '#D63447',
            }}>
            Register disini
          </Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default Login;
