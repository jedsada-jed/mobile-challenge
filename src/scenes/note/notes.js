import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { ProfileBar, NoteCard } from '../../components/'
import { limitText } from '../../util/utilFunction'
import { baseColor, baseFontColor, baseBackgroundColor } from '../../constants/theme'

class Notes extends Component {
  static propTypes = {
    user: PropTypes.object,
    dataNote: PropTypes.array,
  }

  static defaultProps = {
    user: {},
    dataNote: {}
  }

  renderItem = ({ item }) => {
    const { title, note } = item
    const noteLimit = limitText(30, note)
    const titleLimit = limitText(20, title)
    return (
      <View style={styles.cardWrapper}>
        <NoteCard title={titleLimit} detail={noteLimit} />
      </View>
    )
  }

  render() {
    const { user, dataNote } = this.props
    const { displayName, photoURL } = user
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={baseColor}
          barStyle='light-content'
        />
        <ProfileBar imgUrl={photoURL} fullName={displayName} />
        <FlatList
          keyExtractor={item => `${item.createDate}${item.userId}`}
          data={dataNote}
          renderItem={this.renderItem}
        />
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() => Actions.AddNote()}>
          <Text style={styles.btnText}>
            {'+'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: baseBackgroundColor
  },
  btnWrapper: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: baseColor,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 35,
  },
  btnText: {
    fontSize: 40,
    color: baseFontColor
  },
  cardWrapper: {
    paddingVertical: 1
  }
})

const mapStateToProps = state => {
  const {
    noteReducer: { dataNote },
    authenFirebase: { data }
  } = state
  const user = data._user
  return { dataNote, user }
}

export default connect(mapStateToProps, null)(Notes)
