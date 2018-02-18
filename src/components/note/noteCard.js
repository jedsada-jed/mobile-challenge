import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'
import { baseFormColor } from '../../constants/theme'

const NoteCard = ({ title, detail }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.detailWrapper}>
        <Text style={styles.detailText}>{detail}</Text>
      </View>
    </View>
  )
}

NoteCard.propTypes = {
  title: PropTypes.string,
  detail: PropTypes.string,
}

NoteCard.defaultProps = {
  title: '',
  detail: ''
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    height: 150,
    width,
    flexDirection: 'column',
    backgroundColor: baseFormColor,
  },
  titleWrapper: {
    height: 70,
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 25,
    fontWeight: '300',
  },
  detailWrapper: {
    height: 80,
    paddingHorizontal: 15,
  },
  detailText: {
    fontSize: 20,
  }
})

export default NoteCard
