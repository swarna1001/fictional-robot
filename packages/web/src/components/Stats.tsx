import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Group,
  Stack,
  ColorSwatch,
} from "@mantine/core";
import { Inventory } from "../utils/types";

type statsProps = {
  inventories: Inventory[];
};

export function StatsRing({ inventories }: statsProps) {
  const colorMapping: any = {
    Electronics: "pink",
    Furniture: "yellow",
    "Clothing & Apparel": "violet",
    "Health & Beauty": "indigo",
    "Sports & Recreation": "red",
    "Books & Media": "teal",
  };

  const currentDate = new Date().toLocaleDateString();
  let totalItems = 0;
  const categoryCounts: any = {};

  for (const item of inventories!) {
    totalItems = totalItems + item.quantity_in_stock;
    const category = item.category;
    if (categoryCounts[category]) {
      categoryCounts[category]++;
    } else {
      categoryCounts[category] = 1;
    }
  }

  const inventoryByCategory = Object.entries(categoryCounts).map(
    ([label, value]) => ({
      label,
      value: ((value as number) / inventories.length) * 100,
    })
  );

  const inventoryDistribution = Object.entries(inventoryByCategory).map(
    ([_label, value]) => ({
      value: value.value,
      label: value.label,
      color: colorMapping[value.label],
    })
  );

  const categoryDistributionDesc = inventoryDistribution.map((item) => (
    <Group key={item.label}>
      <ColorSwatch color={item.color} size={12} />
      <Text size={"sm"} weight={500} color="#445058">
        {item.label}
      </Text>
    </Group>
  ));

  const itemsAddedToday = inventories.filter((item) =>
    new Date(item.date_added).toLocaleDateString().startsWith(currentDate)
  );

  const numberOfItemsAddedToday = itemsAddedToday.length;

  return (
    <>
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <Paper
          withBorder
          radius="md"
          p="xs"
          key="Total Inventories"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Group>
            <Stack align="center">
              <Text color="#36454f" size="sm" weight={700}>
                Inventories added today
              </Text>

              <Text weight={600} size="xl" ta={"center"} color="#445058">
                {numberOfItemsAddedToday}
              </Text>
            </Stack>
          </Group>
        </Paper>

        <Paper
          withBorder
          radius="md"
          p="xs"
          key="Total Inventories"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Group>
            <Stack align="center">
              <Text color="#36454f" size="sm" weight={700}>
                Total Inventories
              </Text>

              <Text weight={600} size="xl" ta={"center"} color="#445058">
                {inventories.length}
              </Text>
            </Stack>
          </Group>
        </Paper>

        <Paper
          withBorder
          radius="md"
          p="xs"
          key="Total Items"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Group>
            <Stack align="center">
              <Text color="#36454f" size="sm" weight={700}>
                Total Items
              </Text>

              <Text weight={600} size="xl" color="#445058">
                {totalItems}
              </Text>
            </Stack>
          </Group>
        </Paper>

        <Paper
          withBorder
          radius="md"
          p="xs"
          key="Inventory by Category"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Group>
            <RingProgress
              size={90}
              roundCaps
              thickness={10}
              sections={inventoryDistribution}
            />

            <div>
              <Text color="#36454f" size="sm" weight={700}>
                Inventory by Category
              </Text>
              {categoryDistributionDesc}
            </div>
          </Group>
        </Paper>
      </SimpleGrid>
    </>
  );
}
