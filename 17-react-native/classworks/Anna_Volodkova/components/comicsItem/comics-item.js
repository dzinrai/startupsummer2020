import React from 'react';
import { Text, View, Image } from 'react-native';

import styles from './comics-item.styles';


function ComicsItem(props) {
  const imageSource = {
    uri: `${props.item.thumbnail.path}.${props.item.thumbnail.extension}`,
  };

  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <View style={styles.characterIcon}>
          <Image
            style={styles.img}
            source={imageSource}
          />
        </View>
        <View style={styles.nickAndFull}>
          <Text style={styles.nickname}>{props.item.title.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );
}

export default ComicsItem;
