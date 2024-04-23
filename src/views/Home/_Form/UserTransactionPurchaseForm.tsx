import { useCallback, useMemo } from "react";

// import { usePark } from "@/hooks/Park";
import Button from "@components/Library/Button";
import SvgIcon from "@components/Library/SvgIcon";
import { css } from "glamor";
import { useFormContext } from "react-hook-form";
import { Grid, Form as SemanticForm } from "semantic-ui-react";

import { border, colors, margin, padding } from "@utils/themeConstants";
import { useTransaction } from "@/hooks/Transaction/Transaction";
import InputMoney from "@/components/Library/InputMoney";
import InputFile from "@/components/Library/InputFile";
import InputText from "@/components/Library/InputText";

const styleMr = css(margin.rightSm);

const styleButton = css({
  "&.ui.basic.blue.button": { boxShadow: "none !important" },
});

const styleInput = css();

const styleGridColumn = css(padding.topXs, padding.bottomXs);

const UserTransactionPurchaseForm = () => {
  const { isLoadingStore } = useTransaction();

  const { formState, reset } = useFormContext();

  const { errors } = formState;

  const valid = useMemo(() => !errors.length, [errors]);

  const onCancel = useCallback(() => {
    reset({});
  }, [reset]);

  return (
    <div
      className={`${css(padding.xs, border.roundedSm, margin.bottomXs, {
        background: colors.greyLightest,
      })}`}
    >
      <Grid>
        <Grid.Column width={16} className={`${styleGridColumn}`}>
          <SemanticForm.Field className={`${styleInput}`}>
            <InputMoney
              name="amount"
              label={"Amount"}
              required
              className={`${css({width: "100%"})}`}
              placeholder={"Enter amount"}
            />
          </SemanticForm.Field>
        </Grid.Column>
        <Grid.Column width={16} className={`${styleGridColumn}`}>
          <SemanticForm.Field className={`${styleInput}`}>
            <InputText
              name="description"
              label={"Description"}
              required
              fluid
              placeholder={"Enter Description"}
            />
          </SemanticForm.Field>
        </Grid.Column>
        <Grid.Column width={8} className={`${styleGridColumn}`}>
          <SemanticForm.Field className={`${css(margin.xxs)}`}>
            <SemanticForm.Group>
              <Button
                color="primary"
                fluid
                pill
                loading={isLoadingStore}
                disabled={!valid}
                type="submit"
              >
                <SvgIcon
                  path="icon-arrow-circle-right-line"
                  size="md"
                  className={`${styleMr}`}
                />
                {"Purchase"}
              </Button>
            </SemanticForm.Group>
          </SemanticForm.Field>
        </Grid.Column>
        <Grid.Column width={8} className={`${styleGridColumn}`}>
          <SemanticForm.Field className={`${css(margin.xxs)}`}>
            <SemanticForm.Group>
              <Button
                outline
                color="default"
                fluid
                pill
                disabled={isLoadingStore}
                onClick={onCancel}
                type="button"
                className={`${styleButton}`}
              >
                <SvgIcon
                  path="icon-close-circle"
                  size="md"
                  className={`${styleMr}`}
                />
                {"Clear"}
              </Button>
            </SemanticForm.Group>
          </SemanticForm.Field>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default UserTransactionPurchaseForm;
