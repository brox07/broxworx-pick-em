import React, { useEffect, useState } from "react";
import { db } from '../../services/firebase';
//import { fetchGroupPicks, fetchGroupUsers } from "../../utils/groupQueries"

const PicksDashboard = () => {
  // const league = 'nfl';
  // const season = 's2022';
  // const week = '01';
  const userId = 'HIWTglfuYVNPqkI4fS6u'
  const groupId = 'dqxvPN91d7PZKyOk9vSz';
  // const group = ' dqxvPN91d7PZKyOk9vSz';
  // const groupName = 'GTM(ish) Pick-Em'


  const [groupMembers, setGroupMembers] = useState([]);
  const [selectedRound, setSelectedRound] = useState('r01');
  const [games, setGames] = useState([]);
  const [picks, setPicks] = useState([]);

  // fetch group members
  useEffect(() => {
    const unsubscribe = db.collection(`groups/${groupId}/members`)
      .onSnapshot((snapshot) => {
        setGroupMembers(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
      });
    return () => unsubscribe();
  }, [groupId]);

  // fetch games
  useEffect(() => {
    const unsubscribe = db.collection(`games/nfl-s2022/${selectedRound}`)
      .onSnapshot((snapshot) => {
        setGames(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
      });
    return () => unsubscribe();
  }, [selectedRound]);

  // Fetch picks
  useEffect(() => {
    db.collection(`picks/${groupId}/${userId}`)
      .where('dateEvent', '>=', getLastWeekDate()) // Utility function to get last week's date
      .get()
      .then((snapshot) => {
        setPicks(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
      });
  }, [groupId, userId]);

  function getLastWeekDate() {
    const today = new Date();
    const lastWeekDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return lastWeekDate;
  }
  
  function isGameLastWeek(game) {
    const gameDate = new Date(game.data.strTimeStamp);
    console.log(game.data.strTimeStamp);
    return true; //gameDate >= getLastWeekDate();
  }
  
  function hasGameStarted(gameTimeStamp) {
    const gameDate = new Date(gameTimeStamp);
    const currentDate = new Date();
    return currentDate >= gameDate;
  }
  
  function RoundSelector({ rounds, selectedRound, onChange }) {
    return (
      <select value={selectedRound} onChange={onChange}>
        {rounds.map((round) => (
          <option key={round} value={round}>
            {round.toUpperCase()}
          </option>
        ))}
      </select>
    );
  }

return (
  <div>
    <h2>Group Members</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {groupMembers.map((member) => (
          <tr key={member.id}>
            <td>{member.data.name}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2>Games and Picks</h2>
    <RoundSelector
      rounds={['r01', 'r02', 'r03', 'r04']} // List of available rounds
      selectedRound={selectedRound}
      onChange={(e) => setSelectedRound(e.target.value)}
    />
    <table>
      <thead>
        <tr>
          <th>Game</th>
          <th>Status</th>
          <th>Your Pick</th>
        </tr>
      </thead>
      <tbody>
        {games.filter(isGameLastWeek).map((game) => {
          const gamePick = picks.find((pick) => pick.id === game.id);
          const gameStarted = hasGameStarted(game.data.strTimeStamp);

          return (
            <tr key={game.id}>
              <td>{game.data.strEvent}</td>
              <td>{game.data.intHomeScore && game.data.intAwayScore ? 'Finished' : 'Upcoming'}</td>
              <td>
                {gamePick && (gameStarted || gamePick.data.success !== null) // updates here -----------------------------------------------
                  ? `${gamePick.data.teamPicked} (${gamePick.data.success ? 'Won' : 'Lost'})`
                  : 'Hidden'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>


  // const [picksWithResults, setPicksWithResults] = useState([]);
  // const [selectedGroup, setGroup] = useState(group);

  // const handleGroupChange = (newGroup) => {
  //   setGroup(newGroup);
  // }

  // const handleDropdownChange = (e) => {
  //   handleGroupChange(e.target.value);
  // };
  // console.log(fetchGroupUsers(groupId));
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchGroupPicks(groupId, league, season, week);
  //     setPicksWithResults(data);
  //   };

  //   fetchData();
  // }, [groupId, league, season, week]);

  // return (
  //   <div>
  //     <h1>Picks Dashboard</h1>
  //     <div className="group-selector">
  //         <label htmlFor="group">Group: </label>
  //         <select
  //           name="group"
  //           id="group"
  //           value={selectedGroup}
  //           onChange={handleDropdownChange}
  //         >
  //           {Array.from({ length: 1 }, (_, i) => i + 1).map((groups) => (
  //             <option key={groupId} value={groupName}>
  //               {groupName}
  //             </option>
  //           ))}
  //         </select>
  //     </div>  
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>User</th>
  //           {picksWithResults[0]?.games.map((game, index) => (
  //             <th key={index}>{game.homeTeam} vs {game.awayTeam}</th>
  //           ))}
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {picksWithResults.map((userPicks) => (
  //           <tr key={userPicks.userId}>
  //             <td>{userPicks.name}</td>
  //             {userPicks.games.map((game) => (
  //               <td key={game.gameId} style={{ color: game.correctPick ? 'green' : 'red' }}>
  //                 {game.userPick}
  //               </td>
  //             ))}
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  );
};

export default PicksDashboard;
