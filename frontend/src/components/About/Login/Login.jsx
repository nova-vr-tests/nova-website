import React from "react";
import {connect} from "react-redux";
import {compose, withState, lifecycle} from "recompose";

import getStyles from "./LoginStyles.jsx";

import {Textbox, SubmitButton} from "../../pages/UI.jsx";

import {Form} from "react-form";

const mapStateToProps = state => ({
  windowWidth: state.appReducer.windowWidth,
});

const mapDispatchToProps = () => ({});

const LoginForm = props => {
  const borderColor = "rgba(0, 0, 0, 0.2)";

  const styles = {
    wrapper: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },
    input: {
      margin: "1rem",
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: "1px solid " + borderColor,
      borderRadius: "1rem",
      padding: "0 2rem",
      height: "2rem",
      transition: "border-color 0.2s linear",
    },
    button: {
      margin: "1rem",
      height: "2rem",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      color: "rgba(255, 255, 255, 0.8)",
      border: "0px solid " + borderColor,
      borderRadius: "1rem",
      padding: "0 2rem",
      cursor: "pointer",
    },
    error: {
      color: "red",
      borderColor: "red",
    },
    submitWrapper: {
      position: "relative",
    },
    username: {
      marginBottom: "1rem",
    },
  };

  return (
    <div className={"LoginForm--wrapper"} style={styles.wrapper}>
      <form
        style={styles.wrapper}
        onSubmit={props.formApi.submitForm}
        id="form2">
        <Textbox
          isError={props.isError}
          placeholder="username"
          style={styles.username}
          onChange={() => {}}
        />
        <Textbox
          isError={props.isError}
          placeholder="password"
          isPassword={true}
          onChange={() => {}}
        />
        <div style={styles.submitWrapper}>
          <SubmitButton onClick={props.submit} isSubmitting={props.isLoading} />
        </div>
      </form>
    </div>
  );
};

LoginForm.defaultProps = {
  isError: false,
  isLoading: false,
  formApi: {},
};

const Login = props => {
  const styles = getStyles(props);

  const submit = () => {
    props.setIsError(false);
    props.setIsLoading(true);

    window.setTimeout(() => {
      props.setIsError(true);
      props.setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.wrapper}>
      <Form onSubmit={submit}>
        {formApi => (
          <LoginForm
            formApi={formApi}
            submit={submit}
            isError={props.isError}
            isLoading={props.isLoading}
          />
        )}
      </Form>
    </div>
  );
};

Login.defaultProps = {};

const SmartComp = compose(
  withState("submittedValues", "setSubmittedValues", {}),
  withState("isLoading", "setIsLoading", false),
  withState("isError", "setIsError", false),
  lifecycle({}),
)(Login);

const ConnectedComp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SmartComp);

export default ConnectedComp;
