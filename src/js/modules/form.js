
export default () => {
  'use strict';

  if (!Vue) {
    console.log('Vue is "undefined"');
    return;
  }

  Vue.debug = true;
  // Include validation plugin.
  Vue.use(VeeValidate);

  new Vue({
    el: '#form-app',
    data() {
      return {
        userInfo: {
          firstName: '',
          lastName: '',
          userEmail: '',
          userAge: '',
          userSkype: ''
        },
        users: []
      };
    },
    methods: {
      addInfo() {
        this.users.push(Object.assign({}, this.userInfo));
        this.saveUsersToLocalStorage();
        Object.keys(this.userInfo).forEach(key => {
          this.userInfo[key] = '';
        });
      },
      saveUsersToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(this.users));
      },
      loadUsersFromLocalStorage() {
        const users = JSON.parse(localStorage.getItem("users"));
        if (users) {
          this.users = users;
        }
      }
    },
    created() {
      this.loadUsersFromLocalStorage();
    }
  });
};
