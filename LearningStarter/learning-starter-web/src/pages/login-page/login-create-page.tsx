import React, { useState } from "react";
import {
  ApiResponse,
  UserCreateDto,
  UserDto,
  UserGetDto,
} from "../../constants/types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constants/ens-vars";
import { routes } from "../../routes/config";
import { Field, Form, Formik } from "formik";
import { Button, Input, Modal } from "semantic-ui-react";
import { PageWrapper } from "../../components/page-wrapper/page-wrapper";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialValues: UserCreateDto = {
  id: 0,
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
  email: "",
};

export const UserCreatePage = () => {
  const [open, setOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const history = useHistory();
  const [users, setUsers] = useState<UserGetDto[]>();

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
      history.push(routes.user.create);
    }

    setOpen(false);
    history.push(routes.user.create);
    await fetchUsers();
    setSubmitLoading(false);
  };

  const onClick = async () => {
    setOpen(false);
  };

  return (
    <>
      <PageWrapper>
        <div className="flex-box-centered-content-login-page">
          <div className="login-form"></div>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Modal
              basic
              trigger={
                <Button styles={{ backgroundColor: "#44444c" }}></Button>
              }
              as={Form}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              open={true}
            >
              <Modal.Header style={{ textAlign: "center" }}>
                Create an account
              </Modal.Header>
              <Modal.Content style={{ textAlign: "center" }}>
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
                    <label htmlFor="password">password</label>
                  </div>
                  <Field id="password" name="password">
                    {({ field }) => <Input password {...field} />}
                  </Field>
                  <div>
                    <label htmlFor="email">emailt</label>
                  </div>
                  <Field id="email" name="email">
                    {({ field }) => <Input {...field} />}
                  </Field>
                </Form>
              </Modal.Content>
              <Modal.Actions style={{ textAlign: "center" }}>
                <div className="ui large buttons">
                  <Button type="submit" className="ui btn thing-tsb-white">
                    Save
                  </Button>
                  <Button
                    type="button"
                    className="ui btn-cancel"
                    onClick={onClick}
                  >
                    Cancel
                  </Button>
                </div>
              </Modal.Actions>
            </Modal>
          </Formik>
        </div>
      </PageWrapper>
    </>
  );
};
