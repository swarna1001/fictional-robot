import {
  createStyles,
  Header,
  Group,
  Container,
  rem,
  Text,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: "dark",
    }).background,
    borderBottom: 0,
    position: "sticky",
    zIndex: 1,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export function TopNavbar(data: any) {
  console.log("[LOG] | file: Header.tsx:54 | TopNavbar | data:", data);

  const { classes } = useStyles();

  return (
    <Header height={56} className={classes.header} mb={56}>
      <Container style={{ maxWidth: "100%" }}>
        <Container size={"xl"}>
          <div className={classes.inner}>
            <Text fw={600} c="white" fz={"xl"}>
              {data.username}
            </Text>
            <Group>
              {data.managerView ? (
                <Text c="white">Manager</Text>
              ) : (
                <Text c="white">Assistant</Text>
              )}
            </Group>
          </div>
        </Container>
      </Container>
    </Header>
  );
}
