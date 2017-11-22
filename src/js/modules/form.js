
export default () => {
  'use strict';

  if (!Vue) {
    console.log('Vue is "undefined"');
    return;
  }

  Vue.debug = true;

  // Added custom validation
  VeeValidate.Validator.extend('nickname', {
    getMessage(field, params, data) {
      return (data && data.message) || 'Something went wrong';
    },
    validate(value) {
      return new Promise(resolve => {
        switch (value) {
          case "god":
          case "devil":
          case "president":
            resolve({
              valid: false,
              data: { message: 'Nickname can\'t by: "god", "devil", "president"' }
            });
            break;
          default:
            resolve({ valid: true, data: undefined });
        }
      });
    }
  });

  // Include validation plugin.
  Vue.use(VeeValidate);

  new Vue({
    el: '#form-app',
    data() {
      return {
        steps: ['registration', 'info'],
        stepIndex: 0,
        userInfo: {
          firstName: '',
          lastName: '',
          userEmail: '',
          userAge: '',
          userSkype: '',
          userHobby: '',
          userTelephone: '',
          nickname: ''
        },
        users: []
      };
    },
    methods: {
      addInfo() {
        const scopeName = this.steps[this.stepIndex];
        this.$validator.validateAll(scopeName).then((result) => {
          // Check validation stat
          if (result) {
            // Check form step
            if (this.stepIndex === this.steps.length - 1) {
              this.users.push(Object.assign({}, this.userInfo));
              // Save updated users to LocalStorage
              this.saveUsersToLocalStorage();
              // Reset from model
              Object.keys(this.userInfo).forEach(key => {
                this.userInfo[key] = '';
              });
              // Reset step
              this.stepIndex = 0;
              // Clear validation errors after model resetting
              setTimeout(()=>{
                this.$validator.errors.clear('registration');
              }, 0);
            } else if (this.stepIndex < this.steps.length - 1) {
              // Set next step
              this.stepIndex++;              
            }
          }
        });
      },
      back() {
        if (this.stepIndex > 0) {
          this.stepIndex--;
        }
      },
      deleteUser(index) {
        this.users.splice(index, 1);
        this.saveUsersToLocalStorage();
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
