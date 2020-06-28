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
  Subtitle,
  Fab,
  Icon,
  Text,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import IconLogo from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEnc from 'react-native-vector-icons/Entypo';

class Contact extends React.Component {
  componentDidMount() {
    console.log(this.props.profile.uid);
    console.log(this.props.list);
  }
  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor="#D63447"
          style={{backgroundColor: '#D63447', paddingLeft: 20}}>
          <Body>
            <Title style={{fontSize: 18, fontWeight: 'bold'}}>Contact</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <List style={{paddingBottom: 110}}>
            {this.props.list.map((val, index) => {
              return (
                <ListItem avatar style={{marginTop: 10}} key={index}>
                  <Left>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Maps', {user: val});
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
                      <Text note>{val.bio || 'Ada'}</Text>
                    </TouchableOpacity>
                  </Body>
                </ListItem>
              );
            })}
          </List>
        </Content>
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

export default connect(mapStateToProps)(Contact);
