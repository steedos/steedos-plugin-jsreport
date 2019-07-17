import { getHtmlContent } from './html';
import { getScriptContent } from './script';
import { getObject, getGraphQLSchema } from './utils';
import { graphql } from 'graphql';
export class SteedosReport { 
    constructor(config) {
        this._id = config._id
        this.name = config.name
        this.object_name = config.object_name
        this.fields = config.fields
        this.filters = config.filters
        this.description = config.description
        this.html_file = config.html_file
        this.script_file = config.script_file
        this.graphql = config.graphql
    }

    toConfig() {
        let config = {}
        config._id = this._id
        config.name = this.name
        config.object_name = this.object_name
        config.fields = this.fields
        config.filters = this.filters
        config.description = this.description
        config.html_file = this.html_file
        config.script_file = this.script_file
        config.graphql = this.graphql
        return config
    }

    getHtmlContent() {
        return getHtmlContent(this.toConfig())
    }

    getScriptContent() {
        return getScriptContent(this.toConfig())
    }

    async getData() {
        let config = this.toConfig();
        if (config.graphql) {
            let schema = getGraphQLSchema()
            let dataResult = await graphql(schema, config.graphql);
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
        else {
            let object = getObject(config.object_name);
            let dataResult = await object.find({
                fields: config.fields,
                filters: config.filters
            });
            let result = {};
            result[`${config.object_name}`] = dataResult;
            return result;
        }
    }
}

