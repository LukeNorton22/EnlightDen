/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Input, Modal, TextArea } from "semantic-ui-react";
import {
  ApiResponse,
  InventoriesCreateDto,
  InventoriesGetDto,
} from "../../constants/types";
import axios from "axios";
import { BaseUrl } from "../../constants/ens-vars";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";

const initialValues: InventoriesCreateDto = {
  id: 0,
  itemName: "",
  productionCost: "",
  quantity: "",
  availabilty: true,
  comments: "",
  onlineStoreId: "",
  siteListing: "$",
  dateAdded: "",
};

export const InventoriesCreatePage = () => {
  const [open, setOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const history = useHistory();
  const [inventories, setInventories] = useState<InventoriesGetDto[]>();

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

  const onSubmit = async (values: InventoriesCreateDto) => {
    const response = await axios.post<ApiResponse<InventoriesGetDto>>(
      `${BaseUrl}/api/Inventories`,
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
    history.push(routes.inventory.Inventory);
    await fetchInventories();
    setSubmitLoading(false);
  };

  const onClick = async () => {
    setOpen(false);
    history.push(routes.inventory.Inventory);
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
            Create An Inventory Item
          </Modal.Header>
          <Modal.Content style={{ textAlign: "center" }}>
            <Form>
              <div>
                <label htmlFor="itemName">Item Name</label>
              </div>
              <Field id="itemName" name="itemName">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="productionCost">Production Cost</label>
              </div>
              <Field id="productionCost" name="productionCost">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="quantity">Quantity</label>
              </div>
              <Field id="quantity" name="quantity">
                {({ field }) => <Input {...field} />}
              </Field>

              <div>
                <label htmlFor="onlineStoreId">Store Listed at</label>
              </div>
              <Field id="onlineStoreId" name="onlineStoreId">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="siteListing">Selling Price</label>
              </div>
              <Field id="siteListing" name="siteListing">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="dateAdded">Date Added</label>
              </div>
              <Field id="dateAdded" name="dateAdded">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="comments">Comments</label>
              </div>
              <Field id="comments" name="comments">
                {({ field }) => <TextArea {...field} />}
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
