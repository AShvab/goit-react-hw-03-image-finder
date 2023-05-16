import styled from "@emotion/styled";

export const Item = styled.li`
    border-radius: 2px;  
`;
   
export const Img = styled.img`
    width: 100%;   
    height: 260px;
    object-fit: cover;
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
        transform: scale(1.05);
        cursor: zoom-in;
        box-shadow: 0px 3px 3px 0px rgba(34, 9, 107, 0.521);
    }
`
