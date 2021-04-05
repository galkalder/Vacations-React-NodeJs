import * as React from "react";
import { Bar } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import { Vacation } from "../../Model/Vacation";
import { store } from "../../Redux/Store";
import "./followGraph.css";

const getVacationsWithFollower = (vacations: Vacation[]): Vacation[] => {
  const followedVacations = vacations.filter((vacation) => {
    return vacation.followers > 0;
  });
  return followedVacations;
};

const getLabels = (vacations: Vacation[]): string[] => {
  const followedVacations = getVacationsWithFollower(vacations);
  const labels = followedVacations.map((vacation) => {
    return "vacation id" + vacation.vacationId;
  });
  return labels;
};

const getDataGraph = (vacations: Vacation[]): number[] => {
  const followedVacations = getVacationsWithFollower(vacations);
  const data = followedVacations.map((vacation) => {
    return vacation.followers;
  });
  return data;
};

const getGraphFullData = (vacations: Vacation[]) => {
  return {
    labels: getLabels(vacations),
    datasets: [
      {
        label: "Followers",
        backgroundColor: "orange",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: getDataGraph(vacations),
        maxBarThickness: 250,
      },
    ],
  };
};

export class followGrpah extends React.Component {
  render() {
    return (
      <div className="mainGraphDiv">
        <div className="vacationsGraph">
          {store.getState().isAdmin ? (
            <div className="graph">
              <NavLink to="/MainVacation" exact className="MainVacationLink">
                Main Vacation
              </NavLink>
              <article className="canvasContainer">
                <Bar
                  data={getGraphFullData(store.getState().Vacations)}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            min: 0,
                          },
                        },
                      ],
                    },
                    title: {
                      display: true,
                      text: " Must Favorite vacations",
                      fontSize: 25,
                      fontColor: "orange",
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </article>
            </div>
          ) : (
            <div className="permission">
              You do not have permission to view this page.
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default followGrpah;
