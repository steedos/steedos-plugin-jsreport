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

    getObjectConfig() {
        return getObject(this.object_name).toConfig();
    }

    getRequiredFilters() {
        // 找到过滤条件中必填且值未设置的选项
        if (this.filters && this.filters.length) {
            return this.filters.filter((item) => {
                return item.is_required && (item.value === undefined || item.value === null);
            });
        }
        else{
            return [];
        }
    }

    getMissingRequiredFilters(user_filters) {
        // 检查user_filters中是否有缺失的必要过滤条件
        let requiredFilters = this.getRequiredFilters();
        if (requiredFilters.length) {
            if (user_filters && user_filters.length) {
                if (typeof user_filters[0] === "string"){
                    // 如果只有一层，即user_filters值格式为：["HPK_PAYBILL","=","1001B21000000002ETKD"]
                    user_filters = [user_filters];
                }
                return requiredFilters.filter((item)=>{
                    return !user_filters.find((userFilter)=>{
                        if (userFilter.field){
                            // 非数组格式
                            return userFilter.field === item.field && userFilter.value !== undefined && userFilter.value !== null
                        }
                        else{
                            // 数组格式
                            return userFilter[0] === item.field && userFilter[2] !== undefined && userFilter[2] !== null
                        }
                    })
                });
            }
            else {
                return requiredFilters;
            }
        }
        else{
            return [];
        }
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

    async render({ recipe = "text", user_filters = [], user_session = {}, query = {} } = {}) {
        return await renderReport(this, { recipe, user_filters, user_session, query });
    }
}

