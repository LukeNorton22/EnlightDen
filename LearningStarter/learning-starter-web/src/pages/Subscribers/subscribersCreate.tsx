/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useStateWithHistory } from "react-use";

import { BaseUrl } from "../../constants/ens-vars";
import {
  ApiResponse,
  SubscriberCreateDto,
  SubscriberGetDto,
} from "../../constants/types";
import { useHistory } from "react-router-dom";
import { routes, Routes } from "../../routes/config";
import { Button, Input, Modal } from "semantic-ui-react";
import { O_NOFOLLOW } from "constants";

const initialValues: SubscriberCreateDto = {
  name: "",
  email: "",
  dateSubscribed: new Date(),
};

export const SubscriberCreatePage = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [subscribers, setSubscribers] = useState<SubscriberGetDto[]>();

  const fetchSubscribers = async () => {
    const response = await axios.get<ApiResponse<SubscriberGetDto[]>>(
      "api/subscriber"
    );
    if (response.data.hasErrors) {
      alert("Something went wrong!");
      return;
    }

    setSubscribers(response.data.data);
  };

  const onSubmit = async (values: SubscriberCreateDto) => {
    const response = await axios.post<ApiResponse<SubscriberGetDto>>(
      `${BaseUrl}/api/subscriber`,
      values,
      { validateStatus: () => true }
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
      setSubmitLoading(false);
      return;
    }
    setOpen(false);
    history.push(routes.Subscribers.listing);
    await fetchSubscribers();
    setSubmitLoading(false);
  };

  const onClick = async () => {
    setOpen(false);
    history.push(routes.Subscribers.listing);
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>

        <Modal
          basic
          as={Form}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={true}
        >
          <Modal.Header style={{ textAlign: "center" }}>
            Add A New Subscriber
          </Modal.Header>
          <Modal.Content style={{ textAlign: "center" }}>
            <Form>
              <div>
                <label htmlFor="name">Name</label>
              </div>
              <Field id="name" name="name">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="email">Email</label>
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
              <div className="or"></div>
              <Button type="button" className="ui btn-cancel" onClick={onClick}>
                Cancel
              </Button>
            </div>
          </Modal.Actions>
        </Modal>

      </Formik>
    </>
  );
};
