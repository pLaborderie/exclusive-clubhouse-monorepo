import { createContext } from 'react'

import { makeAutoObservable } from "mobx";
import ky from 'ky';

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser() {
    try {
      this.user = await ky.get('http://localhost:3000/users/current-user', { credentials: 'include' }).json();
      console.log(this.user);
    } catch (err) {
      this.user = null;
    }
  }
}

export const UserContext = createContext();
export default UserStore;
