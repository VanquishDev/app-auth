import { Auth } from 'aws-amplify';

/**
 *
 * @returns boolean
 */
export const checkUserAuthenticated = () => {
  try {
    const user = false // await Auth.currentAuthenticatedUser();
    const isAuthenticated = user ? true : false;
    return isAuthenticated;
  } catch (error) {
    console.log(error);
  }
};
