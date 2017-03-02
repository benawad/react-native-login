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
      <Container>
        <Content padder>
          <Form>
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
            <Button onPress={this.handleSubmit} style={{marginTop: 20}} block>
                <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
