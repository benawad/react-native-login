import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements'
import { Field, reduxForm, SubmissionError } from 'redux-form';

const emailField = ({ input: { onChange, ...otherProps }, meta: { touched, error } }) => (
  <View>
    <FormInput onChangeText={onChange} {...otherProps} />
    { touched && error &&  <FormValidationMessage>{ error }</FormValidationMessage> }
  </View>
);

const passwordField = ({ input: { onChange, ...otherProps }, meta: { touched, error } }) => (
  <View>
    <FormInput onChangeText={onChange} {...otherProps} secureTextEntry />
    { touched && error &&  <FormValidationMessage>{ error }</FormValidationMessage> }
  </View>
);

const submit = ({ email='', password='' }, login) => {
  const errors = {
    _error: 'Login failed!'
  }

  let error = false;

  if (!email.trim()) {
    errors.email = 'Required'
    error = true;
  }

  if (!password.trim()) {
    errors.password = 'Required'
    error = true;
  }
  
  if (error) {
    throw new SubmissionError(errors);
  } else {
    login(email, password);
  }
}

const login = ({ handleSubmit, actions: { login } }) => (
 <View>
    <FormLabel>Email</FormLabel>
    <Field name='email' component={emailField} />
    <FormLabel>Password</FormLabel>
    <Field name='password' component={passwordField} />
    <Button 
      title='Login'
      onPress={handleSubmit(values => submit(values, login))} />
  </View>
);

export default reduxForm({
  form: 'login',
})(login);
