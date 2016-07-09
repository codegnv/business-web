var Filter = require('./views/Filter.js');
var Results = require('./views/Results.js');
var React = require('react');

//make a call to get business types

//make a call to get all files

var App = React.createClass({

    propTypes: function() {
        return {
            businessCategories: React.PropTypes.objectOf({
                name: React.PropTypes.string,
                types: React.PropTypes.objectOf({
                    name: React.PropTypes.string,
                    requiredPDFs: React.PropTypes.arrayOf({
                        title: React.PropTypes.string,
                        desc: React.PropTypes.string,
                        link: React.PropTypes.string
                    }),
                    optionalPDFs: React.PropTypes.array
                })
            })
        }
    },

    getInitialState: function() {
        return {
            filterType: false
        }
    },

    filterFilesByType: function(type) {
        this.setState({
            filterType: type
        })
    },

    render: function() {
        var categories = this.props.businessCategories;
        var files = categories.types.requiredPDFs;

        return <div>
            <Filter onFilter={this.filterFilesByType} categories={categories}/>
            <Results files={files}/>
        </div>
    }
});

global.app = function () {
    React.render(<App  />, document.getElementById('app'));
};
