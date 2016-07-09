var React = require('react');

var ResultItem = React.createClass({
    
    render: function() {
        return <div>
            <div>
                {this.props.item.title}
                <a href={this.props.item.link} target="_blank"><i class="ion-android-download"></i></a>
            </div>
            <p>
                {this.props.item.desc}
            </p>
        </div>;
    }
});

var Results = React.createClass({
    render: function () {
        var items = this.props.files.map(function(item, i) {
            return <ResultItem item={item}/>
        }.bind(this));
        
        return <div>
            {items}
        </div>;
    }
});

module.exports = Results;