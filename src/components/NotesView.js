import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import KeyboardArrowDown
  from "material-ui/svg-icons/hardware/keyboard-arrow-down";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class NotesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voteOpen: false,
      ownNote: props.ownNote
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ownNote !== this.state.ownNote) {
      this.setState({
        ownNote: nextProps.ownNote
      });
    }
  }

  handleNestedListToggle = () => {
    this.setState({
      voteOpen: !this.state.voteOpen
    });
  };

  handleNoteChange = (event, index, value) => {
    this.setState({
      ownNote: value
    });
    this.props.vote(this.props.ownName, value);
  };

  getownNote() {
    const { ownName, myProfileName } = this.props;
    if (ownName === null) {
      return (
        <TableRow>
          <TableRowColumn>
            Ton nom ({myProfileName}) n'est pas dans la liste des votants.
          </TableRowColumn>
          <TableRowColumn />
        </TableRow>
      );
    }

    return (
      <SelectField
        id="ownNote"
        floatingLabelText={`Ma note (${ownName})`}
        style={{ width: 200 }}
        value={this.state.ownNote}
        onChange={this.handleNoteChange}
      >
        <MenuItem value={-5} primaryText="SNIP SNIP (-5)" />
        <MenuItem value={-2} primaryText="Plutôt non (-2)" />
        <MenuItem value={-1} primaryText="Bof (-1)" />
        <MenuItem value={0} primaryText="Pas de vote (0)" />
        <MenuItem value={1} primaryText="Ok (1)" />
        <MenuItem value={2} primaryText="Intéressant (2)" />
        <MenuItem value={5} primaryText="DO WANT! (5)" />
      </SelectField>
    );
  }

  getDetailsNote() {
    console.log(this.props);
    if (!this.state.voteOpen) {
      return null;
    }

    const { othersNote } = this.props;
    let othersNoteRow = othersNote.map((member, i) => {
      if (member[1] !== undefined) {
        return (
          <TableRow key={i}>
            <TableRowColumn>{member[0]}</TableRowColumn>
            <TableRowColumn>{member[1]}</TableRowColumn>
          </TableRow>
        );
      }
      return null;
    });

    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Prénom</TableHeaderColumn>
            <TableHeaderColumn>Note</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {othersNoteRow}
        </TableBody>
      </Table>
    );
  }

  render() {
    const iconStyle = { transform: "rotate(180deg)" };

    return (
      <div>
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span style={{ flex: 1 }}>
            <strong>Note globale&nbsp;:&nbsp;{this.props.globalNote} <small>({this.props.nbNotes} note{this.props.nbNotes > 1 ? 's' : ''})</small></strong>
          </span>
          {this.getownNote()}
          <IconButton
            onClick={() => this.handleNestedListToggle()}
            touch={true}
            tooltip="Détail des votes"
          >
            <div style={iconStyle}>
              <KeyboardArrowDown />
            </div>
          </IconButton>
        </div>
        {this.getDetailsNote()}
      </div>
    );
  }
}

export default NotesView;
