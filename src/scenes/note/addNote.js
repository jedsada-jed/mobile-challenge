import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { addNote } from '../../actions/noteAction'
import {
  faceboookColor,
  baseFontColor,
  baseColor,
  baseFormColor,
  baseBorderTextColor
} from '../../constants/theme'
import {
  error,
  ok,
  titleIsReq,
  titleText,
  noteText,
  save
} from '../../constants/string'

class AddNote extends Component {
  state = {
    title: '',
    note: '',
  }

  static propTypes = {
    createNote: PropTypes.func,
  }

  static defaultProps = {
    createNote: () => { },
  }

  handleSubmit = () => {
    const { title, note } = this.state
    if (!title) {
      return Alert.alert(
        error,
        titleIsReq,
        [{ text: ok }],
      )
    }
    const item = {
      title,
      note,
      createDate: new Date(),
    }
    this.props.createNote(item)
    Actions.Notes({ type: 'reset' })
  }

  render() {
    const { title, note } = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={baseColor}
          barStyle='light-content'
        />
        <View style={styles.wrapper}>
          <Text style={styles.textTitle}>{titleText}</Text>
          <View style={styles.wrapperText}>
            <TextInput
              onChangeText={value => this.setState({ title: value })}
              value={title}
            />
          </View>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.textTitle}>{noteText}</Text>
          <View style={styles.wrapperText}>
            <TextInput
              multiline={true}
              numberOfLines={3}
              onChangeText={value => this.setState({ note: value })}
              value={note}
            />
          </View>
        </View>
        <View style={styles.wrapperBtn}>
          <TouchableOpacity
            style={styles.btn}
            onPress={this.handleSubmit}>
            <Text style={styles.btnText}>
              {save}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const textStyle = Platform.OS === 'ios' ? {
  borderBottomColor: baseBorderTextColor,
  borderBottomWidth: 1,
} : {}

const styles = StyleSheet.create({
  container: {
    backgroundColor: baseFormColor,
    flex: 1,
  },
  wrapper: {
    paddingTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  wrapperBtn: {
    paddingTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperText: {
    ...textStyle,
    marginTop: 10
  },
  textTitle: {
    fontSize: 18,
  },
  btn: {
    backgroundColor: baseColor,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5
  },
  btnText: {
    color: baseFontColor,
    fontSize: 17,
  },
})

const mapDispatchToProps = dispatch => ({
  createNote: (data) => addNote(data)(dispatch)
})


export default connect(null, mapDispatchToProps)(AddNote)
