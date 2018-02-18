import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native'
import { baseBorderColor, baseFontColor } from '../../constants/theme'

const ProfileBar = ({ imgUrl, fullName }) => {
  const imgSource = { uri: imgUrl }
  return (
    <View style={styles.container}>
      <Image
        style={styles.imgProfile}
        source={imgSource} />
      <Text style={styles.title}>{fullName}</Text>
    </View>
  )
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    height: 90,
    width,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: baseFontColor,
    borderBottomWidth: 1,
    borderBottomColor: baseBorderColor,
  },
  imgProfile: {
    width: 55,
    height: 55,
    borderRadius: 35,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
  }
})

export default ProfileBar
