import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    session: service('session'),

    actions: {
        authenticate() {
            this.set('isLoggingIn', true);
            this.set('errorMessage', '');
            const { identification, password } = this;
            this.session.authenticate('authenticator:oauth2', identification, password).catch((reason) => {
                this.set('errorMessage', reason.error);
            });
        }
    }
});
