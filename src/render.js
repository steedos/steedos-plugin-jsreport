import { getJsreport } from './index';

const renderReport = async (report, recipe) => {
    let htmlContent = report.getHtmlContent();
    let scriptContent = report.getScriptContent();
    let helperContent = report.getHelperContent();
    let data = await report.getData();
    let jsreport = await getJsreport();
    if (!recipe){
        recipe = "text";
    }
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
        data: data
    });
    return resp;
}

export { renderReport };


