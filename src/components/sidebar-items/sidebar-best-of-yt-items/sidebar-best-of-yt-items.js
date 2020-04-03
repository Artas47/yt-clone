import React from "react";
import SidebarItem from "../../sidebar-item/sidebar-item";
import { primaryItems, secondaryItems } from "./sidebar-best-of-yt-items.data";
import { useLocation } from "react-router-dom";
import * as Styled from "../sidebar-items.styles";

const SidebarBestOfYtItems = () => {
  const location = useLocation();
  return (
    <>
      <Styled.SidebarItemsPrimaryWrapper>
        <Styled.SidebarItemsText>Best of youtube</Styled.SidebarItemsText>
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
    </>
  );
};

export default SidebarBestOfYtItems;
