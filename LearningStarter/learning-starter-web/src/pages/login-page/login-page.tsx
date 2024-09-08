/* eslint-disable @typescript-eslint/no-unused-vars */
import "./login-page.css";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { ApiResponse, UserCreateDto, UserGetDto } from "../../constants/types";
import { Formik, Form, Field } from "formik";
import { Button, Header, Input, Modal } from "semantic-ui-react";
import { useAsyncFn } from "react-use";
import { PageWrapper } from "../../components/page-wrapper/page-wrapper";
import { loginUser } from "../../authentication/authentication-services";
import { routes } from "../../routes/config";
import { useHistory } from "react-router-dom";
import { BaseUrl } from "../../constants/ens-vars";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

type LoginRequest = {
  userName: string;
  password: string;
};

type LoginResponse = ApiResponse<boolean>;

type FormValues = LoginRequest;
const initialValues1: UserCreateDto = {
  id: 0,
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
  email: "",
};
//This is a *fairly* basic form
//The css used in here is a good example of how flexbox works in css
//For more info on flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
export const LoginPage = () => {
  const [open, setOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const history = useHistory();
  const [users, setUsers] = useState<UserGetDto[]>();

  const initialValues = useMemo<FormValues>(
    () => ({
      userName: "",
      password: "",
      email: "",
    }),
    []
  );
  const [, submitLogin] = useAsyncFn(async (values: LoginRequest) => {
    if (baseUrl === undefined) {
      return;
    }

    const response = await axios.post<LoginResponse>(
      `${baseUrl}/api/authenticate`,
      values
    );

    if (response.data.data) {
      console.log("Successfully Logged In!");
      loginUser();
      history.push(routes.home);
    }
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get<ApiResponse<UserGetDto[]>>("api/users");
    if (response.data.hasErrors) {
      alert("Something went wrong.");
      return;
    }
    setUsers(response.data.data);
  };

  const onSubmit = async (values: UserCreateDto) => {
    const response = await axios.post<ApiResponse<UserGetDto>>(
      `${BaseUrl}/api/users`,
      values,
      { validateStatus: () => true }
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.home);
    }

    setOpen(false);
    history.push(routes.user.user);
    await fetchUsers();
    setSubmitLoading(false);
  };

  const onClick = async () => {
    setOpen(false);
  };

  return (
    <PageWrapper>
      <div className="flex-box-centered-content-login-page">
        <div className="login-form">
          <Formik initialValues={initialValues} onSubmit={submitLogin}>
            <Form>
              <div>
                <div>
                  <div className="field-label">
                    <label htmlFor="userName">User Name</label>
                  </div>
                  <Field className="field" id="userName" name="userName">
                    {({ field }) => <Input {...field} />}
                  </Field>
                </div>
                <div>
                  <div className="field-label">
                    <label htmlFor="password">Password</label>
                  </div>
                  <Field className="field" id="password" name="password">
                    {({ field }) => <Input type="password" {...field} />}
                  </Field>
                </div>

                <br></br>

                <span className="button-container-login-page">
                  <Button className="login-button" type="submit">
                    Login
                  </Button>
                </span>
              </div>
              <br></br>
            </Form>
          </Formik>

          <Modal
            basic
            trigger={<Button onClick={() => setOpen(true)}>Register</Button>}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
            style={{ textAlign: "center" }}
          >
            <Modal.Header>Create an Account</Modal.Header>

            <Modal.Content>
              <Formik initialValues={initialValues1} onSubmit={onSubmit}>
                <Form>
                  <div>
                    <label htmlFor="firstName">First Name</label>
                  </div>
                  <Field id="firstName" name="firstName">
                    {({ field }) => <Input {...field} />}
                  </Field>
                  <div>
                    <label htmlFor="lastName">Last Name</label>
                  </div>
                  <Field id="lastName" name="lastName">
                    {({ field }) => <Input {...field} />}
                  </Field>
                  <div>
                    <label htmlFor="userName">User Name</label>
                  </div>
                  <Field id="userName" name="userName">
                    {({ field }) => <Input {...field} />}
                  </Field>
                  <div>
                    <label htmlFor="password">Password</label>
                  </div>
                  <Field id="password" name="password">
                    {({ field }) => <Input type="password" {...field} />}
                  </Field>
                  <div>
                    <label htmlFor="email">Email</label>
                  </div>
                  <Field id="email" name="email">
                    {({ field }) => <Input {...field} />}
                  </Field>
                  <div></div>
                  <br></br>

                  <div>
                    <Button
                      className="login-button"
                      type="submit"
                      //onClick={() => setOpen(false)}
                    >
                      Create Account
                    </Button>
                    <br />
                    <br />
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                  </div>
                </Form>
              </Formik>
            </Modal.Content>
            <Modal.Actions></Modal.Actions>
          </Modal>
        </div>
      </div>
    </PageWrapper>
  );
};
