export const BASE_URL = 'http://api.doesntmatter.nomoredomains.xyz';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    if (res.status === 201){
      return res.json();
    }
  })
  .catch((err) => console.log(err));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then((response => response.json()))
  .catch(err => {console.log(err)})
}

export const logout = () => {
  return fetch(`${BASE_URL}/users/me/logout`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
  })
  .catch(err => {console.log(err)})
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then((data) => {
    return data;
  })
}
