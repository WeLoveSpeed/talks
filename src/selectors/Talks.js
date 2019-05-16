/* eslint-disable */

import _ from "lodash";
import slug from "slug";

export const getPrettyColumnNames = str => {
  return slug(str, {
    lower: true,
    replacement: "_"
  });
};

export const parseTalks = talks => {
  let talksArray = [];
  for (let i = 0; i < talks.length; i++) {
    var row = talks[i];
    let talk = {};

    if (i !== 0) {
      talks[0].map((field, j) => {
        let content = row[j];
        let column = getPrettyColumnNames(field);

        if (content !== undefined) {
          if (column === "note") {
            return talk[column] = Number(content);
          }
          return talk[column] = content;
        }
      });
      talk.id = i;

      if (talk.titre_de_ta_presentation !== "") {
        talksArray.push(talk);
      }
    }
  }

  return talksArray;
};

export const getFilteredList = state => {
  const { talks, notes, filter, sortBy } = state;
  let sortedTalks = notes !== null
    ? _.map(talks, talk => {
        console.log(notes[talk.id - 1][name]);
        talk.total = notes[talk.id - 1].total;
        talk.nbNotes = notes[talk.id - 1].nbNotes;
        return talk;
      })
    : talks;

  sortedTalks = _.sortBy(sortedTalks, sortBy);

  if (sortBy === "note" || sortBy === "total") {
    sortedTalks.reverse();
  }

  return sortedTalks;
};
