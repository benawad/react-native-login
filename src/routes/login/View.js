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
import { Field, reduxForm } from 'redux-form';

const emailField = ({ input: { onChange, ...otherProps } }) => (
  <FormInput onChangeText={onChange} {...otherProps} />
);

const passwordField = ({ input: { onChange, ...otherProps } }) => (
  <FormInput onChangeText={onChange} {...otherProps} secureTextEntry />
);

const submit = ({ email, password }, login) => {
  login(email, password);
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
