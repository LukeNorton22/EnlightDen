import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Icon, Input, Modal, Table } from "semantic-ui-react";
import {
  ApiResponse,
  BulletJournalEntryGetDTO,
  BulletJournalEntryUpdateDto,
} from "../../../constants/types";
import { useRouteMatch, useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import { BaseUrl } from "../../../constants/ens-vars";

import "./BJupdate.css";

export const BulletJournalUpdatePage = () => {
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const history = useHistory();

  let match = useRouteMatch<{ id: string }>();
  const id = match.params.id;

  const [bulletJournalEntries, setBulletJournalEntries] =
    useState<BulletJournalEntryGetDTO>();

  /*const [bulletJournalEntriesOptions, setBulletJournalEntriesOptions] =
    useState<BulletJournalOptionsResponseDto>();
  */

  useEffect(() => {
    const fetchBulletJournal = async () => {
      const response = await axios.get<ApiResponse<BulletJournalEntryGetDTO>>(
        `/api/BulletJournal/${id}`
      );

      setBulletJournalEntries(response.data.data);
    };

    fetchBulletJournal();
  }, []);

  const onClick1 = async (values: BulletJournalEntryUpdateDto) => {
    const response = await axios.put<ApiResponse<BulletJournalEntryGetDTO>>(
      `/api/BulletJournal/${id}`,
      values //values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.bulletJournal.listing); //probably needs to go to listing page
    }
  };

  const onClick2 = async () => {
    const response = await axios.delete<ApiResponse<BulletJournalEntryGetDTO>>(
      `/api/BulletJournal/${id}`
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      setSecondOpen(false);
      setFirstOpen(false);
      history.push(routes.bulletJournal.listing); //probably needs to go to listing page
    }
  };

  const onClick3 = async () => {
    setFirstOpen(false);
    history.push(routes.bulletJournal.listing);
  };

  const onClick4 = async () => {
    setSecondOpen(true);
  };

  const onClick5 = async () => {
    setSecondOpen(false);
  };

  return (
    <>
      {bulletJournalEntries && (
        <Formik initialValues={bulletJournalEntries} onSubmit={onClick1}>
          <Modal
            basic
            as={Form}
            onClose={() => setFirstOpen(false)}
            open={true}
          >
            <Modal.Header style={{ textAlign: "center" }}>
              Edit Your Entry
            </Modal.Header>
            <Modal.Content style={{ textAlign: "center" }}>
              <Form>
                {/*<div>
                  <label htmlFor="contents">Contents</label>
                </div>*/}
                <Field id="contents" name="contents" className="contents">
                  {({ field }) => (
                    <Input style={{ alignSelf: "center" }} {...field} />
                  )}
                </Field>
              </Form>
            </Modal.Content>
            <Modal.Actions style={{ textAlign: "center" }}>
              <span style={{ textAlign: "center" }}>
                <div className="ui large buttons center">
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
                <Button
                  className="ui large button"
                  type="button"
                  onClick={onClick3}
                >
                  Return
                </Button>
              </span>
            </Modal.Actions>

            <Modal open={secondOpen} size="small">
              <Modal.Header>Are you sure you want to delete?</Modal.Header>
              <Modal.Content>
                <strong>
                  Deleting an entry is a permenent action that you cannot undo.
                </strong>
              </Modal.Content>
              <Modal.Actions>
                <Button icon="check" content="Yes, delete" onClick={onClick2} />
                <Button icon="delete" content="No, cancel" onClick={onClick5} />
              </Modal.Actions>
            </Modal>
          </Modal>
        </Formik>
      )}
    </>
  );
};

/*export const BulletJournalDeletePage = () => {
  const history = useHistory();

  let match = useRouteMatch<{ id: string }>();
  const id = match.params.id;

  const [bulletJournalEntries, setBulletJournalEntries] =
    useState<BulletJournalEntryGetDTO>();

  /*const [bulletJournalEntriesOptions, setBulletJournalEntriesOptions] =
    useState<BulletJournalOptionsResponseDto>();
  

  useEffect(() => {
    const fetchBulletJournal = async () => {
      const response = await axios.get<ApiResponse<BulletJournalEntryGetDTO>>(
        `/api/BulletJournal/${id}`
      );

      setBulletJournalEntries(response.data.data);
    };

    fetchBulletJournal();
  }, [id]);

  const Click = async () => {
    const response = await axios.delete<ApiResponse<BulletJournalEntryGetDTO>>(
      `/api/BulletJournal/${id}`
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.bulletJournal.listing); //probably needs to go to listing page
    }
  };

  return (
    <>
      bulletJournalEntries && (
        <Formik initialValues={bulletJournalEntries} onSubmit={onSubmit1}>
          <Form>
            <Table.Cell>
              <Button type="submit">Delete</Button>
            </Table.Cell>
            <Table.Cell>
              <Button
                onClick={() => history.push(routes.bulletJournal.listing)}
              >
                Cancel
              </Button>
            </Table.Cell>
          </Form>
        </Formik>
      )
    </>
  );
};*/

/* <div>
              <label htmlFor="contents">Contents</label>
            </div>
            <Field id="contents" name="contents">
              {({ field }) => <Input {...field} />}
            </Field>
            <div>
              <Button type="submit">Submit</Button>
            </div> */
