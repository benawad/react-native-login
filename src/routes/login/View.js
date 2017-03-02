import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'

export default class Login extends React.Component {

  state = {
    submitted: false,
    email: '',
    password: '',
  }

  handleSubmit = () => {
    if (!this.state.submitted) {
      const { email, password} = this.state;
      this.props.actions.login(email, password);
      this.setState({
        submitted: true,
        email: '',
        password: '',
      })
    } 
  }

  render() {
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput 
          value={this.state.email} 
          onChangeText={email => this.setState({email})} />
        <FormLabel>Password</FormLabel>
        <FormInput 
          value={this.state.password} 
          onChangeText={password => this.setState({password})} 
          secureTextEntry/>
        <Button onPress={this.handleSubmit} title='Login' />
      </View>
    );
  }
}
