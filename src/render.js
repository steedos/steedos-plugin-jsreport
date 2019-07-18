import { getJsreport } from './index';

const renderReport = async (report) => {
    let htmlContent = report.getHtmlContent();
    let scriptContent = report.getScriptContent();
    let helperContent = report.getHelperContent();
    let data = await report.getData();
    let jsreport = await getJsreport();
    let resp = await jsreport.render({
        template: {
            content: htmlContent,
            scripts: [{
                content: scriptContent
            }],
            helpers: helperContent,
            engine: 'handlebars',
            recipe: 'text'
        },
        data: data
    });
    return resp;
}

export { renderReport };


