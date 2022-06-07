import styled from "styled-components";

export const ProfileImage=styled.img`
    width:80px;
    height:80px;
    border-radius:50%;
    margin-bottom:${({marginBottom})=>marginBottom?marginBottom:'20px'}
`;
export const IconImage=styled.img`
    height:${({height,theme})=>height?height:theme.body.iconHeight};

`;
