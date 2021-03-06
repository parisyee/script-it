import React, { PropTypes } from "react";
import ScreenplayEditor from "../components/screenplay-editor";

export default class Workspace extends React.Component {
  static propTypes = {
    bootstrapData: PropTypes.string.isRequired
  };

  render() {
    const screenplay = JSON.parse(this.props.bootstrapData);

    return (
      <div className="uk-height-1-1">
        <ScreenplayEditor
          title={screenplay.title}
          sections={screenplay.sections}
          url={screenplay.url}
          sectionsUrl={screenplay.sections_url} />
      </div>
    );
  }
}
