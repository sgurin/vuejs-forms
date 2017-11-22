
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

        this.$validator.validateAll().then((result) => {
          // Check validation stat
          if (result) {
            this.users.push(Object.assign({}, this.userInfo));
            // Reset from model
            Object.keys(this.userInfo).forEach(key => {
              this.userInfo[key] = '';
            });
            // Clear validation errors after model resetting
            Vue.nextTick(() => {
              this.$validator.clean();
            });
          }
        });

      }
    },
    created() {
      console.log('Vue app is loaded');
    }
  });
};
