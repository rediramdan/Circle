import React from 'react';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {
  Header,
  Container,
  Content,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Subtitle,
} from 'native-base';
import {Text, View, TouchableOpacity} from 'react-native';
import {db, auth} from '../utils/firebaseConfig';
import {connect} from 'react-redux';

class ChatPage extends React.Component {
  state = {
    messages: [],
    messageId: null,
    watch: false,
    isTyping: false,
  };

  componentDidMount() {
    const receiver = this.props.route.params.user;
    const sender = this.props.profile;
    db.ref('users/' + sender.uid)
      .once('value')
      .then((snapshot) => {
        if (snapshot.hasChild('/messages/' + receiver.uid)) {
          const id = snapshot.child('/messages/' + receiver.uid + '/_id').val();
          this.setState({
            messageId: id,
          });
        }
      });
  }

  componentDidUpdate() {
    const {messageId, watch, messages} = this.state;
    const receiver = this.props.route.params.user;
    const sender = this.props.profile;
    if (messageId !== null && !watch) {
      this.ref = db.ref('messages/' + messageId);
      this.ref.on('value', (ss) => {
        let data = ss.val();
        let items = Object.values(data).map((val) => {
          let id_user = 2;
          if (val.receiverUid === receiver.uid) {
            id_user = 1;
          }
          return {
            ...val,
            user: {
              _id: id_user,
              avatar: 'https://placeimg.com/140/140/any',
            },
          };
        });
        this.bref = db.ref(
          'users/' + sender.uid + '/messages/' + receiver.uid + '/isTyping',
        );
        this.bref.on('value', (ss) => {
          this.setState({
            isTyping: ss.val(),
          });
        });
        this.setState({
          messages: items.reverse(),
          watch: true,
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.ref) {
      console.log('unmount');
      this.ref.off();
    }
    if (this.bref) {
      this.bref.off();
    }
  }

  onSend(messages = []) {
    const receiver = this.props.route.params.user;
    const sender = this.props.profile;
    const {messageId} = this.state;
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [
        {...messages[0], isSend: false},
      ]),
    }));
    if (messageId === null) {
      const id_message = new Date().getTime();
      console.log('Message1', id_message);
      db.ref('/users/' + receiver.uid + '/messages/' + sender.uid)
        .set({
          _id: id_message,
          idreceiver: sender.uid,
          isTyping: false,
          lastMessage: messages[0].text,
        })
        .then(() => {
          db.ref('/users/' + sender.uid + '/messages/' + receiver.uid)
            .set({
              _id: id_message,
              idreceiver: receiver.uid,
              isTyping: false,
              lastMessage: messages[0].text,
            })
            .then(() => {
              db.ref('/messages/' + id_message + '/' + id_message)
                .set({
                  ...messages[0],
                  receiverUid: receiver.uid,
                  createdAt: new Date().getTime(),
                  isSend: true,
                  user: {},
                })
                .then(() => {
                  this.setState({
                    messageId: id_message,
                  });
                });
            });
        });
    } else {
      const id_message = new Date().getTime();
      console.log('Message2', id_message);
      console.log('disini tambah');
      db.ref('/messages/' + messageId + '/' + id_message)
        .set({
          ...messages[0],
          receiverUid: receiver.uid,
          createdAt: new Date().getTime(),
          isSend: true,
          user: {},
        })
        .then(() => {
          db.ref('/users/' + sender.uid + '/messages/' + receiver.uid).update({
            lastMessage: messages[0].text,
          });

          db.ref('/users/' + receiver.uid + '/messages/' + sender.uid).update({
            lastMessage: messages[0].text,
          });
        });
    }
  }

  render() {
    const {user} = this.props.route.params;
    const sender = this.props.profile;
    const {isTyping} = this.state;
    return (
      <Container>
        <Header
          androidStatusBarColor="#D63447"
          style={{backgroundColor: 'white'}}>
          <Left>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}>
              <Icon name="arrow-back" style={{marginLeft: 10, fontSize: 22}} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{color: 'black', fontSize: 16}}>{user.name}</Title>
            <Subtitle style={{color: 'rgba(0,0,0,0.3)', fontSize: 12}}>
              {user.online ? 'Online' : ''}
            </Subtitle>
          </Body>
          <Right />
        </Header>
        <GiftedChat
          bottomOffset={55}
          renderBubble={(props) => {
            const disini = props.currentMessage.isSend;
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: disini ? '#D63447' : '#D1CEBD',
                  },
                }}
              />
            );
          }}
          renderFooter={(e) => {
            if (isTyping) {
              return (
                <Text
                  style={{
                    marginBottom: 20,
                    marginLeft: 30,
                    color: 'rgba(0,0,0,0.3)',
                  }}>
                  {user.name} mengetik...
                </Text>
              );
            } else {
              return null;
            }
          }}
          bottomOffset={0}
          placeholder={'Tulis sesuatu...'}
          renderSend={(props) => {
            return (
              <Send {...props}>
                <View style={{marginRight: 12, marginBottom: 12}}>
                  <Text style={{color: '#D63447', fontSize: 16}}>Kirim</Text>
                </View>
              </Send>
            );
          }}
          user={{
            _id: 1,
            name: 'Redi',
            avatar: 'https://placeimg.com/140/140/any',
          }}
          isKeyboardInternallyHandled={true}
          messages={this.state.messages}
          onSend={(messages) => {
            this.onSend(messages);
          }}
          onInputTextChanged={(e) => {
            if (e === '' && this.state.messageId !== null) {
              db.ref('users/' + user.uid + '/messages')
                .child(sender.uid)
                .update({isTyping: false});
            } else {
              if (e.length === 1 && this.state.messageId !== null) {
                db.ref('users/' + user.uid + '/messages')
                  .child(sender.uid)
                  .update({isTyping: true});
              }
            }
          }}
        />
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

export default connect(mapStateToProps)(ChatPage);
