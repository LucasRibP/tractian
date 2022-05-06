import { Avatar, Modal, Radio } from "antd-mobile";
import styled from "styled-components";
import MachineHeader from "../../../../../../core/types/common-entities/machine-header";

export default async function openDelegateMachineModal(
  machinesAvaliableForUser: MachineHeader[],
  onConfirm: (addedMachine?: MachineHeader | null) => void
) {
  let selectedMachine = null;
  const result = await Modal.confirm({
    content: (
      <EditBox>
        <ModalTitleContainer>
          Selecione uma máquina para delegar para o usuário
        </ModalTitleContainer>
        <Radio.Group
          onChange={(index) =>
            (selectedMachine = machinesAvaliableForUser[Number(index)])
          }
        >
          {machinesAvaliableForUser.map((machine, index) => (
            <RadioItemContainer>
              <Radio value={index}>{machine.name}</Radio>
            </RadioItemContainer>
          ))}
        </Radio.Group>
      </EditBox>
    ),
    confirmText: "Confirmar",
    cancelText: "Cancelar",
  });
  if (result) onConfirm(selectedMachine);
}

const ModalTitleContainer = styled.div`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const RadioItemContainer = styled.div`
  margin: 0.5rem 0.5rem 0.5rem;
`;

const EditBox = styled.div`
  margin: 0 0.5rem 1rem 0;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
