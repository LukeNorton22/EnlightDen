/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Header,
  Segment,
  Table,
  TableBody,
  Button,
  Icon,
  Checkbox,
  Modal,
  Input,
  TableCell,
  TableRow,
} from "semantic-ui-react";
import { ApiResponse, InventoriesGetDto } from "../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";
import { Form, Formik } from "formik";

import "./inventory-listing.css";

export const InventoriesPage = () => {
  const history = useHistory();
  const [inventories, setInventories] = useState<InventoriesGetDto[]>();
  const [open, setOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  useEffect(() => {
    const fetchInventories = async () => {
      const response = await axios.get<ApiResponse<InventoriesGetDto[]>>(
        "api/Inventories"
      );
      if (response.data.hasErrors) {
        alert("Something went wrong.");
        return;
      }
      setInventories(response.data.data);
    };
    fetchInventories();
  }, []);

  return (
    <>
      {inventories && (
        <Segment className="background">
          <Input
            type="text"
            placeholder="Search inventory..."
            className="ui left icon input loading"
            id="abId0.6393624643593341"
          ></Input>
          <Header className="thing-tsb-white">Inventories</Header>
          <Button
            className="ui button thing-tsb-white"
            onClick={() => history.push(routes.inventory.InventoryCreate)}
          >
            <Icon name="add" />
            Create An Inventory Item
          </Button>
          <Table className="table-format">
            <Table.Header>
              <Table.Row>
                {/* <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Id
                </Table.HeaderCell> */}

                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Item Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Production Cost
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Quantity
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Availability
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Comments
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Store Listed at
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Selling Price
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Date Added
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{
                    backgroundColor: "#44444c",
                    color: "white",
                  }}
                ></Table.HeaderCell>
                <Table.HeaderCell
                  style={{
                    backgroundColor: "#44444c",
                    color: "white",
                  }}
                ></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <TableBody>
              {inventories.map((inventory) => (
                <Table.Row key={inventory.id}>
                  {/* <Table.Cell>{inventory.id}</Table.Cell> */}
                  <Table.Cell>{inventory.itemName}</Table.Cell>
                  <Table.Cell>{inventory.productionCost}</Table.Cell>
                  <Table.Cell>{inventory.quantity}</Table.Cell>
                  <Table.Cell>
                    <Checkbox
                      style={{ textAlign: "center" }}
                      name="availability"
                      className="ui checkbox"
                      defaultChecked={inventory.availabilty}
                    />
                  </Table.Cell>

                  <Table.Cell>
                    <Modal
                      basic
                      as={TableRow}
                      trigger={
                        <Button onClick={() => setOpen(true)}>
                          View Comments
                        </Button>
                      }
                      style={{ textAlign: "center" }}
                      onOpen={() => setOpen(true)}
                      onClose={() => setOpen(false)}
                      open={open}
                    >
                      <Modal.Header>Comments</Modal.Header>

                      <Modal.Content
                        name="comments"
                        key={inventory.id}
                        style={{ textAlign: "center" }}
                      >
                        <Table.Cell style={{ textAlign: "center" }}>
                          {" "}
                          {inventory.comments}
                        </Table.Cell>
                      </Modal.Content>

                      <Modal.Actions style={{ textAlign: "center" }}>
                        <Button onClick={() => setOpen(false)}>
                          <Icon name="delete" />
                          Close
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  </Table.Cell>
                  <Table.Cell>{inventory.onlineStoreId}</Table.Cell>
                  <Table.Cell>{inventory.siteListing}</Table.Cell>
                  <Table.Cell>{inventory.dateAdded}</Table.Cell>
                  <Table.Cell>
                    <Button
                      className="ui icon button"
                      onClick={() =>
                        history.push(
                          routes.inventory.InventoryUpdate.replace(
                            ":id",
                            `${inventory.id}`
                          )
                        )
                      }
                    >
                      <Icon name="pencil" />
                    </Button>
                  </Table.Cell>
                  {/* <Table.Cell>
          <Button
            onClick={() =>
              history.push(
                routes.inventory.InventoryDelete.replace(
                  ":id",
                  `${inventory.id}`
                )
              )
            }
          >
            Delete?
          </Button>
        </Table.Cell> */}
                </Table.Row>
              ))}
            </TableBody>
          </Table>
        </Segment>
      )}
    </>
  );
};
function useRouteMatch<T>() {
  throw new Error("Function not implemented.");
}
