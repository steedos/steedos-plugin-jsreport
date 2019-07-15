import _ from 'underscore';
import { default as routes } from './router';
import { initHtmls } from './html';
import { default as SteedosPlugin } from './plugin';
import appRoot from 'app-root-path';
const plugin = new SteedosPlugin();

export function initPlugin(app){
    let reportsDir = appRoot.resolve('/src');
    plugin.useReportFiles([reportsDir]);
    initHtmls(plugin.getReports());

    app.use(routes);
}

export function getReports() {
    return plugin.getReports();
}

export function getReportsConfig() {
    return plugin.getReportsConfig();
}

export function getReport(id) {
    return plugin.getReport(id);
}

export async function getJsreport() {
    return await plugin.getJsreport();
}

export { default as routes } from './router';
export * from './html';
export { plugin };
export default plugin;
