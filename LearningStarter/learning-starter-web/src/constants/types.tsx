/* eslint-disable @typescript-eslint/no-unused-vars */
//This type uses a generic (<T>).  For more information on generics see: https://www.typescriptlang.org/docs/handbook/2/generics.html

import internal from "stream";

//You probably wont need this for the scope of this class :)
export type ApiResponse<T> = {
  data: T;
  errors: Error[];
  hasErrors: boolean;
};

export type Error = {
  property: string;
  message: string;
};

export type AnyObject = {
  [index: string]: any;
};

export type UserCreateDto = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
};

export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
};

export type UserGetDto = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
};

export type InventoriesGetDto = {
  id: number;
  itemName: string;
  productionCost: string;
  quantity: string;
  availabilty: boolean;
  comments: string;
  onlineStoreId: string;
  siteListing: string;
  dateAdded: string;
};

export type InventoriesCreateDto = {
  id: number;
  itemName: string;
  productionCost: string;
  quantity: string;
  availabilty: boolean;
  comments: string;
  onlineStoreId: string;
  siteListing: string;
  dateAdded: string;
};

export type InventoriesUpdateDto = {
  itemName: string;
  productionCost: string;
  quantity: string;
  availabilty: boolean;
  comments: string;
  onlineStoreId: string;
  siteListing: string;
  dateAdded: string;
};

export type InventoriesDeleteDto = {
  id: number;
  itemName: string;
  productionCost: string;
  quantity: string;
  availabilty: boolean;
  comments: string;
  onlineStoreId: string;
  siteListing: string;
  dateAdded: string;
};

export type BulletJournalEntryCreateDTO = {
  id: number;
  contents: string;
  isDone: boolean;
  DateCreated: Date;
  //pushes: number;
};

export type BulletJournalEntryGetDTO = {
  id: number;
  contents: string;
  isDone: boolean;
  DateCreated: Date;
  //add others from controller later
};

export type BulletJournalEntryUpdateDto = {
  // isDone: boolean;
  contents: string;

  //add others from controller later nkjhlkjhlk
};

export type BulletJournalOptionsDto = {
  text: string;
  values: number;
};

export type BulletJournalOptionsResponseDto = {
  itemTypeOptions: BulletJournalOptionsDto[];
  effectTypeOptions: BulletJournalOptionsDto[];
};

export type SubscriberGetDto = {
  id: number;
  name: string;
  email: string;
  dateSubscribed: Date;
};

export type SubscriberCreateDto = {
  name: string;
  email: string;
  dateSubscribed: Date;
};
export type SubscriberUpdateDto = {
  id: number;
  name: string;
  email: string;
  dateSubscribed: Date;
};
export type SubscriberDeleteDto = {
  id: number;
  name: string;
  email: string;
  dateSubscribed: Date;
};
export type EmailNewsletterCreateDto = {
  title: string;
  message: string;
  dateSent: Date;
};

export type EmailNewsletterGetDto = {
  id: number;
  title: string;
  message: string;
  dateSent: Date;
};

export type EmailNewsletterUpdateDto = {
  title: string;
  message: string;
};
export type EmailNewsletterDeleteDto = {
  id: number;
  title: string;
  message: string;
  dateSent: Date;
};
