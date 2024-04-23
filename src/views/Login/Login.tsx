import { useCallback, useState } from "react";

import Button from "@components/Library/Button";
import Segment from "@components/Library/Segment";
import { useAuth } from "@hooks/Auth";
import { display, flex } from "@utils/themeConstants";
import { css } from "glamor";
import { Grid, Header, Form, Image } from "semantic-ui-react";

const Login = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const { loginHandler } = useAuth();

  const handleLogin = useCallback(() => {
    if (!email || !password) {
      throw new Error("Email or password is empty");
    }
    return loginHandler(email, password);
  }, [email, loginHandler, password]);

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
            <span>{"Login into account"}</span>
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                pill
                size="large"
                className={`${css({ width: "100%" })}`}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Login;
