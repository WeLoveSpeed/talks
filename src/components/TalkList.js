import React, { Component } from "react";
import _ from "lodash";
import { List, ListItem, makeSelectable } from "material-ui/List";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import CONFIG from "../config";

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue
      });
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        selectedIndex: nextProps.defaultValue
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

class TalkList extends Component {
  getFormat(format) {
    return null;
  }

  getTalk(talk, i) {
    if (talk.total !== null) {
      return (
        <ListItem
          key={i}
          value={i}
          onTouchTap={() => this.props.selectTalk(talk.id)}
          primaryText={talk[CONFIG.fields.title]}
          secondaryText={talk[CONFIG.fields.firstname]+' '+talk[CONFIG.fields.lastname]+' ('+talk[CONFIG.fields.from]+')'}
          rightIcon={<span>{talk.total}</span>}
          leftAvatar={this.getFormat(talk.formats)}
        />
      );
    }

    return null;
  }

  getSelectedTalkIndex() {
    if (this.props.selectedTalk === null) {
      return null;
    }
    return _.findIndex(this.props.talks, ["id", this.props.selectedTalk + 1]);
  }

  render() {
    const { talks } = this.props;
    return (
      <div className="TalkList">
        <div style={{ padding: "0 16px" }}>
          <SelectField
            style={{ width: "100%" }}
            floatingLabelText="Trier par"
            value={this.props.sortBy}
            onChange={(event, index, value) => this.props.sortTalks(value)}
          >
            <MenuItem value="date" primaryText="Date" />
            <MenuItem value="total" primaryText="Note totale" />
            <MenuItem value="nbNotes" primaryText="Nombre de notes" />
          </SelectField>
        </div>
        <SelectableList defaultValue={this.getSelectedTalkIndex()}>
          {talks.map((talk, i) => this.getTalk(talk, i))}
        </SelectableList>
      </div>
    );
  }
}

export default TalkList;
