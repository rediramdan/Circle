import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {storage} from '../utils/firebaseConfig';
import * as Progress from 'react-native-progress';

const ImageEdit = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  console.log(storage)
  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = response.uri;
        const type = response.type;
        const name = response.fileName;
        const source = {
          uri,
          type,
          name,
        }
        cloudinaryUpload(source)
      }
    });
  };

  const cloudinaryUpload = (photo) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'decqfizye')
    data.append("cloud_name", "decqfizye")
    fetch("https://api.cloudinary.com/v1_1/decqfizye/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        console.log(data.secure_url)
      }).catch(err => {
        console.log(err)
        Alert.alert("An Error Occured While Uploading")
      })
  }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={selectImage}>
        <Text>Pick an image</Text>
      </TouchableOpacity>
      <View>
        {image !== null ? <Image source={{uri: image.uri}} /> : null}
        {uploading ? (
          <View>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <TouchableOpacity >
            <Text>Upload image</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ImageEdit;
