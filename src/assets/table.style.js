import styled from 'styled-components';

export const TableStyled = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;
export const ThStyled = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: blue;
  color: white;
  border: 1px solid #ddd;
  padding: 8px;
`;
export const TdStyled = styled.td`
  text-align: center;
  border: 1px solid #ddd;
  padding: 8px;
`;
export const TrStyled = styled.tr`
  &:hover {
    background-color: #ddd;
  }
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
export const TdFootStyled = styled(ThStyled)`
  background-image: linear-gradient(to right, #f6d365 0%, #fda085 100%);
  color: black;
`;
export const Resizer = styled.div`
  display: inline-block;
  background: black;
  width: 10px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
  z-index: 1;
  touch-action: none;
  &:hover {
    background: red;
  }
`;
