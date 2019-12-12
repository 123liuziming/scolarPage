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

const registerMutation = gql`
  mutation register($email: String!, $password: String!, $name: String!) {
    register(params: { email: $email, name: $name, password: $password }) {
      id
      token
      avatar
      role
      name
    }
  }
`;

function register(email, name, password) {
  return client.mutate({
    mutation: registerMutation,
    variables: { email, name, password },
    fetchPolicy: "no-cache"
  });
}

/**
 * @param {{email?: string, password?: string, name?: string, confirmedPassword?: string}} form
 * @returns {{valid: boolean, message?: string}}
 */
function checkRegisterFormValidity(form) {
  const emailAndPasswordValidity = checkLoginFormValidity(form);
  if (!emailAndPasswordValidity.valid) return emailAndPasswordValidity;
  if (!form.name) return { valid: false, message: "您必须提供姓名。" };
  if (form.confirmedPassword != form.password)
    return { valid: false, message: "您提供的两个密码不一致。" };
  return { valid: true };
}

const currentUserQuery = gql`
  query currentUser {
    currentUser {
      name
      id
      avatar
      email
    }
  }
`;

function getCurrentUser() {
  return client.query({ query: currentUserQuery });
}


export { login, checkLoginFormValidity, register, checkRegisterFormValidity, getCurrentUser };
