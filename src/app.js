var Filter = require('./views/Filter.js');
var Results = require('./views/Results.js');
var React = require('react');
var ReactDOM = require('react-dom');

//make a call to get business types

//make a call to get all files

var App = React.createClass({

    propTypes: function() {
        return {
            categories: React.PropTypes.objectOf({
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
            currentCategory: false,
            currentType: false
        }
    },

    setCurrentCategory: function(selectedCat) {

        var categories = this.props.categories;
        var cat;

        categories.map(function(category) {
            if (category.categoryKey === selectedCat) {
                cat = category;
            }
        });

        this.setState({
            currentTypes: cat.types,
            currentCategory: selectedCat
        });
    },

    setCurrentType: function(type) {
        this.setState({
            currentType: type
        });
    },

    render: function() {
        var currentType = this.state.currentType;
        var types = this.state.currentTypes;
        var type = currentType && types && types[currentType];

        return <div>
            <Filter onFilter={this.setCurrentType} onSelectCategory={this.setCurrentCategory} selectedCat={this.state.currentCategory} categories={this.props.categories}/>
            <Results required={type.requiredPDFs} optional={type.optionalPDfs}/>
        </div>
    }
});

global.app = function () {
    ReactDOM.render(<App categories={json.categories} />, document.getElementById('app'));
};
