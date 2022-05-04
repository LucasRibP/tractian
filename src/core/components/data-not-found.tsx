import { FC } from "react";
import styled from "styled-components";

const DataNotFound: FC<{ justification?: string }> = ({ justification }) => {
  const message =
    justification !== undefined ? `Isso ocorreu pois: ${justification}` : "";

  return (
    <MessageContainer>
      <div>
        Os dados buscados não foram encontrados, favor voltar para outra página
      </div>
      <div>{message}</div>
    </MessageContainer>
  );
};

const MessageContainer = styled.div``;

export default DataNotFound;
