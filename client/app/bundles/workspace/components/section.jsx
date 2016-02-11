import React, { PropTypes } from "react";
import $ from "jquery";
import _ from "lodash";

export default class Section extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    onTitleChange: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.AUTOSAVE_TIMER = null;
    this.state = { section: {} };

    _.bindAll(this, ["handleChange", "handleTitleChange"]);
  };

  componentDidMount() {
    $.ajax({
      url: this.props.url,
      method: "GET",
      dataType: "json",
      success: ((data) => {
        this.setState({section: data});
      }).bind(this),
      error: ((xhr, status, error) => {
        console.log(error);
      })
    });
  };

  buildSection() {
    return {
      title: this.state.section.title,
      notes: this.state.section.notes
    };
  };

  handleChange() {
    this.setState((oldState) => {
      const section = oldState.section;
      section.title = this.refs.title.value;
      section.notes = this.refs.notes.value;

      return { section: section };
    }, () => {
      this.queueAutosave();
    });
  };

  handleTitleChange() {
    this.props.onTitleChange(this.refs.title.value);
    this.handleChange();
  };

  queueAutosave() {
    if (this.AUTOSAVE_TIMER) {
      clearTimeout(this.AUTOSAVE_TIMER);
    }

    $("#autosave-indicator").html("Unsaved Changes");

    this.AUTOSAVE_TIMER = setTimeout(function() {
      this.saveSection();
      this.AUTOSAVE_TIMER = null;
    }.bind(this), 1750);
  };

  saveSection() {
    $("#autosave-indicator").html("Saving Changes...");

    $.ajax({
      url: this.props.url,
      method: "PUT",
      data: { section: this.buildSection() },
      dataType: "json",
      beforeSend: ((xhr) => {
        xhr.setRequestHeader(
          'X-CSRF-Token',
          $('meta[name=csrf-token]').attr('content')
        );
      }),
      success: ((data) => {
        $("#autosave-indicator").html("Changes Saved");
      }).bind(this),
      error: (xhr, status, err) => {
        console.log(err);
      }
    });
  };

  render() {
    return(
      <div className="section">
        <input
          name="section[title]"
          ref="title"
          onInput={this.handleTitleChange}
          value={this.state.section.title} />
        <textarea
          name="section[notes]"
          ref="notes"
          onInput={this.handleChange}
          value={this.state.section.notes}></textarea>
      </div>
    );
  }
}
