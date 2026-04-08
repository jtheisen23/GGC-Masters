(function(React, ReactDOM) {
 function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }





// -- Player -> Group -> Owner mappings --
const PLAYER_TO_GROUP = {
  "Scottie Scheffler": "Scheffler+", "Scheffler": "Scheffler+",
  "Bryson DeChambeau": "Bryson+",    "DeChambeau": "Bryson+",
  "Rory McIlroy": "Rory+",           "McIlroy": "Rory+",
  "Jon Rahm": "Rahm+",               "Rahm": "Rahm+",
  "Ludvig Aberg": "Ludvig+",         "Aberg": "Ludvig+",
  "Jason Day": "Down Under",         "Min Woo Lee": "Down Under",  "Adam Scott": "Down Under",  "Ryan Fox": "Down Under",
  "Xander Schauffele": "X Men",      "Schauffele": "X Men",        "Max Homa": "X Men",         "Alex Noren": "X Men",   "Max Greyserman": "X Men",
  "Cameron Young": "Sam I Cam",      "Sam Burns": "Sam I Cam",     "Sam Stevens": "Sam I Cam",  "Sami Valimaki": "Sam I Cam",
  "Collin Morikawa": "Major Winners","Brooks Koepka": "Major Winners","Gary Woodland": "Major Winners","J.J. Spaun": "Major Winners","Keegan Bradley": "Major Winners",
  "Robert MacIntyre": "Leftys",      "Akshay Bhatia": "Leftys",    "Brian Harman": "Leftys",
  "Hideki Matsuyama": "Asia",        "Si Woo Kim": "Asia",         "Sung-Jae Im": "Asia",       "Haotong Li": "Asia",
  "Cameron Smith": "LIV",            "Tyrrell Hatton": "LIV",      "Sergio Garcia": "LIV",      "Charl Schwartzel": "LIV", "Tom McKibbin": "LIV", "Dustin Johnson": "LIV",
  "Patrick Cantlay": "America",      "Jake Knapp": "America",      "Maverick McNealy": "America","Daniel Berger": "America","John Keefer": "America","Andrew Novak": "America",
  "Matt Fitzpatrick": "English",     "Tommy Fleetwood": "English", "Harry Hall": "English",     "Marco Penge": "English",  "Aaron Rai": "English", "Harris English": "English",
  "Viktor Hovland": "International", "Shane Lowry": "International","Sepp Straka": "International","Rasmus Hojgaard": "International","Nicolai Hojgaard": "International",
  "Casey Jarvis": "International",   "Rasmus Neergaard-Petersen": "International","Carlos Ortiz": "International","Kristoffer Reitan": "International",
  "Justin Rose": "2 First Names",    "Wyndham Clark": "2 First Names","Russell Henley": "2 First Names","Ryan Gerard": "2 First Names","Corey Conners": "2 First Names",
  "Michael Kim": "2 First Names",    "Nick Taylor": "2 First Names","Michael Brennan": "2 First Names","Davis Riley": "2 First Names",
  "Patrick Reed": "Past Champions",  "Jordan Spieth": "Past Champions","Bubba Watson": "Past Champions","Vijay Singh": "Past Champions","Angel Cabrera": "Past Champions",
  "Fred Couples": "Past Champions",  "Zach Johnson": "Past Champions","Jose Maria Olazabal": "Past Champions","Danny Willett": "Past Champions",
  "Justin Thomas": "Rule 17",        "Nico Echavarria": "Rule 17", "Ben Griffin": "Rule 17",    "Jacob Bridgeman": "Rule 17","Chris Gotterup": "Rule 17",
  "Kurt Kitayama": "Rule 17",        "Aldrich Potgieter": "Rule 17","Brian Campbell": "Rule 17",
};

const GROUP_OWNER = {
  "Scheffler+":    "Team Billy C",
  "Bryson+":       "Team Spring",
  "Rory+":         "Team Brown",
  "Rahm+":         "Team Homewood",
  "Ludvig+":       "Team Homewood",
  "Down Under":    "Unassigned",
  "X Men":         "Team Douglas",
  "Sam I Cam":     "Team Benson",
  "Major Winners": "Team Kahn",
  "Leftys":        "Team Frangul",
  "Asia":          "Team Benson",
  "LIV":           "Team Santa",
  "America":       "Team Murphy",
  "English":       "Team Ratos",
  "International": "Team Loberg",
  "2 First Names": "Team Murphy",
  "Past Champions":"Team Hassels",
  "Rule 17":       "Team Murphy",
};

const GROUP_SOLD = {
  "Scheffler+": 4100, "Bryson+": 4000, "Rory+": 3600, "Rahm+": 3200, "Ludvig+": 2600,
  "Down Under": 2800, "X Men": 3600, "Sam I Cam": 3800, "Major Winners": 2800, "Leftys": 4000,
  "Asia": 2600, "LIV": 2100, "America": 3500, "English": 4500, "International": 2600,
  "2 First Names": 2500, "Past Champions": 2300, "Rule 17": 2800,
};

const POT = 57400;
const FINISH_PAYOUTS = [0.20, 0.15, 0.10, 0.08, 0.07, 0.06, 0.05, 0.04];

function scoreColor(val) {
  if (val === null || val === undefined || val === "E") return "#e8f5e9";
  if (typeof val === "string") {
    const n = parseInt(val);
    if (isNaN(n)) return "#e8f5e9";
    if (n < 0) return "#f87171";
    if (n > 0) return "#86efac";
    return "#e8f5e9";
  }
  if (val < 0) return "#f87171";
  if (val > 0) return "#86efac";
  return "#e8f5e9";
}

function fmtScore(val) {
  if (val === null || val === undefined) return "-";
  if (val === 0 || val === "E") return "E";
  if (typeof val === "number") return val > 0 ? "+" + val : String(val);
  return String(val);
}

function parseScore(str) {
  if (!str || str === "-" || str === "") return null;
  if (str === "E") return 0;
  const n = parseInt(str);
  return isNaN(n) ? null : n;
}

 function LeaderboardApp() {
  const [leaderboard, setLeaderboard] = React.useState.call(void 0, []);
  const [loading, setLoading] = React.useState.call(void 0, false);
  const [error, setError] = React.useState.call(void 0, null);
  const [lastUpdated, setLastUpdated] = React.useState.call(void 0, null);
  const [view, setView] = React.useState.call(void 0, "leaderboard");
  const [roundFilter, setRoundFilter] = React.useState.call(void 0, "all");
  const [autoRefresh, setAutoRefresh] = React.useState.call(void 0, false);

  const fetchScores = React.useCallback.call(void 0, async () => {
    setLoading(true);
    setError(null);
    try {
      // ESPN Masters leaderboard API
      const res = await fetch(
        "https://site.api.espn.com/apis/site/v2/sports/golf/pga/leaderboard?event=401353338",
        { headers: { Accept: "application/json" } }
      );
      if (!res.ok) throw new Error("ESPN API returned " + res.status);
      const data = await res.json();

      const competitors = _optionalChain([data, 'optionalAccess', _ => _.events, 'optionalAccess', _2 => _2[0], 'optionalAccess', _3 => _3.competitions, 'optionalAccess', _4 => _4[0], 'optionalAccess', _5 => _5.competitors]) || [];
      const parsed = competitors.map(c => {
        const name = _optionalChain([c, 'access', _6 => _6.athlete, 'optionalAccess', _7 => _7.displayName]) || _optionalChain([c, 'access', _8 => _8.athlete, 'optionalAccess', _9 => _9.fullName]) || "";
        const rounds = (c.linescores || []).map(r => parseScore(r.displayValue));
        const totalScore = _nullishCoalesce(parseScore(_optionalChain([c, 'access', _10 => _10.score, 'optionalAccess', _11 => _11.displayValue])), () => ( parseScore(_optionalChain([c, 'access', _12 => _12.statistics, 'optionalAccess', _13 => _13.find, 'call', _14 => _14(s => s.name === "totalScore"), 'optionalAccess', _15 => _15.displayValue]))));
        const pos = _optionalChain([c, 'access', _16 => _16.status, 'optionalAccess', _17 => _17.position, 'optionalAccess', _18 => _18.displayName]) || _optionalChain([c, 'access', _19 => _19.status, 'optionalAccess', _20 => _20.displayValue]) || "";
        const thru = _optionalChain([c, 'access', _21 => _21.status, 'optionalAccess', _22 => _22.thru]) || _optionalChain([c, 'access', _23 => _23.status, 'optionalAccess', _24 => _24.period]) || "";
        const teeTime = _optionalChain([c, 'access', _25 => _25.status, 'optionalAccess', _26 => _26.teeTime]) || "";
        const status = _optionalChain([c, 'access', _27 => _27.status, 'optionalAccess', _28 => _28.type, 'optionalAccess', _29 => _29.name]) || "";
        return { name, rounds, totalScore, pos, thru, teeTime, status };
      });

      parsed.sort((a, b) => {
        if (a.totalScore === null && b.totalScore === null) return 0;
        if (a.totalScore === null) return 1;
        if (b.totalScore === null) return -1;
        return a.totalScore - b.totalScore;
      });

      setLeaderboard(parsed);
      setLastUpdated(new Date());
    } catch (e) {
      // Fallback: try Masters.com data via a CORS proxy approach
      setError("Live data unavailable yet — Masters tees off April 9. Scores will appear here automatically once play begins.");
    }
    setLoading(false);
  }, []);

  React.useEffect.call(void 0, () => {
    fetchScores();
  }, [fetchScores]);

  React.useEffect.call(void 0, () => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchScores, 60000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchScores]);

  // Build group standings from leaderboard
  const groupStandings = {};
  Object.keys(GROUP_OWNER).forEach(g => {
    groupStandings[g] = { group: g, owner: GROUP_OWNER[g], sold: GROUP_SOLD[g], players: [], bestScore: null, bestPos: null };
  });

  leaderboard.forEach((p, idx) => {
    const group = PLAYER_TO_GROUP[p.name];
    if (!group || !groupStandings[group]) return;
    const posNum = idx + 1;
    groupStandings[group].players.push({ ...p, posNum });
    if (groupStandings[group].bestScore === null || (p.totalScore !== null && p.totalScore < groupStandings[group].bestScore)) {
      groupStandings[group].bestScore = p.totalScore;
      groupStandings[group].bestPos = posNum;
    }
  });

  const groupList = Object.values(groupStandings).sort((a, b) => {
    if (a.bestScore === null && b.bestScore === null) return 0;
    if (a.bestScore === null) return 1;
    if (b.bestScore === null) return -1;
    return a.bestScore - b.bestScore;
  });

  // Build owner standings
  const ownerStandings = {};
  groupList.forEach(g => {
    const owner = g.owner;
    if (!ownerStandings[owner]) ownerStandings[owner] = { owner, groups: [], bestScore: null, bestPos: null, totalSpent: 0 };
    ownerStandings[owner].groups.push(g);
    ownerStandings[owner].totalSpent += g.sold;
    if (g.bestScore !== null && (ownerStandings[owner].bestScore === null || g.bestScore < ownerStandings[owner].bestScore)) {
      ownerStandings[owner].bestScore = g.bestScore;
      ownerStandings[owner].bestPos = g.bestPos;
    }
  });

  const ownerList = Object.values(ownerStandings).sort((a, b) => {
    if (a.bestScore === null && b.bestScore === null) return 0;
    if (a.bestScore === null) return 1;
    if (b.bestScore === null) return -1;
    return a.bestScore - b.bestScore;
  });

  const hasData = leaderboard.length > 0;
  const roundsPlayed = hasData ? Math.max(...leaderboard.map(p => p.rounds.filter(r => r !== null).length)) : 0;

  const navBtn = (v, label) => (
    React.createElement('button', { onClick: () => setView(v), style: {
      padding: "5px 14px", borderRadius: 20, cursor: "pointer", fontSize: 11, fontWeight: 700,
      background: view === v ? "#f5e642" : "#162916",
      color: view === v ? "#0a160a" : "#8fbc8f",
      border: view === v ? "none" : "1px solid #2d4a2d",
    },}, label)
  );

  return (
    React.createElement('div', { style: { fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#0a160a", minHeight: "100vh", color: "#e8f5e9" },}

      /* Header */
      , React.createElement('div', { style: { background: "linear-gradient(135deg, #162916, #0d2010, #162916)", borderBottom: "2px solid #f5e642", padding: "14px 16px 12px" },}
        , React.createElement('div', { style: { maxWidth: 900, margin: "0 auto" },}
          , React.createElement('div', { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },}
            , React.createElement('div', { style: { display: "flex", alignItems: "center", gap: 14 },}
              , React.createElement(Logo, { size: 54,} )
              , React.createElement('div', null
                , React.createElement('div', { style: { fontSize: 11, color: "#4ade80", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 },}, "Geneva Golf Club"  )
                , React.createElement('h1', { style: { margin: 0, fontSize: 18, fontWeight: 900, color: "#f5e642", letterSpacing: 1 },}, "2026 GGC MASTERS AUCTION"   )
                , React.createElement('div', { style: { fontSize: 10, color: "#6a9a6a", marginTop: 2 },}, "LIVE LEADERBOARD" )
              )
            )
            , React.createElement('div', null
              , React.createElement('p', { style: { margin: 0, fontSize: 10, color: "#6a9a6a" },}
                , lastUpdated ? ("Updated: " + lastUpdated.toLocaleTimeString()) : "Press Refresh to load scores"
                , roundsPlayed > 0 ? (" | Round " + roundsPlayed + " in progress") : ""
              )
            )
            , React.createElement('div', { style: { display: "flex", gap: 8, alignItems: "center" },}
              , React.createElement('button', { onClick: fetchScores, disabled: loading, style: {
                padding: "6px 14px", borderRadius: 20, border: "1px solid #2d6a2d", cursor: "pointer",
                background: loading ? "#0a160a" : "#2d6a2d", color: "#fff", fontSize: 11, fontWeight: 700,
              },}, loading ? "Loading..." : "Refresh")
              , React.createElement('button', { onClick: () => setAutoRefresh(a => !a), style: {
                padding: "6px 14px", borderRadius: 20, border: "1px solid " + (autoRefresh ? "#f5e642" : "#2d4a2d"),
                cursor: "pointer", background: autoRefresh ? "#78350f" : "#162916", color: autoRefresh ? "#f5e642" : "#8fbc8f", fontSize: 11, fontWeight: 700,
              },}, autoRefresh ? "Auto ON" : "Auto OFF")
            )
          )
          , React.createElement('div', { style: { display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" },}
            , navBtn("leaderboard", "Full Leaderboard")
            , navBtn("groups", "Group Standings")
            , navBtn("owners", "Owner Standings")
          )
        )
      )

      , React.createElement('div', { style: { maxWidth: 900, margin: "0 auto", padding: "14px 12px 48px" },}

        , error && (
          React.createElement('div', { style: { background: "#1c1010", border: "1px solid #7f1d1d", borderRadius: 10, padding: 16, marginBottom: 16, fontSize: 13, color: "#fca5a5", textAlign: "center" },}
            , error
            , React.createElement('div', { style: { fontSize: 11, color: "#6a9a6a", marginTop: 8 },}, "Once the tournament begins, press Refresh to load live scores."         )
          )
        )

        /* FULL LEADERBOARD */
        , view === "leaderboard" && (
          React.createElement('div', null
            , React.createElement('div', { style: { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" },}
              , React.createElement('span', { style: { fontSize: 11, color: "#6a9a6a" },}, "Show:")
              , [["all", "All Players"], ["r1", "R1"], ["r2", "R2"], ["r3", "R3"], ["r4", "R4"]].map(([k, l]) => (
                React.createElement('button', { key: k, onClick: () => setRoundFilter(k), style: {
                  padding: "4px 10px", borderRadius: 12, border: "1px solid #2d4a2d", cursor: "pointer", fontSize: 11,
                  background: roundFilter === k ? "#2d6a2d" : "#162916", color: roundFilter === k ? "#fff" : "#8fbc8f",
                },}, l)
              ))
            )

            , !hasData ? (
              React.createElement('div', { style: { textAlign: "center", padding: "60px 20px", color: "#4a7a4a" },}
                , React.createElement('div', { style: { fontSize: 40, marginBottom: 12 },}, "⛳")
                , React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: "#6a9a6a" },}, "Waiting for tee time..."   )
                , React.createElement('div', { style: { fontSize: 13, color: "#4a7a4a", marginTop: 8 },}, "Masters begins Thursday April 9. Press Refresh once play starts."         )
              )
            ) : (
              React.createElement('div', null
                /* Column headers */
                , React.createElement('div', { style: { display: "grid", gridTemplateColumns: "32px 36px 1fr 52px 52px 52px 52px 60px", gap: 4, padding: "6px 10px", fontSize: 9, color: "#6a9a6a", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #2d4a2d", marginBottom: 4 },}
                  , React.createElement('span', null, "Pos"), React.createElement('span', null), React.createElement('span', null, "Player")
                  , React.createElement('span', { style: { textAlign: "center" },}, "R1")
                  , React.createElement('span', { style: { textAlign: "center" },}, "R2")
                  , React.createElement('span', { style: { textAlign: "center" },}, "R3")
                  , React.createElement('span', { style: { textAlign: "center" },}, "R4")
                  , React.createElement('span', { style: { textAlign: "right" },}, "Total")
                )
                , leaderboard.map((p, i) => {
                  const group = PLAYER_TO_GROUP[p.name];
                  const owner = group ? GROUP_OWNER[group] : null;
                  const isTop8 = i < 8;
                  return (
                    React.createElement('div', { key: p.name, style: {
                      display: "grid", gridTemplateColumns: "32px 36px 1fr 52px 52px 52px 52px 60px", gap: 4,
                      padding: "7px 10px", borderRadius: 8, marginBottom: 3,
                      background: isTop8 ? "#1a2e1a" : "#111811",
                      border: "1px solid " + (isTop8 ? "#2d6a2d" : "#1a2a1a"),
                    },}
                      , React.createElement('span', { style: { fontSize: 11, color: "#6a9a6a", alignSelf: "center" },}, p.pos || (i + 1))
                      , React.createElement('span', { style: { fontSize: 9, color: "#4a7a4a", alignSelf: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },}, group ? group.replace("Scheffler+","Sch+").replace("Bryson+","Bry+").replace("Rory+","Rory+").replace("Rahm+","Rahm+").replace("Ludvig+","Lud+").replace("Down Under","DU").replace("X Men","XM").replace("Sam I Cam","SIC").replace("Major Winners","MW").replace("Leftys","LY").replace("Asia","AS").replace("LIV","LV").replace("America","AM").replace("English","EN").replace("International","INT").replace("2 First Names","2FN").replace("Past Champions","PC").replace("Rule 17","R17") : "")
                      , React.createElement('div', { style: { alignSelf: "center" },}
                        , React.createElement('div', { style: { fontWeight: 700, fontSize: 13, lineHeight: 1.2 },}, p.name)
                        , owner && React.createElement('div', { style: { fontSize: 9, color: "#60a5fa" },}, owner)
                        , p.thru && React.createElement('div', { style: { fontSize: 9, color: "#6a9a6a" },}, "Thru " + p.thru)
                      )
                      , [0, 1, 2, 3].map(ri => (
                        React.createElement('span', { key: ri, style: { textAlign: "center", fontSize: 12, fontWeight: ri === roundsPlayed - 1 ? 800 : 400, color: scoreColor(p.rounds[ri]), alignSelf: "center" },}
                          , p.rounds[ri] !== null && p.rounds[ri] !== undefined ? fmtScore(p.rounds[ri]) : "-"
                        )
                      ))
                      , React.createElement('span', { style: { textAlign: "right", fontSize: 14, fontWeight: 900, color: scoreColor(p.totalScore), alignSelf: "center" },}
                        , fmtScore(p.totalScore)
                      )
                    )
                  );
                })
              )
            )
          )
        )

        /* GROUP STANDINGS */
        , view === "groups" && (
          React.createElement('div', null
            , React.createElement('div', { style: { background: "#162916", border: "1px solid #2d6a2d", borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 12, color: "#8fbc8f" },}, "Groups ranked by best player score. Payout based on best finishing position in each group for finish-based prizes. Total pot: $57,400."

            )
            , groupList.map((g, i) => {
              const tier = i === 0 ? "#f5e642" : i < 3 ? "#4ade80" : i < 6 ? "#60a5fa" : "#8fbc8f";
              const estPayout = g.bestPos && g.bestPos <= 8 ? Math.round(POT * FINISH_PAYOUTS[g.bestPos - 1]) : 0;
              return (
                React.createElement('div', { key: g.group, style: { background: "#162916", border: "1px solid " + (i < 3 ? "#2d6a2d" : "#2d4a2d"), borderRadius: 10, padding: "12px 14px", marginBottom: 8 },}
                  , React.createElement('div', { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },}
                    , React.createElement('div', { style: { display: "flex", alignItems: "center", gap: 10 },}
                      , React.createElement('span', { style: { fontSize: 18, fontWeight: 900, color: "#6a9a6a", minWidth: 24 },}, i + 1)
                      , React.createElement('div', null
                        , React.createElement('div', { style: { fontWeight: 800, fontSize: 15, color: "#e8f5e9" },}, g.group)
                        , React.createElement('div', { style: { fontSize: 11, color: "#60a5fa" },}, g.owner)
                      )
                    )
                    , React.createElement('div', { style: { textAlign: "right" },}
                      , React.createElement('div', { style: { fontSize: 22, fontWeight: 900, color: tier },}, g.bestScore !== null ? fmtScore(g.bestScore) : "-")
                      , React.createElement('div', { style: { fontSize: 10, color: "#6a9a6a" },}, g.bestPos ? ("T" + g.bestPos + " best") : "No data")
                      , estPayout > 0 && React.createElement('div', { style: { fontSize: 11, color: "#4ade80", fontWeight: 700 },}, "~$" + estPayout.toLocaleString() + " est.")
                    )
                  )
                  , React.createElement('div', { style: { borderTop: "1px solid #2d4a2d", paddingTop: 8 },}
                    , g.players.length === 0 ? (
                      React.createElement('div', { style: { fontSize: 11, color: "#4a7a4a", fontStyle: "italic" },}, "No players in leaderboard yet"    )
                    ) : (
                      g.players.sort((a, b) => (_nullishCoalesce(a.totalScore, () => ( 99))) - (_nullishCoalesce(b.totalScore, () => ( 99)))).map(p => (
                        React.createElement('div', { key: p.name, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 5 },}
                          , React.createElement('span', { style: { fontSize: 11, color: "#6a9a6a", minWidth: 28 },}, p.pos || ("T" + p.posNum))
                          , React.createElement('span', { style: { fontSize: 13, fontWeight: 600, flex: 1 },}, p.name)
                          , React.createElement('div', { style: { display: "flex", gap: 6 },}
                            , [0, 1, 2, 3].map(ri => (
                              React.createElement('span', { key: ri, style: { fontSize: 11, color: scoreColor(p.rounds[ri]), minWidth: 28, textAlign: "center" },}
                                , p.rounds[ri] !== null && p.rounds[ri] !== undefined ? fmtScore(p.rounds[ri]) : "-"
                              )
                            ))
                            , React.createElement('span', { style: { fontSize: 13, fontWeight: 800, color: scoreColor(p.totalScore), minWidth: 36, textAlign: "right" },}
                              , fmtScore(p.totalScore)
                            )
                          )
                        )
                      ))
                    )
                  )
                )
              );
            })
          )
        )

        /* OWNER STANDINGS */
        , view === "owners" && (
          React.createElement('div', null
            , React.createElement('div', { style: { background: "#162916", border: "1px solid #2d6a2d", borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 12, color: "#8fbc8f" },}, "Teams ranked by best overall player score across all their groups. Estimated payout based on best finishing position(s)."

            )
            , ownerList.map((o, i) => {
              const tierColor = i === 0 ? "#f5e642" : i < 3 ? "#4ade80" : "#8fbc8f";
              const allPlayers = o.groups.flatMap(g => g.players).sort((a, b) => (_nullishCoalesce(a.totalScore, () => ( 99))) - (_nullishCoalesce(b.totalScore, () => ( 99))));
              const bestFinish = allPlayers[0];
              const estPayout = o.bestPos && o.bestPos <= 8 ? Math.round(POT * FINISH_PAYOUTS[o.bestPos - 1]) : 0;
              const totalSpent = o.groups.reduce((s, g) => s + g.sold, 0);
              return (
                React.createElement('div', { key: o.owner, style: { background: "#162916", border: "1px solid " + (i < 3 ? "#2d6a2d" : "#2d4a2d"), borderRadius: 12, padding: "14px 16px", marginBottom: 10 },}
                  , React.createElement('div', { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },}
                    , React.createElement('div', { style: { display: "flex", alignItems: "center", gap: 10 },}
                      , React.createElement('span', { style: { fontSize: 24, fontWeight: 900, color: tierColor, minWidth: 32 },}, i + 1)
                      , React.createElement('div', null
                        , React.createElement('div', { style: { fontWeight: 900, fontSize: 16, color: "#f5e642" },}, o.owner)
                        , React.createElement('div', { style: { fontSize: 11, color: "#6a9a6a" },}, "$" + totalSpent.toLocaleString() + " invested | " + o.groups.length + " groups")
                      )
                    )
                    , React.createElement('div', { style: { textAlign: "right" },}
                      , React.createElement('div', { style: { fontSize: 26, fontWeight: 900, color: tierColor, lineHeight: 1 },}, o.bestScore !== null ? fmtScore(o.bestScore) : "-")
                      , React.createElement('div', { style: { fontSize: 10, color: "#6a9a6a" },}, o.bestPos ? ("Best: T" + o.bestPos) : "No data")
                      , estPayout > 0 && React.createElement('div', { style: { fontSize: 13, color: "#4ade80", fontWeight: 800 },}, "~$" + estPayout.toLocaleString() + " est.")
                    )
                  )

                  /* Groups owned */
                  , React.createElement('div', { style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: bestFinish ? 10 : 0 },}
                    , o.groups.map(g => (
                      React.createElement('div', { key: g.group, style: { background: "#0a160a", borderRadius: 8, padding: "5px 10px", fontSize: 11 },}
                        , React.createElement('span', { style: { color: "#8fbc8f", fontWeight: 700 },}, g.group)
                        , React.createElement('span', { style: { color: "#f87171", marginLeft: 6 },}, "$" + g.sold.toLocaleString())
                        , g.bestScore !== null && (
                          React.createElement('span', { style: { color: scoreColor(g.bestScore), marginLeft: 6, fontWeight: 800 },}, fmtScore(g.bestScore))
                        )
                      )
                    ))
                  )

                  /* Top players */
                  , allPlayers.length > 0 && (
                    React.createElement('div', { style: { borderTop: "1px solid #2d4a2d", paddingTop: 8 },}
                      , React.createElement('div', { style: { fontSize: 10, color: "#6a9a6a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 },}, "Top Players" )
                      , allPlayers.slice(0, 5).map(p => (
                        React.createElement('div', { key: p.name, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 },}
                          , React.createElement('span', { style: { fontSize: 11, color: "#6a9a6a", minWidth: 28 },}, p.pos || ("T" + p.posNum))
                          , React.createElement('span', { style: { fontSize: 13, fontWeight: 600, flex: 1 },}, p.name)
                          , React.createElement('span', { style: { fontSize: 10, color: "#60a5fa", minWidth: 80 },}, PLAYER_TO_GROUP[p.name])
                          , React.createElement('div', { style: { display: "flex", gap: 6 },}
                            , [0, 1, 2, 3].map(ri => (
                              React.createElement('span', { key: ri, style: { fontSize: 11, color: scoreColor(p.rounds[ri]), minWidth: 28, textAlign: "center" },}
                                , p.rounds[ri] !== null && p.rounds[ri] !== undefined ? fmtScore(p.rounds[ri]) : "-"
                              )
                            ))
                            , React.createElement('span', { style: { fontSize: 13, fontWeight: 800, color: scoreColor(p.totalScore), minWidth: 36, textAlign: "right" },}
                              , fmtScore(p.totalScore)
                            )
                          )
                        )
                      ))
                    )
                  )
                )
              );
            })
          )
        )

      )

      , React.createElement('div', { style: { textAlign: "center", padding: 12, borderTop: "1px solid #162916", fontSize: 10, color: "#3a5a3a" },}, "Live data via ESPN API | Auto-refresh every 60s when enabled | 2026 Masters Tournament"

      )
    )
  );
} 

window.LeaderboardApp = LeaderboardApp;
})(window.React, window.ReactDOM);