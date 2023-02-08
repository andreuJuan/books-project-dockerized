import { ChangeEvent, type FormEvent } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export interface SignUpFormProps {
  userName: string;
  password: string;
  secondPassword: string;
  loginErrorMessage: string;
  loginMode: boolean;
  handleUserNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSecondPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLoginModeChange: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

/**
 * The Form that includes the input fields for the SignUp page
 */
function SignUpForm({
  userName,
  password,
  secondPassword,
  loginErrorMessage,
  loginMode,
  handleSubmit,
  handleUserNameChange,
  handlePasswordChange,
  handleSecondPasswordChange,
  handleLoginModeChange,
}: SignUpFormProps) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-4 w-100' controlId='formBasicUserName'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          type='text'
          placeholder='Enter Username'
          value={userName}
          data-testid='username-input'
          onChange={handleUserNameChange}
        />
      </Form.Group>
      <Form.Group className='mb-4 w-100' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type='password'
          placeholder='Enter Password'
          value={password}
          data-testid='password-input'
          onChange={handlePasswordChange}
        />
      </Form.Group>
      {!loginMode && (
        <Form.Group className='mb-4 w-100' controlId='formSecondPassword'>
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            required={!loginMode}
            type='password'
            placeholder='Repeat password'
            value={secondPassword}
            data-testid='second-password-input'
            onChange={handleSecondPasswordChange}
          />
        </Form.Group>
      )}
      {loginErrorMessage && (
        <Alert key='danger' variant='danger' className='mt-3' data-testid='error-message'>
          {loginErrorMessage}
        </Alert>
      )}
      <p className='ms-5'>
        {loginMode ? "Don't have an account?" : 'Already have an account?'}{' '}
        <a
          role='button'
          className='link-info'
          data-testid='login-mode'
          onClick={handleLoginModeChange}
        >
          {loginMode ? 'Register' : 'Login'} here
        </a>
      </p>
      <Button variant='primary' type='submit' className='w-100' data-testid='submit'>
        Submit
      </Button>
    </Form>
  );
}

export default SignUpForm;
