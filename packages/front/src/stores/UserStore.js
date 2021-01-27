import { createContext } from 'react'

import { makeAutoObservable } from "mobx";
import apiRequest from 'api-request';
class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser() {
    try {
      this.user = await apiRequest.get('users/current-user').json();
    } catch (err) {
      this.user = null;
    }
  }
}

export const UserContext = createContext();
export default UserStore;
