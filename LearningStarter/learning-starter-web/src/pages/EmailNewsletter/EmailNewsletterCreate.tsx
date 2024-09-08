/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useStateWithHistory } from "react-use";

import { BaseUrl } from "../../constants/ens-vars";
import {
  ApiResponse,
  EmailNewsletterCreateDto,
  EmailNewsletterGetDto,
  EmailNewsletterUpdateDto,
  EmailNewsletterDeleteDto,
} from "../../constants/types";
import { useHistory } from "react-router-dom";
import { routes, Routes } from "../../routes/config";
import { Button, Input, Modal, TextArea } from "semantic-ui-react";
import { O_NOFOLLOW } from "constants";

const initialValues: EmailNewsletterCreateDto = {
  title: "",
  message: "",
  dateSent: new Date(),
};

export const EmailNewsletterCreatePage = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emailNewsletters, setEmailNewsletters] =
    useState<EmailNewsletterGetDto[]>();

  const fetchEmailNewsletters = async () => {
    const response = await axios.get<ApiResponse<EmailNewsletterGetDto[]>>(
      "api/email-newsletter"
    );
    if (response.data.hasErrors) {
      alert("Something went wrong!");
      return;
    }

    setEmailNewsletters(response.data.data);
  };

  const onSubmit = async (values: EmailNewsletterCreateDto) => {
    const response = await axios.post<ApiResponse<EmailNewsletterGetDto>>(
      `${BaseUrl}/api/email-newsletter`,
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
    history.push(routes.EmailNewsletters.listing);
    await fetchEmailNewsletters();
    setSubmitLoading(false);
  };

  const onClick = async () => {
    setOpen(false);
    history.push(routes.EmailNewsletters.listing);
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
            Draft A Newsletter
          </Modal.Header>
          <Modal.Content style={{ textAlign: "center" }}>
            <Form>
              <div>
                <label htmlFor="title">Title</label>
              </div>
              <Field id="title" name="title">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="message">Message</label>
              </div>
              <Field id="message" name="message">
                {({ field }) => (
                  <TextArea
                    placeholder="What do you have to say!"
                    style={{ minHeight: 300, minWidth: 300 }}
                    {...field}
                  />
                )}
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
