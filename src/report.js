export class SteedosReport { 
    constructor(config) {
        this._id = config._id
        this.name = config.name
        this.object_name = config.object_name
        this.fields = config.fields
        this.filters = config.filters
        this.description = config.description
        this.html_file = config.html_file
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
        config.graphql = this.graphql
        return config
    }
}

