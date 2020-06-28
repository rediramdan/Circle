import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperImage: {
    width: 121,
    height: 103,
    marginLeft: 7,
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 17,
    marginBottom: -1,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.7)',
  },
  wrapperForm: {
    width: '100%',
    paddingRight: 30,
    paddingLeft: 20,
  },
  pb: {
    paddingBottom: 10,
  },
  error: {
    marginLeft: 15,
    color: 'red',
    fontSize: 11,
  },
  btn: {
    borderRadius: 23,
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 10,
    backgroundColor: '#D63447',
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    alignSelf: 'center',
    marginTop: 20,
  },
  noteClick: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    color: '#D63447',
  },
});
