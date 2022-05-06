import { Form, Input, Modal } from "antd-mobile";
import styled from "styled-components";
import Machine from "../../../../domain/entities/machine";
import MachineDataUpdate from "../../../../domain/entities/machine-data-update";

export default async function openMachineEditModal(
  machine: Machine,
  onConfirm: (update: MachineDataUpdate) => void
) {
  let machineUpdate = machine;
  const result = await Modal.confirm({
    content: (
      <EditBox>
        <Form>
          <Form.Header>Insira os novos dados da máquina</Form.Header>
          <Form.Item label="Nome">
            <Input
              defaultValue={machine.name}
              onChange={(newQuery) => (machineUpdate.name = newQuery)}
            />
          </Form.Item>
        </Form>
      </EditBox>
    ),
    confirmText: "Confirmar",
    cancelText: "Cancelar",
  });
  if (result) onConfirm(machineUpdate);
}

const EditBox = styled.div`
  margin: 0 0.5rem 1rem 0;
`;
