import {
  Button,
  Group,
  NativeSelect,
  Stack,
  TextInput,
  Textarea,
  createStyles,
} from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { AddInventory } from "../utils/types";

const useStyles = createStyles(() => ({
  label: {
    marginBottom: "5px",
    marginLeft: "3px",
  },
}));

export const AddInventoryModal = () => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();

  const addInventoryMutation = addInventory();

  const categoryOptions = [
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Furniture",
      label: "Furniture",
    },

    {
      value: "Clothing & Apparel",
      label: "Clothing & Apparel",
    },

    {
      value: "Health & Beauty",
      label: "Health & Beauty",
    },

    {
      value: "Sports & Recreation",
      label: "Sports & Recreation",
    },

    {
      value: "Books & Media",
      label: "Books & Media",
    },
  ];

  const init: AddInventory = {
    name: "",
    description: "",
    category: categoryOptions[0].value,
    quantity_in_stock: 0,
    unit_price: 0,
    supplier: "",
  };

  const [addInventoryInfo, setAddInventoryInfo] = useState(init);

  const handleChange = (name: string, value: string | number) => {
    setAddInventoryInfo((oldState: AddInventory) => ({
      ...oldState,
      [name]:
        name === "quantity_in_stock" || name === "unit_price"
          ? Number(value)
          : value,
    }));
  };

  function disableAddButton() {
    if (
      addInventoryInfo.name &&
      addInventoryInfo.description &&
      addInventoryInfo.category &&
      addInventoryInfo.quantity_in_stock &&
      addInventoryInfo.unit_price &&
      addInventoryInfo.supplier
    ) {
      return false;
    }
    return true;
  }

  function handleSubmit() {
    console.log(
      "[LOG] | file: AddInventoryModal.tsx:103 | handleSubmit | addInventoryInfo:",
      addInventoryInfo
    );

    addInventoryMutation.mutate(addInventoryInfo, {
      onSuccess: () => {
        setAddInventoryInfo(init);
        enqueueSnackbar({
          variant: "success",
          message: "Inventory Successfully Added.",
        });
        queryClient.invalidateQueries({ queryKey: ["get-inventories"] });
      },
      onError: (err: any) => {
        console.log(
          "[LOG] | file: AddInventoryModal.tsx:112 | handleSubmit | err:",
          err
        );

        enqueueSnackbar({
          variant: "error",
          message: err.message,
        });
      },
    });
  }

  return (
    <Stack spacing="xl">
      <TextInput
        variant="filled"
        placeholder="Laptop"
        label="Product Name"
        withAsterisk
        classNames={{ label: classes.label }}
        name="name"
        value={addInventoryInfo.name}
        onChange={(event) =>
          handleChange(event.target.name, event.currentTarget.value)
        }
      />

      <Group position="apart">
        <TextInput
          variant="filled"
          placeholder="ABC Electronics"
          label="Supplier"
          withAsterisk
          classNames={{ label: classes.label }}
          style={{ width: "46%" }}
          name="supplier"
          value={addInventoryInfo.supplier}
          onChange={(event) =>
            handleChange(event.target.name, event.currentTarget.value)
          }
        />

        <NativeSelect
          variant="filled"
          label="Category"
          withAsterisk
          classNames={{ label: classes.label }}
          style={{ width: "46%" }}
          name="category"
          value={addInventoryInfo.category}
          data={categoryOptions}
          onChange={(event) =>
            handleChange(event.target.name, event.currentTarget.value)
          }
        />
      </Group>

      <Group position="apart">
        <TextInput
          type="number"
          variant="filled"
          placeholder="40"
          label="Quantity"
          withAsterisk
          classNames={{ label: classes.label }}
          style={{ width: "46%" }}
          name="quantity_in_stock"
          min={1}
          value={addInventoryInfo.quantity_in_stock}
          onChange={(event) =>
            handleChange(event.target.name, event.currentTarget.value)
          }
        />

        <TextInput
          type="number"
          variant="filled"
          placeholder="$800.00"
          label="Unit Price"
          withAsterisk
          classNames={{ label: classes.label }}
          style={{ width: "46%" }}
          name="unit_price"
          min={1}
          value={addInventoryInfo.unit_price}
          onChange={(event) =>
            handleChange(event.target.name, event.currentTarget.value)
          }
        />
      </Group>
      <Textarea
        variant="filled"
        label="Product Description"
        placeholder="15-inch, Intel Core i5, 8GB RAM"
        withAsterisk
        autosize
        minRows={3}
        maxRows={6}
        maxLength={200}
        classNames={{ label: classes.label }}
        name="description"
        value={addInventoryInfo.description}
        onChange={(event) =>
          handleChange(event.target.name, event.currentTarget.value)
        }
      />

      <Group spacing={36} position="right" mt={32}>
        <Button
          variant="light"
          color="dark"
          onClick={() => setAddInventoryInfo(init)}
        >
          Clear
        </Button>
        <Button
          color="dark"
          loading={addInventoryMutation.isLoading}
          disabled={disableAddButton()}
          onClick={() => handleSubmit()}
        >
          Add Inventory
        </Button>
      </Group>
    </Stack>
  );
};

const addInventory = () => {
  const addInventoryMutation = useMutation({
    mutationFn: (data: AddInventory) => {
      return api.post(`/add-inventory`, {
        ...data,
      });
    },
  });
  return addInventoryMutation;
};
