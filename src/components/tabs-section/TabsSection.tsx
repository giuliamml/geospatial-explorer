import { Tab, Tabs } from "react-bootstrap";
import CloudCoverageGraph from "../cloud-coverage-graph/CloudCoverageGraph";
import ResultsTable from "../results-table/ResultsTable";
import { FeatureCollection } from "../../types/types";

type PropTypes = {
  data: FeatureCollection;
};

const TabsSection = ({ data }: PropTypes) => {
  return (
    <Tabs defaultActiveKey="data" className="tabs-wrapper" fill justify>
      <Tab eventKey="data" title="Data">
        <ResultsTable data={data} />
      </Tab>
      <Tab eventKey="analytics" title="Analytics">
        <CloudCoverageGraph data={data} />
      </Tab>
    </Tabs>
  );
};

export default TabsSection;
