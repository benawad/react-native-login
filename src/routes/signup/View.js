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

export default class Signup extends React.Component {

  state = {
    submitted: false,
    username: '',
    email: '',
    password: '',
    room_num: '',
  }

  handleSubmit = () => {
    if (!this.state.submitted) {
      const { username, email, password, room_num } = this.state;
      this.props.actions.signup(username, email, password, room_num);
      this.setState({
        submitted: true,
        username: '',
        email: '',
        password: '',
        room_num: '',
      })
    } 
  }

  render() {
    return (
      <View>
        <FormLabel>Username</FormLabel>
        <FormInput 
          value={this.state.username} 
          onChangeText={username => this.setState({username})} />
        <FormLabel>Email</FormLabel>
        <FormInput 
          value={this.state.email} 
          onChangeText={email => this.setState({email})} />
        <FormLabel>Password</FormLabel>
        <FormInput 
          value={this.state.password} 
          onChangeText={password => this.setState({password})} 
          secureTextEntry/>
        <FormLabel>Room Number</FormLabel>
        <FormInput 
          value={this.state.room_num} 
          onChangeText={room_num => this.setState({room_num})} />
        <Button onPress={this.handleSubmit} title='Sign Up' />
      </View>
    );
  }
}
