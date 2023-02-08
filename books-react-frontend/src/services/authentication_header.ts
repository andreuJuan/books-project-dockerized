/**
 * The function that gets the JWT authentication header stores in the local storage
 */
export default function authHeader() {
  const userStr = localStorage.getItem('user');
  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user?.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
  } else {
    return { Authorization: '' };
  }
}
