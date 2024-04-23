import BentroxTitle from "@components/Library/BentroxTitle";
import ContentGroup from "@components/Library/ContentGroup";
import Segment from "@components/Library/Segment";
import { padding } from "@utils/themeConstants";
import { css } from "glamor";
import { Grid } from "semantic-ui-react";

// import HomeListContainer from "./_List/HomeListContainer";

const stylePage = css(padding.xs);

const Home = () => {
  return (
    <div className={`${stylePage}`}>
      <BentroxTitle title={"Homeing"} />
      <Segment>
        <Grid>
          <Grid.Column computer={12}>
            <Segment>
              <ContentGroup caption={"Cars Homeed"}>
                {/* <HomeListContainer /> */}
              </ContentGroup>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={4}>asdasd</Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

export default Home;
