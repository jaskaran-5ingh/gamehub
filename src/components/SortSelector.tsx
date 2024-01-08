import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useGameQueryStore from "../store";
import useQueryParameter from "../hooks/useQueryParameter";
import { useEffect } from "react";

const sortOrders = [
  { value: "", label: "Relevance" },
  { value: "-added", label: "Date added" },
  { value: "name", label: "Name" },
  { value: "-released", label: "Release date" },
  { value: "-metacritic", label: "Popularity" },
  { value: "-rating", label: "Average rating" },
];

const SortSelector = () => {
  const [sortOrderParameter, setSortOrderParameter] =
    useQueryParameter("sortOrder");

  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);

  const sortOrder = useGameQueryStore((s) => s.gameQuery.sortOrder);
  
  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  useEffect(() => {
    if (sortOrderParameter) {
      setSortOrder(sortOrderParameter);
    }
  }, [sortOrderParameter]);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: {currentSortOrder?.label || "Relevance"}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => {
              setSortOrder(order.value);
              setSortOrderParameter(order.value);
            }}
            key={order.value}
            value={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
