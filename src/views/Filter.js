var React = require('react');
var _ = require('lodash');

var FilterChild = React.createClass({
    
    render: function() {
        return <div className="filterChild">
            <span onClick={this.props.onFilter.bind(null, this.props.typeKey)}>{this.props.name}</span>
        </div>;
    }
});

var FilterParent = React.createClass({

    render: function() {
        var category = this.props.category;
        var children = category && _.map(category.types, function(type, key) {
            return <FilterChild onFilter={this.props.onFilter} name={type.name} typeKey={key} key={key}/>;
        }.bind(this));

        return <li className="filterParent">
            <span onClick={this.props.onSelect.bind(null, category.categoryKey)}>{this.props.category.name}</span>
            {this.props.open && children}
        </li>;
    }
});

var Filter = React.createClass({
    render: function () {
        var categories = this.props.categories;
        var items = categories && categories.map(function(category, i) {
            return <FilterParent open={category.categoryKey === this.props.selectedCat} category={category} onFilter={this.props.onFilter} onSelect={this.props.onSelectCategory} key={i}/>
        }.bind(this));
        
        return <div>
            {items}
        </div>;
    }
});

module.exports = Filter;