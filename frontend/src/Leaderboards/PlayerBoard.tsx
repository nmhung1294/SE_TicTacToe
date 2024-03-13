import { useState } from "react";
import { Table } from "reactstrap";
interface Player {
  username: string;
  match: number;
  win: number;
  points: number;
  ava: string;
}

interface PlayerBoardProps {
  allPlayers: Player[];
}

function PlayerBoard({ allPlayers }: PlayerBoardProps) {

  let perPage = 8;
  let pages = Math.floor(allPlayers.length / perPage);
  if (allPlayers.length % perPage != 0) pages++;
  const pageList = [];
  for (let i = 0; i < pages; i++) {
    pageList.push(i);
  }

  const [curPage, setPage] = useState(0);
  const [playerlist, setPlayerList] = useState(allPlayers.slice(0, perPage));

  const changePage = (toPage: number) => {
    setPage(toPage);
    setPlayerList(
      allPlayers.slice(
        toPage * perPage,
        Math.min(allPlayers.length, (toPage + 1) * perPage)
      )
    );
  };
  const toNextPage = () => {
    changePage(curPage + 1);
  };
  const toPrePage = () => {
    changePage(curPage - 1);
  };

  return (
    <div style={{ paddingTop: 40 }}>
      <Table
        hover
        style={{ backgroundColor: "white", borderRadius: "20px" }}
      >
        <thead>
          <tr>
            <th
              className="small rows"
              style={{ backgroundColor: "transparent" }}
            >
              #
            </th>
            <th
              className="long rows"
              style={{ backgroundColor: "transparent" }}
            >
              Username
            </th>
            <th className="mid rows" style={{ backgroundColor: "transparent" }}>
              Matches
            </th>
            <th className="mid rows" style={{ backgroundColor: "transparent" }}>
              Win
            </th>
            <th
              className="long rows"
              style={{ backgroundColor: "transparent" }}
            >
              Elo
            </th>
          </tr>
        </thead>
        <tbody>
          {playerlist.map((item, idx) => (
            <tr key={idx}>
              <th
                scope="row"
                className={
                  "rows" + (idx + 1 === playerlist.length ? " borderless" : "")
                }
                style={{ backgroundColor: "transparent" }}
              >
                {perPage * curPage + idx + 1}
              </th>
              <td
                className={
                  "rows" + (idx + 1 === playerlist.length ? " borderless" : "")
                }
                style={{ backgroundColor: "transparent" }}
              >
                {item.username}
              </td>
              <td
                className={
                  "rows" + (idx + 1 === playerlist.length ? " borderless" : "")
                }
                style={{ backgroundColor: "transparent" }}
              >
                {item.match}
              </td>
              <td
                className={
                  "rows" + (idx + 1 === playerlist.length ? " borderless" : "")
                }
                style={{ backgroundColor: "transparent" }}
              >
                {item.win}
              </td>
              <td
                className={
                  "rows" + (idx + 1 === playerlist.length ? " borderless" : "")
                }
                style={{ backgroundColor: "transparent" }}
              >
                {item.points}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <nav aria-label="...">
        <ul className="pagination">
          <li className={"page-item " + (curPage === 0 ? "disabled" : "")}>
            <span className="page-link" onClick={toPrePage}>
              Previous
            </span>
          </li>
          {pageList.map((item, idx) => (
            <li
              className={"page-item" + (item === curPage ? " active" : "")}
              key={idx}
            >
              <a
                className="page-link"
                onClick={() => {
                  changePage(idx);
                }}
              >
                {idx + 1}
              </a>
            </li>
          ))}

          <li
            className={"page-item " + (curPage === pages - 1 ? "disabled" : "")}
          >
            <a className="page-link" onClick={toNextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PlayerBoard;
