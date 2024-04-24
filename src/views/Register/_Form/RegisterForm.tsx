
// import { usePark } from "@/hooks/Park";
import Button from "@components/Library/Button";
import { css } from "glamor";
import { margin, padding } from "@/utils/themeConstants";
import InputText from "@components/Library/InputText";
import Segment from "@components/Library/Segment";

const RegisterForm = () => {
  return (
    <Segment stacked>
      <InputText
        name="name"
        required
        fluid
        placeholder={"Name"}
        className={`${css(margin.topXs)}`}
      />
      <InputText
        name="email"
        required
        fluid
        placeholder={"Email"}
        className={`${css(margin.topXs)}`}
      />

      <InputText
        name="password"
        required
        fluid
        type="password"
        placeholder={"password"}
        className={`${css(margin.topXs)}`}
      />

      <Button
        pill
        size="large"
        className={`${css({ width: "100%" }, margin.topXs)}`}
        type="submit"
      >
        Register
      </Button>

      <Button
        pill
        outline
        size="large"
        className={`${css({ width: "100%" }, margin.topXs)}`}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Back
      </Button>
    </Segment>
  );
};

export default RegisterForm;
