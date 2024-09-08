/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";

import { ApiResponse, SubscriberGetDto } from "../../constants/types";
import { Button, Header, Segment, Table, Input, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";

import "./subscriber-listing.css";

export const SubscribersPage = () => {
  const [subscribers, setSubscribers] = useState<SubscriberGetDto[]>();

  const history = useHistory();

  useEffect(() => {
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

    fetchSubscribers();
  }, []);
  return (
    <>
      {subscribers && (
        <Segment className="background">
          <div>
            <span>
              <Input
                type="text"
                placeholder="Search Subscribers..."
                className="ui left icon input loading"
                id="abId0.6393624643593341"
              ></Input>
            </span>
          </div>
          <Header className="thing-tsb-white">Subscribers</Header>
          <Button
            className="ui button thing-tsb-white"
            onClick={() => history.push(routes.Subscribers.create)}
          >
            <Icon name="add" />
            Add A New Subscriber
          </Button>
          <Table className="table-format">
            <Table.Header>
              <Table.HeaderCell
                style={{ backgroundColor: "#44444c", color: "white" }}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{ backgroundColor: "#44444c", color: "white" }}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{ backgroundColor: "#44444c", color: "white" }}
              >
                Date Subscribed
              </Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {subscribers.map((subscriber) => {
                return (
                  <>
                    <Table.Row>
                      <Table.Cell>{subscriber.name} </Table.Cell>
                      <Table.Cell>{subscriber.email}</Table.Cell>
                      <Table.Cell>{subscriber.dateSubscribed}</Table.Cell>
                      <Table.Cell>
                        <Button
                          className="ui icon button"
                          onClick={() =>
                            history.push(
                              routes.Subscribers.update.replace(
                                ":id",
                                `${subscriber.id}`
                              )
                            )
                          }
                        >
                          <i className="pencil alternate icon"></i>
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  </>
                );
              })}
            </Table.Body>
          </Table>
        </Segment>
      )}
    </>
  );
};
