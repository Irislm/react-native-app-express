import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  state = {
    products: [],
    inputVal: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => {
        if (!res) return;
        if (res.resultCode === 1 && res.data.products) {
          this.setState({ products: res.data.products || [] })
        }
      })
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('http://localhost:5000/products');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    console.log(body);
    return body;
  };

  onPost = async () => {
    const response = await fetch('http://localhost:5000/updateProduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: this.state.inputVal,
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    this.callApi().then(res => {
      if (!res) return;
      if (res.resultCode === 1 && res.data.products) {
        this.setState({ products: res.data.products || [] })
      }
    });
  }

  
  render() {
    return (
      <View style={styles.container}>
        <Text>App Test Express</Text>
        {this.state.products.map((v, idx) => (<Text key={idx}>{v} </Text>))}
        <TextInput 
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100, borderRadius: 8 }}
          onChangeText={(text) => {
            this.setState({
              inputVal: text,
            })
          }}
          value={this.state.inputVal}
        />
        <TouchableOpacity onPress={this.onPost}>
          <View style={styles.btn}>
            <Text>修改</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8
  }
});
