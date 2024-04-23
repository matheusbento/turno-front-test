import BentroxTitle from "@components/Library/BentroxTitle";
import ContentGroup from "@components/Library/ContentGroup";
import Segment from "@components/Library/Segment";
import { padding } from "@utils/themeConstants";
import { css } from "glamor";
import { Grid } from "semantic-ui-react";
import TransactionListContainer from "../Turno/Transaction/_List/TransactionListContainer";

// import HomeListContainer from "./_List/HomeListContainer";

const stylePage = css(padding.xs);

const Home = () => {
  return (
    <div className={`${stylePage}`}>
      <BentroxTitle title={"Transactions"} />
      <Segment>
        <Grid>
          <Grid.Column computer={16}>
            <Segment>
              <TransactionListContainer />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

export default Home;
