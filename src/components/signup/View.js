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
    return (
      <Container>
        <Content padder>
          <Form padder>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Room Number</Label>
              <Input />
            </Item>
            <Button style={{marginTop: 20}} block>
                <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

