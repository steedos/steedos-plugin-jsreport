import { getJsreport } from './index';

const renderReport = async (report, { recipe = "text", user_filters = [], auth_token = "" } = {}) => {
    let htmlContent = report.getHtmlContent();
    let scriptContent = report.getScriptContent();
    let helperContent = report.getHelperContent();
    let data = await report.getData(user_filters);
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
            report: report,
            auth_token: auth_token
        }
    });
    return resp;
}

export { renderReport };


