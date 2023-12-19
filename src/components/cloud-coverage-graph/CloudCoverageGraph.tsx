import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Feature, FeatureCollection } from "../../types/types";
import styles from "./CloudCoverageGraph.module.css";

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

  return (
    <div className={styles.wrapper}>
      <h2>Temporal Cloud Coverage</h2>
      <Line data={chartData} />
    </div>
  );
};

export default CloudCoverageGraph;
