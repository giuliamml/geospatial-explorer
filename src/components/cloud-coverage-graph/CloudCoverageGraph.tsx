import "chart.js/auto";
import { Line } from "react-chartjs-2";
import styles from "./CloudCoverageGraph.module.css";
import { Feature, FeatureCollection } from "../../types/types";

type PropTypes = {
  data: FeatureCollection;
};

const CloudCoverageGraph = ({ data }: PropTypes) => {
  const chartData = {
    labels: data.features.map((feature: Feature) =>
      new Date(feature.properties.datetime).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Cloud Coverage (%)",
        data: data.features.map(
          (feature: Feature) => feature.properties["landsat:cloud_cover_land"]
        ),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const makeGridStyles = {
    scales: {
      x: {
        grid: {
          color: "rgba(255, 99, 132, 0.2)",
        },
      },
      y: {
        grid: {
          color: "rgba(54, 162, 235, 0.2)",
        },
      },
    },
  };

  return (
    <div className={styles.wrapper}>
      <h2>Temporal Cloud Coverage</h2>
      <Line data={chartData} options={makeGridStyles} />
    </div>
  );
};

export default CloudCoverageGraph;
