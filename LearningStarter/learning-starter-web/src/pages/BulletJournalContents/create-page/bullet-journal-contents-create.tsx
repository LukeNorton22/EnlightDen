/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

import { Field, Form, Formik } from "formik";

import React, { useEffect, useState } from "react";

import { useStateWithHistory } from "react-use";

import { BaseUrl } from "../../../constants/ens-vars";
import {
  ApiResponse,
  BulletJournalEntryCreateDTO,
  BulletJournalEntryGetDTO,
} from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import {
  Button,
  Checkbox,
  Header,
  Icon,
  Input,
  Modal,
  Segment,
  Table,
  TableBody,
} from "semantic-ui-react";

import "./bullet-journal-create.css";

const initialValues: BulletJournalEntryCreateDTO = {
  contents: " ",
  id: 0,
  //need to add date created
  isDone: false,

  /*DateCreated: -Now,*/

  DateCreated: new Date(),
};

export const BulletJournalCreatePage = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [bulletJournalEntries, setBulletJournalEntries] =
    useState<BulletJournalEntryGetDTO[]>();

  const fetchBulletJournal = async () => {
    const response = await axios.get<ApiResponse<BulletJournalEntryGetDTO[]>>(
      `${BaseUrl}/api/BulletJournal`
    );
    if (response.data.hasErrors) {
      alert("Something went wrong!");
      return;
      /*response.data.errors.forEach(err => {
                  console.log(err.message);
              });*/
    } else {
      setBulletJournalEntries(response.data.data);
    }
  };

  const onSubmit = async (values: BulletJournalEntryCreateDTO) => {
    setSubmitLoading(true);
    const response = await axios.post<ApiResponse<BulletJournalEntryGetDTO>>(
      `${BaseUrl}/api/BulletJournal`,
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
    history.push(routes.bulletJournal.listing);
    await fetchBulletJournal();
    setSubmitLoading(false);
    setOpen(false);
    /*else {
      

     // history.push(routes.bulletJournal.listing); //probably needs to go to listing page
    }*/
  };

  const onClick = async () => {
    setOpen(false);
    history.push(routes.bulletJournal.listing);
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
            Create An Entry
          </Modal.Header>
          <Modal.Content>
            <Form>
              {/* <div className="input-label">
                <label htmlFor="contents">What do you have to do?</label>
  </div> */}
              <Field
                id="contents"
                name="contents"
                type="input"
                placeHolder="Do Something"
              >
                {({ field }) => <Input className="ui fluid input" {...field} />}
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

//Listings at bottom to fill up the screen, AESTHETICS

export const BulletJournalCreateListing = () => {
  const [bulletJournalEntries, setBulletJournalEntries] =
    useState<BulletJournalEntryGetDTO[]>();
  console.log(bulletJournalEntries);
  const fetchBulletJournal = async () => {
    const response = await axios.get<ApiResponse<BulletJournalEntryGetDTO[]>>(
      `${BaseUrl}/api/BulletJournal`
    );
    if (response.data.hasErrors) {
      alert("Something went wrong!");
      return;
      /*response.data.errors.forEach(err => {
                console.log(err.message);
            });*/
    } else {
      setBulletJournalEntries(response.data.data);
    }
  };

  useEffect(() => {
    fetchBulletJournal();
  }, []);

  //try going in back end and make controller for mark-done

  const markBulletJournalEntryAsDone = async (id: number, isDone: Boolean) => {
    console.log("debug", { isDone });
    const response = await axios.put(
      `${BaseUrl}/api/BulletJournal/mark-done/${id}`,
      isDone,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    }
  };

  //possibly animate button to change what it says when hovered over

  return (
    <>
      {bulletJournalEntries && (
        <Segment className="background">
          <Header className="thing-tsb-white">Entries</Header>
          <Table className="table-format">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Id
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  isDone
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Contents
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <TableBody>
              {bulletJournalEntries.map((bulletJournalEntry) => {
                return (
                  <Table.Row
                    key={bulletJournalEntry.id}
                    style={{
                      borderColor: "black",
                    }}
                  >
                    <Table.Cell style={{ color: "white" }}>
                      {bulletJournalEntry.id}
                    </Table.Cell>
                    <Table.Cell>
                      <Checkbox
                        name="isDone"
                        className="ui radio checkbox"
                        defaultChecked={bulletJournalEntry.isDone}
                        onChange={(e, data) =>
                          markBulletJournalEntryAsDone(
                            bulletJournalEntry.id,
                            data.checked ?? false
                          )
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>{bulletJournalEntry.contents}</Table.Cell>
                  </Table.Row>
                );
              })}
            </TableBody>
          </Table>
        </Segment>
      )}
    </>
  );
};
