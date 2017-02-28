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
import { reduxForm, Field } from 'redux-form';

class Signup extends React.Component {
  render() {
    const formField = (label, password=false) => (
      <Item floatingLabel>
        <Label>{label}</Label>
        <Input secureTextEntry={password}/>
      </Item>
    );
    return (
      <Container>
        <Content>
          <Form>
            <Field
              name='username'
              component={() => formField('Username')} />
            <Field
              name='email'
              component={() => formField('Email')} />
            <Field
              name='password'
              component={() => formField('Password', true)} />
            <Field
              name='roomNumber'
              component={() => formField('Room Number')} />
            <Button style={{marginTop: 20}} block>
                <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'signup' 
})(Signup);
