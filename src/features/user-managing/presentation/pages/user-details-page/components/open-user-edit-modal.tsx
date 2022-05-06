import { Form, Input, Modal } from "antd-mobile";
import styled from "styled-components";
import User from "../../../../domain/entities/user";
import UserDataUpdate from "../../../../domain/entities/user-data-update";

export default async function openUserEditModal(
  user: User,
  onConfirm: (update: UserDataUpdate) => void
) {
  let userUpdate = user;
  const result = await Modal.confirm({
    content: (
      <EditBox>
        <Form>
          <Form.Header>Insira os novos dados do usuário</Form.Header>
          <Form.Item label="Nome">
            <Input
              defaultValue={user.name}
              onChange={(newQuery) => (userUpdate.name = newQuery)}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              defaultValue={user.email}
              onChange={(newQuery) => (userUpdate.email = newQuery)}
            />
          </Form.Item>
        </Form>
      </EditBox>
    ),
    confirmText: "Confirmar",
    cancelText: "Cancelar",
  });
  if (result) onConfirm(userUpdate);
}

const EditBox = styled.div`
  margin: 0 0.5rem 1rem 0;
`;
