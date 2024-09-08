/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table } from "semantic-ui-react";
import {
  ApiResponse,
  SubscriberGetDto,
  SubscriberUpdateDto,
  SubscriberDeleteDto,
  SubscriberCreateDto,
} from "../../constants/types";
import { useRouteMatch, useHistory } from "react-router-dom";
import { routes } from "../../routes/config";
import { BaseUrl } from "../../constants/ens-vars";
import { FormikBag } from "formik";
import { useStateWithHistory } from "react-use";
import { Routes } from "../../routes/config";
import { O_NOFOLLOW } from "constants";

import "./subscriber-listing.css";

export const SubscriberUpdatePage = () => {
  const history = useHistory();
  let match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const [subscriber, setSubscriber] = useState<SubscriberGetDto>();
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchSubscribers = async () => {
      const response = await axios.get<ApiResponse<SubscriberGetDto>>(
        `/api/subscriber/${id}`
      );

      setSubscriber(response.data.data);
    };

    fetchSubscribers();
  }, [id]);

  const onSubmit = async (values: SubscriberUpdateDto) => {
    const response = await axios.put<ApiResponse<SubscriberGetDto>>(
      `/api/subscriber/${id}`,
      values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.Subscribers.listing);
    }
  };
  const Click1 = async () => {
    const response = await axios.delete<ApiResponse<SubscriberGetDto>>(
      `/api/subscriber/${id}`
    );
    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      setSecondOpen(false);
      setFirstOpen(false);
      history.push(routes.Subscribers.listing);
    }
  };

  const onClick3 = async () => {
    setFirstOpen(false);
    history.push(routes.Subscribers.listing);
  };

  const onClick4 = async () => {
    setSecondOpen(true);
  };

  const onClick5 = async () => {
    setSecondOpen(false);
  };

  return (
    <>
      {subscriber && (
        <Formik initialValues={subscriber} onSubmit={onSubmit}>
          <Modal
            basic
            as={Form}
            onOpen={() => setFirstOpen(true)}
            onClose={() => setFirstOpen(false)}
            open={true}
          >
            <Modal.Header style={{ textAlign: "center" }}>
              Edit Subscriber Info
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
                <Button className="ui btn thing-tsb-white" type="submit">
                  Update
                </Button>
                <div style={{ textAlign: "center" }} className="or"></div>
                <Button
                  className="ui btn-cancel"
                  type="button"
                  onClick={onClick4}
                >
                  Delete
                </Button>
              </div>
              <br />
              <br />
              <Button className="ui large button" onClick={onClick3}>
                Return
              </Button>
            </Modal.Actions>
            <Modal open={secondOpen} size="small">
              <Modal.Header>Are you sure you want to delete?</Modal.Header>
              <Modal.Content>
                <strong>
                  Deleting an entry is a permenent action that you cannot undo.
                </strong>
              </Modal.Content>
              <Modal.Actions>
                <Button icon="check" content="Yes, delete" onClick={Click1} />
                <Button icon="delete" content="No, cancel" onClick={onClick5} />
              </Modal.Actions>
            </Modal>
          </Modal>
        </Formik>
      )}
    </>
  );
};
