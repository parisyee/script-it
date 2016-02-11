var ScreenplaySectionList = React.createClass({
  getInitialState: function() {
    return { sections: this.props.sections };
  },

  sectionNodes: function() {
    var nodes = this.state.sections.map(function(section, i) {
      return (
        <ScreenplaySection
          key={i}
          index={i}
          section={section}
          onSectionChange={this.props.onSectionChange} />
      );
    }.bind(this));

    return nodes;
  },

  render: function() {
    return (
      <div className="section-list uk-height-1-1" style={ { minHeight: 40 } }>
        {this.sectionNodes()}
      </div>
    );
  }
});