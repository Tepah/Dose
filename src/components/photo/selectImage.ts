import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import React from 'react';

export const selectImage = async (
  setSelectedImage: React.Dispatch<React.SetStateAction<null>>,
) => {
  // Options for the image picker
  const options: ImageLibraryOptions = {
    mediaType: 'photo', // Specify the media type, 'photo' for images
    quality: 0.8, // Image quality (0.0 to 1.0)
  };

  // Launch the image picker
  const result = await launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
  });
  if (result.assets) {
    // @ts-ignore
    setSelectedImage(result.assets[0].uri);
  } else {
    console.log('No image selected');
  }
};
