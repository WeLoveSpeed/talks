import {
  getPrettyColumnNames,
  parseTalks,
  getFilteredList
} from "./Talks";

describe("Talks selectors", () => {
  it(
    "getPrettyColumnNames should return a string without spaces and special chars",
    () => {
      expect(getPrettyColumnNames("Ceci est un test")).toEqual(
        "ceci_est_un_test"
      );
    }
  );

  it("parseTalks should return talks array", () => {
    const talksMock = [
      ["Title", "Description", "Note"],
      ["Test 1", "voici mon test", "2.00"],
      ["Test 2", "bonjour", "-8.00"]
    ];
    const expectedResponse = [
      { title: "Test 1", id: 1, description: "voici mon test", note: 2 },
      { title: "Test 2", id: 2, description: "bonjour", note: -8 }
    ];
    expect(parseTalks(talksMock)).toEqual(expectedResponse);
  });

  describe("getFilteredList", () => {
    it("should return all talks if no filter and no sortBy", () => {
      const state = {
        talks: [
          { title: "Test 1", id: 1, date: "2017-01-01" },
          { title: "Test 2", id: 2, date: "2017-02-01" }
        ],
        notes: [{ total: 2, nbNotes: 2 }, { total: -8, nbNotes: 2 }]
      };
      expect(getFilteredList(state)).toEqual([
        { title: "Test 1", id: 1, total: 2, nbNotes: 2, date: "2017-01-01" },
        { title: "Test 2", id: 2, total: -8, nbNotes: 2, date: "2017-02-01" }
      ]);
    });

    it("should return talk list sorted by total", () => {
      const state = {
        talks: [
          { title: "Test 1", id: 1, date: "2017-01-01" },
          { title: "Test 2", id: 2, date: "2017-02-01" }
        ],
        notes: [{ total: 2, nbNotes: 2 }, { total: 8, nbNotes: 2 }],
        sortBy: "total"
      };
      expect(getFilteredList(state)).toEqual([
        { title: "Test 2", id: 2, total: 8, nbNotes: 2, date: "2017-02-01" },
        { title: "Test 1", id: 1, total: 2, nbNotes: 2, date: "2017-01-01" }
      ]);
    });
  });
});
