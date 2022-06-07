import styled from "styled-components";

export const List=styled.ul`
    height:100%;
    list-style-type:none;
    padding:0px;
`;
export const Item=styled.li`
    background-color:#fff;
    border-right:2px solid #000; 
    margin-top:8px; 
    padding:12px;
    &:hover{
        background-color:#7393B3;

    }
`;