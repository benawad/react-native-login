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

const textField = ({ input: { onChange, ...otherProps }, meta: { touched, error } }) => (
  <View>
    <FormInput onChangeText={onChange} {...otherProps} />
    { touched && error &&  <FormValidationMessage>{ error }</FormValidationMessage> }
  </View>
);

const numericField = ({ input: { onChange, ...otherProps }, meta: { touched, error } }) => (
  <View>
    <FormInput keyboardType="numeric" onChangeText={onChange} {...otherProps} />
    { touched && error &&  <FormValidationMessage>{ error }</FormValidationMessage> }
  </View>
);

const passwordField = ({ input: { onChange, ...otherProps }, meta: { touched, error } }) => (
  <View>
    <FormInput onChangeText={onChange} {...otherProps} secureTextEntry />
    { touched && error &&  <FormValidationMessage>{ error }</FormValidationMessage> }
  </View>
);

const submit = ({ username='', email='', password='', room_num='' }, signup) => {
  const errors = {
    _error: 'Login failed!'
  }

  let error = false;

  if (!username.trim()) {
    errors.username = 'Required'
    error = true;
  }

  if (!email.trim()) {
    errors.email = 'Required'
    error = true;
  }
  
  if (!password.trim()) {
    errors.password = 'Required'
    error = true;
  }

  const trimmed_rn = room_num.trim();

  if (trimmed_rn !== '' && isNaN(trimmed_rn)) {
    errors.room_num = 'Not a number'
    error = true;
  }

  if (error) {
    throw new SubmissionError(errors);
  } else {
    signup(username, email, password, room_num);
  }
}

const signup = ({ handleSubmit, actions: { signup } }) => (
 <View>
    <FormLabel>Username</FormLabel>
    <Field name='username' component={textField} />
    <FormLabel>Email</FormLabel>
    <Field name='email' component={textField} />
    <FormLabel>Password</FormLabel>
    <Field name='password' component={passwordField} />
    <FormLabel>Room Number</FormLabel>
    <Field name='room_num' component={numericField} />
    <Button 
      title='Sign up'
      onPress={handleSubmit(values => submit(values, signup))} />
  </View>
);

export default reduxForm({
  form: 'signup',
})(signup);
