import { getHtmlContent } from './html';
import { getScriptContent } from './script';
import { getHelperContent } from './helper';
import { getObject, getGraphQLSchema } from './utils';
import { renderReport } from './render';
import { graphql } from 'graphql';
export class SteedosReport { 
    constructor(config) {
        if (config) {
            this._id = config._id
            this.name = config.name
            this.object_name = config.object_name
            this.data_source = config.data_source
            this.fields = config.fields
            this.filters = config.filters
            this.description = config.description
            this.graphql = config.graphql
            this.html = config.html
            this.script = config.script
            this.helper = config.helper
            this.html_file = config.html_file
            this.script_file = config.script_file
            this.helper_file = config.helper_file
        }
    }

    toConfig() {
        let config = {}
        config._id = this._id
        config.name = this.name
        config.object_name = this.object_name
        config.data_source = this.data_source
        config.fields = this.fields
        config.filters = this.filters
        config.description = this.description
        config.graphql = this.graphql
        config.html = this.html
        config.script = this.script
        config.helper = this.helper
        config.html_file = this.html_file
        config.script_file = this.script_file
        config.helper_file = this.helper_file
        return config
    }

    getHtmlContent() {
        return this.html ? this.html : getHtmlContent(this.toConfig())
    }

    getScriptContent() {
        return this.script ? this.script : getScriptContent(this.toConfig())
    }

    getHelperContent() {
        return this.helper ? this.helper : getHelperContent(this.toConfig())
    }

    async getData(user_filters, user_session) {
        if (this.data_source === "graphql" && this.graphql) {
            let schema = getGraphQLSchema()
            let dataResult = await graphql(schema, this.graphql);
            dataResult = dataResult['data'];
            /**
                返回结果{
                "object_name": [{
                    "_id": "R9HquKmR5fHbDqdWq",
                    "name": "测试1",
                    "organization": {
                        "_id": "P7XMJMjKoSz4yaK49",
                        "name": "组织A"
                    }
                }]
                }
            **/
            return dataResult;
        }
        else if (this.data_source === "odata") {
            let filters = [];
            if (this.filters) {
                filters = this.filters;
            }
            if (user_filters && user_filters.length) {
                if (filters.length) {
                    filters = [filters, "and", user_filters]
                }
                else {
                    filters = user_filters;
                }
            }
            let object = getObject(this.object_name);
            let dataResult = await object.find({
                fields: this.fields,
                filters: filters
            }, user_session.spaceId ? user_session : null);
            let result = {};
            result[`${this.object_name}`] = dataResult;
            return result;
        }
        else{
            console.warn("The property data_source is required to fetch data.");
            return {};
        }
    }

    async render({ recipe = "text", user_filters = [], user_session = {} } = {}) {
        return await renderReport(this, { recipe, user_filters, user_session });
    }
}

