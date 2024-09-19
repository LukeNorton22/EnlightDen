import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true); // Toggle between login and sign-up

  const handleSubmit = async () => {
    setErrorMessage('');

    // Simple validation
    if (!email || !password || (!isLogin && !confirmPassword)) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // API call depending on login or sign-up
    try {
      const url = isLogin
        ? 'http://your-backend-api.com/login'
        : 'http://your-backend-api.com/signup';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(isLogin ? 'Login successful' : 'Sign-up successful:', data);
      } else {
        setErrorMessage(data.message || 'An error occurred.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          {isLogin ? 'Log-in to your account' : 'Sign-up for a new account'}
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <Button color="teal" fluid size="large" type="submit">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </Segment>
        </Form>

        {errorMessage && <Message negative>{errorMessage}</Message>}

        <Message>
          {isLogin ? 'New to us?' : 'Already have an account?'}{' '}
          <Button
            basic
            color="teal"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </Button>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default AuthPage;
