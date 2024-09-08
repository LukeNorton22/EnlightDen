import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LandingPage } from "../pages/landing-page/landing-page";
import { NotFoundPage } from "../pages/not-found";
import { useUser } from "../authentication/use-auth";
import { UserPage } from "../pages/user-page/user-page";
import { PageWrapper } from "../components/page-wrapper/page-wrapper";
import { InventoriesPage } from "../pages/Inventories-page/Inventories";
import {
  BulletJournalCreateListing,
  BulletJournalCreatePage,
} from "../pages/BulletJournalContents/create-page/bullet-journal-contents-create";
import { BulletJournalListingPage } from "../pages/BulletJournalContents/listing-page/bullet-journal-listing";
import { EmailNewslettersPage } from "../pages/EmailNewsletter/emailNewsletterListing";
import { EmailNewsletterCreatePage } from "../pages/EmailNewsletter/EmailNewsletterCreate";
import { SubscriberCreatePage } from "../pages/Subscribers/subscribersCreate";
import { SubscriberUpdatePage } from "../pages/Subscribers/subscribersUpdate";
import { EmailNewsletterUpdatePage } from "../pages/EmailNewsletter/EmailNewsletterUpdate";
import { BulletJournalUpdatePage } from "../pages/BulletJournalContents/update-page/bullet-journal-update";
import { InventoriesCreatePage } from "../pages/Inventories-page/Inventories-Create";
import { InventoriesUpdatePage } from "../pages/Inventories-page/Inventories-Update-Page";
import { SubscribersPage } from "../pages/Subscribers/subscribers";
import { UserCreatePage } from "../pages/login-page/login-create-page";

//This is where you will declare all of your routes (the ones that show up in the search bar)
export const routes = {
  root: `/`,
  home: `/home`,
  user: { user: `/user`, create: "/usercreate" },

  inventory: {
    Inventory: "/inventory",
    InventoryCreate: "/inventory/create",
    InventoryUpdate: "/Inventory/:id",
  },
  bulletJournal: {
    listing: "/BulletJournal",
    create: "/BulletJournal/create",
    update: "/BulletJournal/update/:id",
    delete: "/BulletJournal/delete/:id",
  },

  Subscribers: {
    listing: "/subscribers",
    create: "/subscribers/create",
    update: "/subscribers/update/:id",
  },
  EmailNewsletters: {
    listing: "/emailNewsletters",
    create: "/emailNewsletters/create",
    update: "/emailNewsletters/update/:id",
  },
};

//This is where you will tell React Router what to render when the path matches the route specified.
export const Routes = () => {
  //Calling the useUser() from the use-auth.tsx in order to get user information
  const user = useUser();
  return (
    <>
      {/* The page wrapper is what shows the NavBar at the top, it is around all pages inside of here. */}
      <PageWrapper user={user}>
        <Switch>
          {/* When path === / render LandingPage */}
          <Route path={routes.home} exact>
            <LandingPage />
          </Route>
          {/* When path === /user render UserPage */}
          <Route path={routes.user.user} exact>
            <UserPage />
          </Route>

          <Route path={routes.user.create} exact>
            <UserCreatePage />
          </Route>

          <Route path={routes.inventory.Inventory} exact>
            <InventoriesPage />
          </Route>
          <Route path={routes.inventory.InventoryCreate} exact>
            <InventoriesCreatePage />
          </Route>
          <Route path={routes.inventory.InventoryUpdate} exact>
            <InventoriesUpdatePage />
          </Route>
          {/* <Route path={routes.inventory.InventoryDelete} exact>
            <InventoriesDelete />
          </Route> */}
          {/* Going to route "localhost:5001/" will go to homepage */}
          <Route path={routes.root} exact>
            <Redirect to={routes.home} />
          </Route>

          <Route path={routes.bulletJournal.listing} exact>
            <BulletJournalListingPage />
          </Route>

          <Route path={routes.bulletJournal.create} exact>
            <BulletJournalCreatePage />
          </Route>

          <Route path={routes.bulletJournal.update} exact>
            <BulletJournalUpdatePage />
          </Route>

          {/*<Route path={routes.bulletJournal.delete} exact>
            <BulletJournalDeletePage />
          </Route>*/}

          <Route path={routes.EmailNewsletters.create} exact>
            <EmailNewsletterCreatePage />
          </Route>
          <Route path={routes.EmailNewsletters.update} exact>
            <EmailNewsletterUpdatePage />
          </Route>

          <Route path={routes.EmailNewsletters.listing} exact>
            <EmailNewslettersPage />
          </Route>
          <Route path={routes.Subscribers.listing} exact>
            <SubscribersPage />
          </Route>
          <Route path={routes.Subscribers.create} exact>
            <SubscriberCreatePage />
          </Route>
          <Route path={routes.Subscribers.update} exact>
            <SubscriberUpdatePage />
          </Route>
          {/* This should always come last.  
            If the path has no match, show page not found */}
          <Route path="*" exact>
            <NotFoundPage />
          </Route>
        </Switch>
      </PageWrapper>
    </>
  );
};
