import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { notEmpty } from '@ember/object/computed';

const host = window.location.host;

export default Component.extend({

    websockets: service('socket-io'),
    namespace: 'catfood',

    socket: null,
    feedNowStatus: null,
    serverStatus: null,
    messages: null,
    isBusy: false,
    cronJobEnglish: null,

    init() {
        this._super(...arguments);

        this.set('serverStatus', '(Waiting for server status...)');
        this.set('feedNowStatus', '');
        this.set('messages', []);
        this.set('cronJobEnglish', null);

        this.set('jobs', []);
    },

    hasJobs: notEmpty('jobs'),
    hasPhoto: notEmpty('latestPhoto'),

    didInsertElement() {
        this._super(...arguments);

        const socket = this.websockets.socketFor(`ws://${host}/`);
        socket.connect();

        // Event handlers
        socket.on('connect', this.openHandler, this);
        socket.on('disconnect', this.disconnectHandler, this);
        socket.on('server-status', this.serverStatusHandler, this);
        socket.on('job-status', this.jobStatusHandler, this);
        socket.on('operation-status', this.operationStatusHandler, this);
        socket.on('message', this.messageHandler, this);

        this.set('socket', socket);
    },

    willDestroyElement() {
        this._super(...arguments);

        const socket = this.socket;
        socket.off('connect', this.openHandler);
        socket.off('server-status', this.serverStatusHandler);
        socket.off('operation-status', this.operationStatusHandler);
        socket.off('message', this.messageHandler);
    },

    openHandler(event) {

        this.set('serverStatus', 'Connected.');

        // eslint-disable-next-line no-console
        console.log(`On open event has been called: ${event}`);
    },

    disconnectHandler(event) {

        this.set('serverStatus', 'Disconnected!');

        // eslint-disable-next-line no-console
        console.log(`On open event has been called: ${event}`);
    },

    serverStatusHandler(data) {
        this.set('serverStatus', data.timestamp);
    },

    jobStatusHandler(data) {
        this.set('jobs', data.jobs);
    },

    operationStatusHandler(data) {

        if (data.operation === 'latest-photo') {
            this.set('latestPhoto', data.latestPhoto);
        }

        this.set('operationStatus', data.status);
        this.messages.insertAt(0, data);

        if (data.complete) {
            this.set('isBusy', false);
        }
    },

    messageHandler(event) {
        this.set('extraMessage', event);
    },

    actions: {

        doorClose() {
            this.set('isBusy', true);
            this.socket.emit('operation', {
                operation: 'door-close'
            });
        },

        doorOpen() {
            this.set('isBusy', true);
            this.socket.emit('operation', {
                operation: 'door-open'
            });
        },

        regularFeedingNow() {
            this.set('isBusy', true);
            this.socket.emit('operation', {
                operation: 'feed-now',
                servingSize: 1
            });
        },

        addJob() {
            this.set('isBusy', true);
            this.socket.emit('operation', {
                operation: 'add-job',
                english: this.cronJobEnglish
            });
        },

        deleteJob(jobId) {
            this.set('isBusy', true);
            this.socket.emit('operation', {
                operation: 'delete-job',
                jobId: jobId
            });
        },

        takePhoto() {
            this.set('isBusy', true);
            this.socket.emit('operation', {
                operation: 'take-photo'
            });
        }

    }

});
