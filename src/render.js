import { getJsreport } from './index';

const renderReport = async (report, { recipe = "text", user_filters = [], user_session = {} } = {}) => {
    let htmlContent = report.getHtmlContent();
    let scriptContent = report.getScriptContent();
    let helperContent = report.getHelperContent();
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
            report: report,
            user_session: user_session,
            root_url: process.env.ROOT_URL,
            root_url_intranet: process.env.ROOT_URL_INTRANET
        }
    });
    return resp;
}

export { renderReport };


