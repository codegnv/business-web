var React = require('react');

var ResultItem = React.createClass({
    
    render: function() {
        var classes = 'resultItem ';

        if (this.props.optional) {
            classes += ' optional';
        }

        return <div className={classes}>
            <div>
                {this.props.item.title}
                <a href={this.props.item.link} target="_blank"><i className="ion-android-download"></i></a>
            </div>
            <p>
                {this.props.item.desc}
            </p>
        </div>;
    }
});

var Results = React.createClass({
    render: function () {
        var required = this.props.required;
        var optional = this.props.optional;
        var items = required && required.map(function(item, i) {
            return <ResultItem item={item} key={i}/>
        }.bind(this));

        if (optional) {
            optional.map(function(item) {
                items.push(<ResultItem item={item} optional={true}/>);
            });
        }
        
        return <div>
            {items}
        </div>;
    }
});

module.exports = Results;