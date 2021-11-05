"use strict";
const project = require('./package.json');
const packageName = project.name;
const packageLoader = require('@steedos/service-package-loader');
// const init = require('./lib/index').init;
const init = require('./main/default').init;
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 * 软件包服务启动后也需要抛出事件。
 */
module.exports = {
    name: packageName,
    namespace: "steedos",
    mixins: [packageLoader],
    /**
     * Settings
     */
    settings: {
		packageInfo: {
			path: __dirname,
			name: packageName
		}
    },

    /**
     * Dependencies
     */
    dependencies: [],

    /**
     * Actions
     */
    actions: {

    },

    /**
     * Events
     */
    events: {

    },

    /**
     * Methods
     */
    methods: {
        init: function (context) {
        }
    },

    /**
     * Service created lifecycle event handler
     */
    async created() {
    },

    /**
     * Service started lifecycle event handler
     */
    async started() {
        init();
    },

    /**
     * Service stopped lifecycle event handler
     */
    async stopped() {
    }
};
