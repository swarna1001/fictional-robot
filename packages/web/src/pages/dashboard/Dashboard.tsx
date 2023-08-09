import { useQuery } from "@tanstack/react-query";
import { api } from "../../axios";
import { TopNavbar } from "../../components/Header";
import { GetInventoryResponse, UserProfileResponse } from "../../utils/types";
import { SelectUserRole } from "../../components/SelectUserRole";
import { AddInventoryModal } from "../../components/AddInventoryModal";
import {
  Button,
  Container,
  Modal,
  createStyles,
  Text,
  Group,
  Stack,
  Title,
  Flex,
  Tabs,
  Badge,
} from "@mantine/core";
import { InventoryTable } from "../../components/Table";
import { StatsRing } from "../../components/Stats";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles(() => ({
  title: {
    fontSize: "20px",
    fontWeight: 600,
  },
  content: {
    padding: "24px",
  },
}));

function Dashboard() {
  const { classes } = useStyles();
  const [modalOpened, { open, close }] = useDisclosure(false);

  const { data: userData } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () =>
      api.get<UserProfileResponse>(`/session`).then((res) => res.data),
  });

  console.log("[LOG] | file: Dashboard.tsx:56 | userData:", userData);

  const { data: inventories } = useQuery({
    queryKey: ["get-inventories"],
    queryFn: () =>
      api.get<GetInventoryResponse>(`inventories`).then((res) => res.data),
  });

  console.log("[LOG] | file: Dashboard.tsx:74 | inventories:", inventories);

  return (
    <>
      {userData ? (
        <>
          {userData.properties.user[0].has_identified ? (
            <>
              {/* {userData.properties.user[0].is_manager ? ( */}
              <>
                <TopNavbar
                  username={userData.properties.user[0].name}
                  managerView={userData.properties.user[0].is_manager}
                />
              </>

              <Container size={"xl"}>
                {/* <Demo /> */}
                <StatsRing
                  inventories={inventories?.approvedInventories! || []}
                />

                <Group position="right" mt={48}>
                  <Button color="dark" onClick={open}>
                    <Text fw={600} fz={"md"}>
                      Add Inventory
                    </Text>
                  </Button>
                </Group>

                <Tabs color="dark" defaultValue="inventory-table">
                  <Tabs.List>
                    <Tabs.Tab value="inventory-table">Inventories</Tabs.Tab>
                    <Tabs.Tab
                      rightSection={
                        <Badge
                          w={16}
                          h={16}
                          sx={{ pointerEvents: "none" }}
                          variant="filled"
                          size="xs"
                          p={0}
                          color="green"
                        >
                          {inventories?.unapprovedInventories.length}
                        </Badge>
                      }
                      value="pending-inventories"
                    >
                      Pending Inventories
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="inventory-table" pt="xs">
                    <InventoryTable
                      inventories={inventories?.approvedInventories || []}
                      managerView={userData.properties.user[0].is_manager}
                    />
                  </Tabs.Panel>

                  <Tabs.Panel value="pending-inventories" pt="xs">
                    <InventoryTable
                      inventories={inventories?.unapprovedInventories || []}
                      managerView={userData.properties.user[0].is_manager}
                      isPendingTab={true}
                    />
                  </Tabs.Panel>
                </Tabs>

                <Modal
                  size="xl"
                  opened={modalOpened}
                  onClose={close}
                  title="Add Inventory"
                  centered
                  padding={"xl"}
                  radius="16px"
                  classNames={classes}
                >
                  <AddInventoryModal />
                </Modal>
              </Container>
            </>
          ) : (
            <SelectUserRole id={userData.properties.user[0].id || "9"} />
          )}
        </>
      ) : (
        <Container mt={128}>
          <Stack>
            <Title order={1} align="center">
              Welcome to InventoryHub.
            </Title>

            <Title order={2} align="center">
              One step solution to manage and track Inventories
            </Title>

            <Flex justify="center" align="center" mt={24}>
              <a
                href={`${
                  import.meta.env.VITE_APP_API_URL
                }/auth/google/authorize`}
                rel="noreferrer"
              >
                <Button color="dark" size="lg">
                  Sign in with Google
                </Button>
              </a>
            </Flex>
          </Stack>
        </Container>
      )}
    </>
  );
}

export default Dashboard;
