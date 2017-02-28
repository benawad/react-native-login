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
  render() {
    const formField = (label, password=false) => {
      return (
        <Item floatingLabel>
          <Label>{label}</Label>
          <Input secureTextEntry={password}/>
        </Item>
      );
    }
    return (
      <Container>
        <Content>
          <Form>
            {formField('Username')}
            {formField('Email')}
            {formField('Password')}
            {formField('Room Number')}
            <Button style={{marginTop: 20}} block>
                <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
