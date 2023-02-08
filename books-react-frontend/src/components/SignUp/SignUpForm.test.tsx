import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import SignUpForm from './SignUpForm';
import { type SignUpFormProps } from './SignUpForm';

function renderSignUpForm(props: Partial<SignUpFormProps> = {}) {
  const defaultProps: SignUpFormProps = {
    userName: '',
    password: '',
    secondPassword: '',
    loginErrorMessage: '',
    loginMode: true,
    handleUserNameChange() {},
    handlePasswordChange() {},
    handleSecondPasswordChange() {},
    handleLoginModeChange() {},
    handleSubmit() {},
  };

  return render(<SignUpForm {...defaultProps} {...props} />);
}

describe('SignUpForm ', () => {
  test('should display a blank sign up form with email and password fields in LogIn mode', () => {
    const { getByTestId, queryByTestId } = renderSignUpForm();

    const usernameInput = getByTestId('username-input');
    const passwordInput = getByTestId('password-input');
    const secondPasswordInput = queryByTestId('second-password-input');
    const errorMessage = queryByTestId('error-message');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(secondPasswordInput).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('should display a blank sign up form with email, password and secondPassword fields in SignUp mode', () => {
    const { getByTestId } = renderSignUpForm({ loginMode: false });

    const usernameInput = getByTestId('username-input');
    const passwordInput = getByTestId('password-input');
    const secondPasswordInput = getByTestId('second-password-input');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(secondPasswordInput).toBeInTheDocument();
  });

  test('should prefill received values', () => {
    const { getByTestId } = renderSignUpForm({
      userName: 'username',
      password: 'password',
      secondPassword: 'password',
      loginErrorMessage: 'something happened',
      loginMode: false,
    });

    const usernameInput = getByTestId('username-input');
    const passwordInput = getByTestId('password-input');
    const secondPasswordInput = getByTestId('second-password-input');
    const errorMessage = getByTestId('error-message');

    expect(usernameInput).toHaveAttribute('value', 'username');
    expect(passwordInput).toHaveAttribute('value', 'password');
    expect(secondPasswordInput).toHaveAttribute('value', 'password');
    expect(errorMessage).toHaveTextContent('something happened');
  });

  test('should trigger handleUserNameChange on changing a username', async () => {
    const handleUserNameChange = jest.fn();
    const { getByTestId } = renderSignUpForm({
      handleUserNameChange,
    });

    const usernameInput = getByTestId('username-input');
    fireEvent.change(usernameInput, { target: { value: 'username' } });

    expect(handleUserNameChange).toHaveBeenCalled();
  });

  test('should trigger handlePasswordChange on changing the password', async () => {
    const handlePasswordChange = jest.fn();
    const { getByTestId } = renderSignUpForm({
      handlePasswordChange,
    });

    const passwordInput = getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(handlePasswordChange).toHaveBeenCalled();
  });

  test('should trigger handleSecondPasswordChange on changing the second password', async () => {
    const handleSecondPasswordChange = jest.fn();
    const { getByTestId } = renderSignUpForm({
      handleSecondPasswordChange,
      loginMode: false,
    });

    const secondPasswordInput = getByTestId('second-password-input');
    fireEvent.change(secondPasswordInput, { target: { value: 'password' } });

    expect(handleSecondPasswordChange).toHaveBeenCalled();
  });
  test('should trigger handleLoginModeChange on clicking the loginMode button', async () => {
    const handleLoginModeChange = jest.fn();
    const { getByTestId } = renderSignUpForm({
      handleLoginModeChange,
    });

    const loginModeButton = getByTestId('login-mode');
    fireEvent.click(loginModeButton);

    expect(handleLoginModeChange).toHaveBeenCalled();
  });

  test('should submit when submit button is clicked', async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    const { getByTestId } = renderSignUpForm({
      handleSubmit,
    });

    const submit = getByTestId('submit');
    fireEvent.click(submit);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
