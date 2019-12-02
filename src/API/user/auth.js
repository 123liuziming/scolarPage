import client from "../globalClient";
import gql from 'graphql-tag'

/**
 * Try to login with the given username and password.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {object} An object containing relavent user information,
 * or a standard error object.
 */
export async function login(email, password) {
  const mutation = gql`
    mutation {
      login(email:"${email}", password:"${password}") {
        name,
        role
      }
    }
  `;
  const { data, error } = await client.mutate({ mutation });
  return data.login;
}
