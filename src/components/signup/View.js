import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';

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
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input 
                value={this.state.username} 
                onChangeText={username => this.setState({username})} />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input 
                value={this.state.email} 
                onChangeText={email => this.setState({email})} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input 
                value={this.state.password} 
                onChangeText={password => this.setState({password})} 
                secureTextEntry/>
            </Item>
            <Item floatingLabel>
              <Label>Room Number</Label>
              <Input 
                value={this.state.room_num} 
                onChangeText={room_num => this.setState({room_num})} />
            </Item>
            <Button onPress={this.handleSubmit} style={{marginTop: 20}} block>
                <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
