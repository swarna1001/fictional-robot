export type GenderAndAgeDistribution = {
  label: string;
  value: number;
};

export type user = {
  id: string;
  email: string;
  name: string;
  is_manager: boolean;
  google_id: string;
  has_identified: boolean;
};

export type UserProfileResponse = {
  type: string;
  properties: {
    user: user[];
  };
  iat: number;
};

export type Inventory = {
  id: number;
  name: string;
  supplier: string;
  category: string;
  quantity_in_stock: number;
  unit_price: number;
  description: string;
  date_added: string;
};

export type GetInventoryResponse = {
  approvedInventories: Inventory[] | [];
  unapprovedInventories: Inventory[] | [];
};

export type InventoryTableProps = {
  inventories: Inventory[] | [];
  managerView: boolean;
  isPendingTab?: boolean;
};

export type AddInventory = {
  name: string;
  description: string;
  category: string;
  quantity_in_stock: number;
  unit_price: number;
  supplier: string;
};
