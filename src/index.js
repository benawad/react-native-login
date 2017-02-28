import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import { Provider } from 'react-redux';
import 'rxjs';
import store from './store';
import Signup from './components/signup';

export default class AppContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Header>
              <Left>
                  <Button transparent>
                      <Icon name='menu' />
                  </Button>
              </Left>
              <Body>
                  <Title>Header</Title>
              </Body>
              <Right />
          </Header>

          <Content padder>
              <Signup />
          </Content>

          <Footer>
              <FooterTab>
                  <Button full>
                      <Text>Footer</Text>
                  </Button>
              </FooterTab>
          </Footer>
      </Container>
      </Provider>
    );
  }
}
