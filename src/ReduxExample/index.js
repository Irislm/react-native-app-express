import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  connect,
} from 'react-redux';
import { bindActionCreators } from 'redux';

class ReduxExample extends React.Component {
  render() {
    const {
      reduxExample = {},
      onChangePassenger,
    } = this.props;
    const {
      pageHeader = {},
      passengers = [],
    } = reduxExample;
    return (
      <View>
        <Text>{pageHeader.title}</Text>
        {passengers.map(v => (
          <TouchableOpacity onPress={() => onChangePassenger(v)} key={v.id}>
            <View style={{ backgroundColor: v.selected ? 'blue' : '#e5e5e5' }}>
              <Text>{v.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const mapStateToProps = ({ reduxExample } = {}, ownProps) => ({
  ...ownProps,
  reduxExample,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChangePassenger: payload => ({
    type: 'changePassenger',
    payload,
  }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReduxExample);
