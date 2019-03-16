import React, { Component } from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Talk from "./Talk";

const mockTalk = {
  prenom_first_name: "Boris",
  nom_last_name: "Schapira",
  courriel_e_mail: "test@test.com",
  titre_title: "Wesh, bien ou bien ?",
  description: "Ceci est la description.",
  url_de_profil_principal_main_profile_url: "https://twitter.com/_welovespeed",
  url_dune_photo_de_vous_profile_picture_url: "https://pbs.twimg.com/profile_images/1049198944826417152/w4Vfcyja_400x400.jpg",
  horodateur: "12/03/2019 16:04:23",
  duree_duration: "45 minutes",
  type_dintervention_talk_level: "Approfondissement / Deep Dive",
  langue_language: "Français",
  un_message_a_laisser_a_lequipe_organisatrice_do_you_have_a_message_for_the_organizing_team: "Ceci est le message.",
  where_will_you_come_from: "Outta here."
};

describe("Talk component", () => {
  it("should renders correctly", () => {
    const component = shallow(<Talk talk={mockTalk} />);
    expect(component).toMatchSnapshot();
  });
});
