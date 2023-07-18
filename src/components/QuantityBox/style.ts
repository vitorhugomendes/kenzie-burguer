import styled from 'styled-components';

export const StyledQuantityBox = styled.div`
  display: flex;
  gap: 10px;

  button {
    background: transparent;
    color: ${({ theme }) => theme.colors.secondary};
    transition: 0.4s;

    :hover {
      opacity: 0.4;
    }
  }

  .quantity {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
