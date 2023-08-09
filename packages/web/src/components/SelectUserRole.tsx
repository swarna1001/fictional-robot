import { Button, Container, Group, Radio, Stack } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../axios";
import { enqueueSnackbar } from "notistack";

export const SelectUserRole = (id: { id: string }) => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("manager");
  const updateRoleMutation = updateRole();

  function updateUser() {
    let is_manager = false;
    if (value === "manager") {
      is_manager = true;
    }

    updateRoleMutation.mutate(
      {
        id: id.id,
        is_manager: is_manager,
      },
      {
        onSuccess: (data) => {
          console.log(
            "[LOG] | file: SelectUserRole.tsx:37 | updateRoleMutation.mutate | data:",
            data
          );

          enqueueSnackbar({
            variant: "success",
            message: "Role Successfully Added.",
          });
          queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        },
        onError: (err: any) => {
          console.log(
            "[LOG] | file: SelectUserRole.tsx:57 | updateUser | err:",
            err
          );

          enqueueSnackbar({
            variant: "error",
            message: err.message,
          });
        },
      }
    );
  }

  return (
    <Container mt={128}>
      <Stack
        maw="54%"
        mx="auto"
        mt={32}
        style={{ border: "1px black solid", borderRadius: "8px" }}
        p={48}
      >
        <Radio.Group
          value={value}
          onChange={setValue}
          name="userRole"
          label="Select your Role"
          description="Once assigned, the role can't be changed as of now."
          withAsterisk
        >
          <Group mt="xs">
            <Radio value="manager" label="Manager" />
            <Radio value="assistant" label="Assistant" />
          </Group>
        </Radio.Group>

        <Button
          loading={updateRoleMutation.isLoading}
          onClick={() => updateUser()}
          color="dark"
          mt={24}
        >
          Update Role
        </Button>
      </Stack>
    </Container>
  );
};

const updateRole = () => {
  const updateRoleMutation = useMutation({
    mutationFn: (payload: updateRole) => {
      return api.post(`/update-user-role`, {
        ...payload,
      });
    },
  });
  return updateRoleMutation;
};

type updateRole = {
  id: string;
  is_manager: boolean;
};
