import React from 'react';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Title,
  Spinner,
  Subtitle,
  Fab,
  Icon,
  Text,
} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import IconLogo from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEnc from 'react-native-vector-icons/Entypo';
import {db} from '../utils/firebaseConfig';
import {getOneUserCreator} from '../redux/actions/UsersAction';

class Home extends React.Component {
  state = {
    isLoading: true,
    data: [],
  };

  componentDidMount() {
    const {profile} = this.props;
    console.log(profile);
    this.ref = db.ref('users/' + profile.uid + '/messages');
    this.ref.on('value', (ss) => {
      let data = ss.val();
      let items = [];
      if (data !== null) {
        items = Object.values(data).map((val) => {
          const newData = this.props.list.filter(
            (response) => response.uid === val.idreceiver,
          );

          return {
            lastMessage: val.lastMessage,
            ...newData[0],
          };
        });
      }

      this.setState({
        data: items,
        isLoading: false,
      });
    });
  }

  componentWillUnmount() {
    console.log('unmount Home');
    if (this.ref) {
      this.ref.off();
    }
  }

  render() {
    const {isLoading, data} = this.state;
    const {profile} = this.props;
    return (
      <Container>
        <Header
          androidStatusBarColor="#D63447"
          style={{backgroundColor: '#D63447', paddingLeft: 20}}>
          <Body>
            <Title style={{fontSize: 18, fontWeight: 'bold'}}>Circle</Title>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Maps', {user: profile});
              }}>
              <IconLogo
                name="map"
                style={{fontSize: 24, marginRight: 15, color: 'white'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Profile', {});
              }}>
              <IconLogo
                name="account"
                style={{fontSize: 24, marginRight: 10, color: 'white'}}
              />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content>
          <List style={{paddingBottom: 110}}>
            {isLoading ? <Spinner color="#D63447" /> : null}
            {!isLoading && data.length < 1 ? (
              <View
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 150,
                }}>
                <IconLogo
                  name="email-search"
                  style={{fontSize: 70, color: 'rgba(0,0,0,0.1)'}}
                />
                <Text style={{color: 'rgba(0,0,0,0.2)'}}>
                  Tidak ada chat ditemukan
                </Text>
              </View>
            ) : null}

            {data.map((val, index) => {
              return (
                <ListItem avatar style={{marginTop: 10}} key={index}>
                  <Left>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('ChatPage', {user: val});
                      }}>
                      <Thumbnail
                        source={{uri: 'https://placeimg.com/140/140/any'}}
                      />
                    </TouchableOpacity>
                  </Left>
                  <Body style={{height: 80, paddingTop: 20}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('ChatPage', {user: val});
                      }}>
                      <Text>{val.name}</Text>
                      <Text note>{val.lastMessage}</Text>
                    </TouchableOpacity>
                  </Body>
                  <Right style={{height: 80, paddingTop: 20}}>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
        <Fab
          style={{
            backgroundColor: '#D63447',
            width: 70,
            height: 70,
            borderRadius: 35,
            bottom: 10,
            right: 0,
          }}
          position="bottomRight"
          onPress={() => {
            this.props.navigation.navigate('Contact', {});
          }}>
          <IconLogo
            name="message-plus"
            style={{fontSize: 30, color: 'white'}}
          />
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = ({auth, users}) => {
  const {profile} = auth;
  const {list} = users;
  return {
    profile,
    list,
  };
};

export default connect(mapStateToProps)(Home);
