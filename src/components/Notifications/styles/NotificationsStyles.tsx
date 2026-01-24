import styled from 'styled-components';

export const AlarmNotificationsSection = styled.section`
  width: 300px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 7px 0px 7px 7px;
  font-size: 14px;
  z-index: 20;

  @media (max-width: 960px) {
    width: 100%;
    margin: 0;
    position: relative;
    padding: 7px;
  }
`;

export const AlarmsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const AlarmSettingsMobile = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 16px;
  padding: 7px;
  cursor: pointer;
  z-index: 30;
`;

export const HeaderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #5d5c5c;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
;
  border-radius: 15px 0 0 15px;
  z-index: 10;
  cursor: pointer;

  @media (max-width: 960px) {
    text-align: center;
    border-radius: 15px;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.05);
;
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
  }
`;

export const IconContainer = styled.div`
  width: 28px;
  padding-left: 8px;
  display: flex;
  align-items: center;
`;

export const Title = styled.h4`
  color: white;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
`;

export const StateWrapper = styled.div<{ toggleOpen: boolean }>`
  display: ${(props) => (props.toggleOpen ? 'block' : 'none')};
  border-radius: 0 0 0 15px;
`;

export const HorizontalScrollWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
  margin-top: 5px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 10px;
  }
`;

export const NotificationTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  color: white;
  table-layout: auto;
`;

export const TimeHeader = styled.th`
  font-family: "digital-7regular", monospace;
  font-size: 1.3;
  color: yellow;
  padding: 4px 2px;
  min-width: 42px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  text-align: center;
`;

export const StickyCell = styled.td`
  position: sticky;
  left: 0;
  /* Matches your App.scss background to hide the scrolling values */
  /* background-color: #423f3f; */
  z-index: 5;
  padding: 2px;
  width: 1px; /* Forces column to shrink to icon size */
  white-space: nowrap;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  /* Removes any inherited margins from icon components */
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const DataCell = styled.td`
  padding: 4px 2px;
  font-size: 11px; /* Smaller for mobile grid fit */
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #efefef;
  font-family: 'monospace';
  text-align: center;
  min-width: 42px;
`;

export const ValueFormat = styled.span`
  font-size: 10px;
  color: #aaa;
  margin-left: 1px;
`;
