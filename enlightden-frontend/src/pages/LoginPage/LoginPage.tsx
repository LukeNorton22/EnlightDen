import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../src/apiClient';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true); // Toggle between login and sign-up
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrorMessage('');

    // Simple validation
    if (!username || !password || (!isLogin && !confirmPassword)) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const url = isLogin ? '/api/UserAuth/Login' : '/api/UserAuth/Register';

      // Construct payload based on login or signup
      const payload = isLogin
        ? { username, password } // Login payload
        : { username, password, email }; // Register payload

      const response = await apiClient.post(url, payload);

      if (response.status === 200) {
        console.log(isLogin ? 'Login successful' : 'Sign-up successful:', response.data);

        // Assuming the response contains a JWT token for login
        const token = response.data.token; // Replace with correct field
        localStorage.setItem('token', token); // Store token in localStorage

        // Redirect to Dashboard after successful login
        navigate('/dash'); // Adjust the path based on your routes
      } else {
        setErrorMessage(response.data.message || 'An error occurred.');
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
            {!isLogin && (
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <Button basic color="teal" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Log In'}
          </Button>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default AuthPage;
