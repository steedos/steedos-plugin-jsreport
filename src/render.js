import { getJsreport } from './index';

const renderReport = async (report, { recipe = "text", filters = [] } = {}) => {
    let htmlContent = report.getHtmlContent();
    let scriptContent = report.getScriptContent();
    let helperContent = report.getHelperContent();
    let data = await report.getData();
    let jsreport = await getJsreport();
    let query = [];
    if (report.filters){
        query = report.filters;
    }
    if (filters.length){
        if (query.length){
            query = [query, "and", filters]
        }
        else{
            query = filters;
        }
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
        data: {
            data: data,
            query: query,
            report: report
        }
    });
    return resp;
}

export { renderReport };


