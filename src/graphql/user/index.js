// @ts-check

import gql from "graphql-tag";
import client from "../client";

const loginQuery = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      id
      avatar
      role
      name
    }
  }
`;

/**
 * @param {string} email
 * @param {string} password
 * @returns Information related with the user logged in. The `data` field should contain an object with
 * the user's id (`id`), avatar (`avatar`), role (`role`, 1 if admin else 0). name (`name`) and JWT
 * token (`token`),
 */
function login(email, password) {
  return client.query({
    query: loginQuery,
    variables: { email, password },
    fetchPolicy: "network-only"
  });
}

/**
 * @param {{email: string?, password: string?}} form
 * @returns {{valid: boolean, message?: string}}
 */
function checkLoginFormValidity(form) {
  if (!!form.email && !!form.password) return { valid: true };
  if (!form.email) return { valid: false, message: "E-Mail 不能为空。" };
  if (!form.password) return { valid: false, message: "密码不能为空。" };
}

export { login, checkLoginFormValidity };
