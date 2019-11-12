import plugin, { getJsreport } from './index';

const renderReport = async (report, { recipe = "text", user_filters = [], user_session = {}, query = {} } = {}) => {
    let htmlContent = report.getHtmlContent();
    let scriptContent = report.getScriptContent();
    let helperContent = report.getHelperContent();
    let objectConfig = report.getObjectConfig();
    let reportConfig = report.toConfig();
    let data = await report.getData(user_filters, user_session);
    let jsreport = await getJsreport();
    let resp = await jsreport.render({
        template: {
            content: htmlContent,
            scripts: [{
                content: scriptContent
            }],
            helpers: helperContent,
            engine: 'handlebars',
            recipe: recipe
        },
        data: {
            data: data,
            user_filters: user_filters.length ? user_filters : report.filters,
            user_session: user_session,
            env: process.env,
            settings: plugin.settings,
            report_config: reportConfig,
            object_config: objectConfig,
            query
        }
    });
    return resp;
}

export { renderReport };


