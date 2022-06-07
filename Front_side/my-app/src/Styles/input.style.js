
import styled from "styled-components";

export const TextInput=styled.input`
    height:40px;
    width:30%;
    min-width:180px;
    background-color:${({bgColor})=>bgColor?bgColor:'#fff'};
    border: 2px solid  black;
    border-radius:${({theme})=>theme.body.borderRadius} ;
    margin:16px;
    text-align:right;
    transition: 0.35s;
    &:focus{
        text-align:${({textAlign})=>textAlign};
        transform:scale(1.3)
    }
`;