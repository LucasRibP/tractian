import { Form, Input, Modal } from "antd-mobile";
import styled from "styled-components";
import Business from "../../../../domain/entities/business";
import BusinessDataUpdate from "../../../../domain/entities/business-data-update";

export default async function openBusinessEditModal(
  business: Business,
  onConfirm: (update: BusinessDataUpdate) => void
) {
  let query = business.name;
  const result = await Modal.confirm({
    content: (
      <EditBox>
        <Form>
          <Form.Header>Insira os novos dados da empresa</Form.Header>
          <Form.Item label="Nome">
            <Input
              defaultValue={business.name}
              onChange={(newQuery) => (query = newQuery)}
            />
          </Form.Item>
        </Form>
      </EditBox>
    ),
    confirmText: "Confirmar",
    cancelText: "Cancelar",
  });
  if (result) onConfirm({ id: business.id, name: query });
}

const EditBox = styled.div`
  margin: 0 0.5rem 1rem 0;
`;
