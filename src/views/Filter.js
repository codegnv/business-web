var React = require('react');

var FilterChild = React.createClass({
    
    render: function() {
        return <li class="filterChild">
            <span onClick={this.props.onFilter.bind(null, this.props.itemKey)}>{this.props.item.name}</span>
        </li>;
    }
});

var FilterParent = React.createClass({

    getInitialState: function() {
        return {
            open: false
        }
    },

    onToggleDropdown: function() {
        this.setState({
            open: !this.state.open
        })
    },

    render: function() {
        var children = this.props.item.childTypes.map(function(type, key) {
            return <FilterChild onFilter={this.props.onFilter} name={type} itemKey={key} key={key}/>;
        }.bind(this));


        return <li class="filterParent">
            <span onClick={this.onToggleDropdown}>{this.props.item.name}</span>
            {this.state.open && children}
        </li>;
    }
});

var Filter = React.createClass({
    render: function () {
        var items = this.props.businessCategories.map(function(category, i) {
            return <FilterParent item={category} onFilter={this.props.onFilter} key={i}/>
        }.bind(this));
        
        return <div>
            {items}
        </div>;
    }
});

module.exports = Filter;