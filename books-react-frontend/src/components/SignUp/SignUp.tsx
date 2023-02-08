import { type FormEvent, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

import SignUpForm from './SignUpForm';
import AuthService from '../../services/authentication_service';

/**
 * The signup page where the user can sign up and log in
 */
function SignUp() {
  const navigate = useNavigate();

  const [loginMode, setLoginMode] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleLoginModeChange = () => {
    setLoginMode(!loginMode);
    setLoginErrorMessage('');
  };
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSecondPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(event.target.value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loginMode) {
      if (password !== secondPassword) {
        setLoginErrorMessage('Passwords do not match');
        return;
      }
      AuthService.register(userName, password).then(
        () => {
          loginAndNavigate();
        },
        (error) => {
          const resMessage = error.response?.data?.message || error.message || error.toString();
          console.log(resMessage);
          setLoginErrorMessage('Incorrect Username or Password');
        },
      );
      return;
    }

    loginAndNavigate();
  };

  async function loginAndNavigate() {
    await AuthService.login(userName, password).then(
      () => {
        console.log('Navigate to books');
        navigate('/books');
      },
      (error) => {
        const resMessage = error.response?.data?.message || error.message || error.toString();
        console.log(resMessage);
        setLoginErrorMessage('Incorrect Username or Password');
      },
    );
  }

  return (
    <Container fluid>
      <Row className='d-flex justify-content-center align-items-center h-100'>
        <Col col='12'>
          <Card
            className='bg-white my-5 mx-auto'
            style={{ borderRadius: '1rem', maxWidth: '500px' }}
          >
            <Card.Body className='p-5 w-100 d-flex flex-column'>
              <h2 className='fw-bold mb-4 text-center'>{loginMode ? 'Sign in' : 'Sign up'}</h2>
              <SignUpForm
                userName={userName}
                password={password}
                secondPassword={secondPassword}
                loginErrorMessage={loginErrorMessage}
                loginMode={loginMode}
                handleSubmit={handleSubmit}
                handleUserNameChange={handleUserNameChange}
                handlePasswordChange={handlePasswordChange}
                handleSecondPasswordChange={handleSecondPasswordChange}
                handleLoginModeChange={handleLoginModeChange}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
