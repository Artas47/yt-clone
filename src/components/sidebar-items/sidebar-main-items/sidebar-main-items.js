import React from "react";
import SidebarItem from "../../sidebar-item/sidebar-item";
import { primaryItems, secondaryItems } from "./sidebar-main-items.data";
import { useLocation } from "react-router-dom";
import * as Styled from "../sidebar-items.styles";
import SignInButton from "../../sign-in-button/sign-in-button";

const SidebarMainItems = () => {
  const location = useLocation();
  return (
    <>
      <Styled.SidebarItemsPrimaryWrapper>
        {primaryItems.map(item => {
          return (
            <SidebarItem active={location.pathname === item.path} item={item} />
          );
        })}
      </Styled.SidebarItemsPrimaryWrapper>
      <Styled.SidebarItemsSecondaryWrapper>
        {secondaryItems.map(item => {
          return (
            <SidebarItem active={location.pathname === item.path} item={item} />
          );
        })}
      </Styled.SidebarItemsSecondaryWrapper>
      <Styled.SidebarItemsSignInTextWrapper>
        <Styled.SidebarItemsSignInText>
          Sign in to like videos, comment, and subscribe.
        </Styled.SidebarItemsSignInText>
        <SignInButton />
      </Styled.SidebarItemsSignInTextWrapper>
    </>
  );
};

export default SidebarMainItems;
