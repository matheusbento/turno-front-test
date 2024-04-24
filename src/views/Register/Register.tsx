
import Segment from "@components/Library/Segment";
import { display, flex } from "@/utils/themeConstants";
import { css } from "glamor";
import { Grid, Header, Image } from "semantic-ui-react";
import RegisterFormContainer from "./_Form/RegisterFormContainer";

const Register = () => {
  return (
    <Segment>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header
            as="h2"
            textAlign="center"
            className={`${css(display.flex, flex.column)}`}
          >
            <Image src="/images/logo/turno-en.png" centered />
            <span>{"Register into account"}</span>
          </Header>
          <RegisterFormContainer />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Register;
