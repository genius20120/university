import styled from 'styled-components'

export const Button=styled.button`
margin-top:16px;
width:64px;
background-color:${({theme,bgColor})=>bgColor?bgColor:theme.body.button};
border-radius:4px;
transition: 0.35s;
&:hover{
    transform:scale(1.7);
}
`
