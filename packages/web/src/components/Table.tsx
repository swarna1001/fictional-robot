import { Table, Group, Text, ScrollArea, ActionIcon } from "@mantine/core";
import DeleteIcon from "../utils/DeleteIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";
import { enqueueSnackbar } from "notistack";
import ApproveIcon from "../utils/ApproveIcon";
import { InventoryTableProps } from "../utils/types";

export function InventoryTable({
  inventories,
  managerView,
  isPendingTab,
}: InventoryTableProps) {
  const queryClient = useQueryClient();
  const deleteInventoryMutation = useDeleteInventory();
  const approveInventoryMutation = useApproveInventory();

  const deleteInventory = (id: number) => {
    deleteInventoryMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar({
          variant: "success",
          message: "Inventory Successfully Deleted.",
        });
        queryClient.invalidateQueries({ queryKey: ["get-inventories"] });
      },
      onError: (err: any) => {
        console.log("[LOG] | file: Table.tsx:45 | deleteInventory | err:", err);
        enqueueSnackbar({
          variant: "error",
          message: err.message,
        });
      },
    });
  };

  const approveInventory = (id: number) => {
    approveInventoryMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar({
          variant: "success",
          message: "Inventory Successfully Approved.",
        });
        queryClient.invalidateQueries({ queryKey: ["get-inventories"] });
      },
      onError: (err: any) => {
        console.log(
          "[LOG] | file: Table.tsx:77 | approveInventory | err:",
          err
        );
        enqueueSnackbar({
          variant: "error",
          message: err.message,
        });
      },
    });
  };

  const rows = inventories?.map((item) => (
    <tr key={item.id}>
      <td>
        <Group spacing="xl">
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </td>

      <td>
        <Text>{item.supplier}</Text>
      </td>
      <td>
        <Text>{item.category}</Text>
      </td>
      <td>
        <Text fz="sm">{item.quantity_in_stock}</Text>
      </td>
      <td>
        <Text fz="sm">{item.unit_price}</Text>
      </td>
      <td>
        <Text fz="sm">{item.description}</Text>
      </td>

      <td>
        <Text fz="sm">{new Date(item.date_added).toLocaleDateString()}</Text>
      </td>
      <td hidden={!managerView}>
        <Group spacing={0} position="left">
          {isPendingTab ? (
            <ActionIcon color="green" onClick={() => approveInventory(item.id)}>
              <ApproveIcon />
            </ActionIcon>
          ) : (
            <ActionIcon color="orange" onClick={() => deleteInventory(item.id)}>
              <DeleteIcon />
            </ActionIcon>
          )}
        </Group>
      </td>

      <td hidden={!managerView && isPendingTab}></td>
    </tr>
  ));

  return (
    <>
      {inventories.length ? (
        <ScrollArea my={32}>
          <Table verticalSpacing="sm">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Supplier</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Description</th>
                <th>Added on </th>
                <th hidden={!managerView}>Action </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Text ta="center" pt={16} c="dimmed">
          No inventories found.
        </Text>
      )}
    </>
  );
}

const useDeleteInventory = () => {
  const deleteInventoryMutation = useMutation({
    mutationFn: (id: number) => {
      return api.post(`/inventory/${id}`, {});
    },
  });
  return deleteInventoryMutation;
};

const useApproveInventory = () => {
  const approveInventoryMutation = useMutation({
    mutationFn: (id: number) => {
      return api.post(`/update-inventory/${id}`, {});
    },
  });
  return approveInventoryMutation;
};
