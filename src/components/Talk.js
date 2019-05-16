import React, { Component } from "react";
import moment from "moment";
import md5 from "js-md5";

import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import CommunicationEmail from "material-ui/svg-icons/communication/email";
import {
  red500,
  lightBlack,
  orange500
} from "material-ui/styles/colors";
import Chip from "material-ui/Chip";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";

import CONFIG from "../config";
import Notes from "../containers/Notes";

class Talk extends Component {
  getDate(date) {
    console.log(date);

    return moment(date, "DD/MM/YYYY").format("DD/MM/YYYY");
  }

  getText(text) {
    if (!text) {
      return false;
    }

    const paragraphs = text.match(/[^\r\n]+/g);
    if (paragraphs === null) {
      return false;
    }
    return paragraphs.map((p, key) => <p key={key}>{p}</p>);
  }

  getAvatar(profile_url, email) {
    if (!!profile_url || CONFIG.fields.profile_url !== " ") {
      return <Avatar src={profile_url} />
    } else {
      const hash = md5(email.toLowerCase());
      if (email) {
        return <Avatar src={`https://www.gravatar.com/avatar/${hash}`} />;
      }
    }

    return null;
  }

  sendMail(email) {
    window.location = `mailto:${email}`;
  }

  getProfile(talk) {
    if (!talk[CONFIG.fields.email] || talk[CONFIG.fields.email] === " ") {
      return (
        <ListItem
          disabled={true}
          primaryText={
            (
              <span>
                {talk[CONFIG.fields.firstname]} {talk[CONFIG.fields.lastname]}
                <span style={{ color: lightBlack }}>
                  , le {this.getDate(talk[CONFIG.fields.timestamp])}
                </span>
              </span>
            )
          }
          leftAvatar={this.getAvatar(talk[CONFIG.fields.profile_url], talk[CONFIG.fields.email])}
        />
      );
    }

    const iconButtonElement = (
      <IconButton
        onClick={() => this.sendMail(talk[CONFIG.fields.email])}
        touch={true}
        tooltipPosition="top-right"
        style={{ padding: 0, width: 32 }}
      >
        <CommunicationEmail color={red500} />
      </IconButton>
    );

    return (
      <ListItem
        disabled={true}
        primaryText={
          (
            <span>
              {talk[CONFIG.fields.firstname]+' '+talk[CONFIG.fields.lastname]}
              <span style={{ color: lightBlack }}>
                , le {this.getDate(talk[CONFIG.fields.timestamp])}
              </span>
            </span>
          )
        }
        secondaryText={talk[CONFIG.fields.email]+ ' – ' + talk[CONFIG.fields.from]}
        leftAvatar={this.getAvatar(talk[CONFIG.fields.profile_url], talk[CONFIG.fields.email])}
        rightIcon={iconButtonElement}
      />
    );
  }

  render() {
    const { talk } = this.props;
    if (talk === null) {
      return null;
    }

    const formatStyle = {
      backgroundColor: orange500,
      marginTop: ".85em"
    };

    return (
      <section className="Wrapper">
        <div className="Talk">
          <h2>{talk[CONFIG.fields.title]}</h2>
          <Chip labelColor="white" style={formatStyle}>{talk.formats}</Chip>
          <Notes />

          <Divider />
          <List>
            {this.getProfile(talk)}
          </List>
          <Divider />
          
          <h3>{talk[CONFIG.fields.type]} ({talk[CONFIG.fields.format]})</h3>
          {this.getText(talk[CONFIG.fields.description])}

          <h3>Bio</h3>
          {this.getText(talk[CONFIG.fields.bio])}

          <h3>Message pour l'équipe / Message for the team</h3>
          {this.getText(talk[CONFIG.fields.message])}

        </div>
      </section>
    );
  }
}

export default Talk;
