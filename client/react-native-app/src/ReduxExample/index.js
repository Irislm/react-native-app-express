import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  connect,
} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  changePassenger, fetchPosts,
} from './actions/actionCreator';


class ReduxExample extends React.Component {
  componentDidMount() {
    const {
      onFetchPosts,
      reduxExample,
    } = this.props;
    const {
      selectedSubreddit,
    } = reduxExample;
    onFetchPosts(selectedSubreddit);
  }


  render() {
    const {
      reduxExample = {},
      onChangePassenger,
    } = this.props;
    const {
      pageHeader = {},
      passengers = [],
      posts = {},
    } = reduxExample;
    return (
      <ScrollView>
        <Text>{pageHeader.title}</Text>
        {passengers.map(v => (
          <TouchableOpacity onPress={() => onChangePassenger(v)} key={v.id}>
            <View style={{ backgroundColor: v.selected ? 'blue' : '#e5e5e5' }}>
              <Text>{v.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {posts.items && posts.items.map(v => (
          <TouchableOpacity key={v.id}>
            <View style={{ backgroundColor: v.selected ? 'blue' : '#e5e5e5' }}>
              <Text>{v.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ reduxExample } = {}, ownProps) => ({
  ...ownProps,
  reduxExample,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChangePassenger: payload => changePassenger(payload),
  onFetchPosts: payload => fetchPosts(payload),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReduxExample);
