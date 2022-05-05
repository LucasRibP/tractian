import { Form, Input, Modal } from "antd-mobile";
import styled from "styled-components";
import Unit from "../../../../domain/entities/unit";
import UnitDataUpdate from "../../../../domain/entities/unit-data-update";

export default async function openUnitEditModal(
  unit: Unit,
  onConfirm: (update: UnitDataUpdate) => void
) {
  let query = "";
  const result = await Modal.confirm({
    content: (
      <EditBox>
        <Form>
          <Form.Header>Insira os novos dados da unidade</Form.Header>
          <Form.Item label="Nome">
            <Input
              defaultValue={unit.name}
              onChange={(newQuery) => (query = newQuery)}
            />
          </Form.Item>
        </Form>
      </EditBox>
    ),
    confirmText: "Confirmar",
    cancelText: "Cancelar",
  });
  if (result) onConfirm({ id: unit.id, name: query });
}

const EditBox = styled.div`
  margin: 0 0.5rem 1rem 0;
`;
